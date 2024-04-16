use bcrypt::{hash, verify};
use rayon::ThreadPoolBuilder;
use thiserror::Error;
use tokio::sync::oneshot;

/// Errors that can occur in the `PasswordWorker`.
#[derive(Debug, Error)]
pub enum PasswordWorkerError {
    #[error("Bcrypt error: {0}")]
    Bcrypt(#[from] bcrypt::BcryptError),
    #[error("Channel send error")]
    ChannelSend,
    #[error("Channel receive error")]
    ChannelRecv,
    #[error("ThreadPool build error")]
    ThreadPool,
    #[error("No tokio runtime running")]
    Runtime,
}

#[derive(Debug)]
enum WorkerCommand {
    Hash(
        String,
        u32,
        oneshot::Sender<Result<String, PasswordWorkerError>>,
    ),
    Verify(
        String,
        String,
        oneshot::Sender<Result<bool, PasswordWorkerError>>,
    ),
}

/// A worker that handles password hashing and verification using a `rayon` thread pool
/// and `crossbeam-channel`.
///
/// The `PasswordWorker` struct provides asynchronous password hashing and verification
/// operations.
#[derive(Debug, Clone)]
pub struct PasswordWorker {
    sender: crossbeam_channel::Sender<WorkerCommand>,
    cost: u32,
}

impl PasswordWorker {
    /// Creates a new `PasswordWorker` with the given bcrypt cost and maximum number of threads.
    ///
    /// The `cost` parameter determines the computational cost of the bcrypt hashing algorithm.
    /// The `max_threads` parameter specifies the maximum number of threads the worker can use.
    ///
    /// # Examples
    ///
    /// ```
    /// # #[tokio::main]
    /// # async fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// use password_worker::PasswordWorker;
    ///
    /// let cost = 12;
    /// let max_threads = 4;
    /// let password_worker = PasswordWorker::new(cost, max_threads)?;
    /// # Ok(())
    /// # }
    /// ```
    pub fn new(cost: u32, max_threads: usize) -> Result<Self, PasswordWorkerError> {
        let (sender, receiver) = crossbeam_channel::unbounded::<WorkerCommand>();

        let thread_pool = ThreadPoolBuilder::new()
            .num_threads(max_threads)
            .build()
            .map_err(|_| PasswordWorkerError::ThreadPool)?;

        tokio::runtime::Handle::try_current()
            .map_err(|_| PasswordWorkerError::Runtime)?
            .spawn_blocking(move || {
                while let Ok(command) = receiver.recv() {
                    match command {
                        WorkerCommand::Hash(password, cost, result_sender) => {
                            let result = thread_pool.install(|| hash(&password, cost));
                            result_sender
                                .send(result.map_err(PasswordWorkerError::Bcrypt))
                                .unwrap();
                        }
                        WorkerCommand::Verify(password, hash, result_sender) => {
                            let result = thread_pool.install(|| verify(&password, &hash));
                            result_sender
                                .send(result.map_err(PasswordWorkerError::Bcrypt))
                                .unwrap();
                        }
                    }
                }
            });

        Ok(PasswordWorker { sender, cost })
    }

    /// Asynchronously hashes the given password using bcrypt.
    ///
    /// # Example
    ///
    /// ```
    /// # #[tokio::main]
    /// # async fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// use password_worker::PasswordWorker;
    ///
    /// let password = "hunter2";
    /// let cost = 12;
    /// let max_threads = 4;
    /// let password_worker = PasswordWorker::new(cost, max_threads)?;
    ///
    /// let hashed_password = password_worker.hash(password.to_string()).await?;
    /// println!("Hashed password: {:?}", hashed_password);
    /// # Ok(())
    /// # }
    /// ```
    pub async fn hash(&self, password: String) -> Result<String, PasswordWorkerError> {
        let (tx, rx) = oneshot::channel();

        self.sender
            .send(WorkerCommand::Hash(password, self.cost, tx))
            .map_err(|_| PasswordWorkerError::ChannelSend)?;

        rx.await.map_err(|_| PasswordWorkerError::ChannelRecv)?
    }

    /// Asynchronously verifies a password against a bcrypt hash.
    ///
    /// # Example
    ///
    /// ```
    /// # #[tokio::main]
    /// # async fn main() -> Result<(), Box<dyn std::error::Error>> {
    /// use password_worker::PasswordWorker;
    ///
    /// let password = "hunter2";
    /// let cost = 12;
    /// let max_threads = 4;
    /// let password_worker = PasswordWorker::new(cost, max_threads)?;
    /// let hashed_password = password_worker.hash(password.to_string()).await?;
    ///
    /// let is_valid = password_worker.verify(password.to_string(), hashed_password).await?;
    /// println!("Verification result: {:?}", is_valid);
    /// # Ok(())
    /// # }
    /// ```
    pub async fn verify(
        &self,
        password: String,
        hash: String,
    ) -> Result<bool, PasswordWorkerError> {
        let (tx, rx) = oneshot::channel();

        self.sender
            .send(WorkerCommand::Verify(password, hash, tx))
            .map_err(|_| PasswordWorkerError::ChannelSend)?;

        rx.await.map_err(|_| PasswordWorkerError::ChannelRecv)?
    }
}