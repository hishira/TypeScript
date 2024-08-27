pub enum EventResponseStatus {
    Ok,
    NotOk,
}
pub enum EventError{
    Error
}
pub struct EventResponse {
    status: EventResponseStatus,
}
trait Command {
    async fn handle(&self) -> EventResponse;
}
pub struct EventTask(pub String);

impl EventTask {
    pub async fn event_handle(command: impl Command) -> EventResponse {
        Self::handle(command).await
    }

    async fn handle(command: impl Command) -> EventResponse {
        command.handle().await
    }
}
