use tokio::sync::mpsc::Receiver;

use crate::core::event::eventTask::EventTask;

pub struct EventService {
    pub event_reciver: Receiver<EventTask>,
}

impl EventService {
    pub async fn run_loop(self) {
        tokio::spawn(async move {
            let mut event_reciver = self.event_reciver;
            while let Some(event_task) = event_reciver.recv().await {
                println!("{}", event_task.0);
            }
        });
    }
}
