use crate::core::{entity::Entity, metaobject::metaobject::MetaObject, state::state::State};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum NotificationType {
    Email,
    Sms,
    GUI,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum NotificationState {
    Draft,
    Active,
    Retired,
}

impl NotificationState {
    pub fn default() -> State<NotificationState> {
        State {
            current: NotificationState::Draft,
            previous: None,
        }
    }
}
#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Notification {
    pub id: Uuid,
    pub title: String,
    pub content: Option<String>,
    pub notification_type: NotificationType,
    pub notification_state: State<NotificationState>,
    pub meta: MetaObject
}

impl Entity for Notification {
    fn generate_id() -> Uuid {
        Uuid::new_v4()
    }
}

impl Notification {
    
    pub fn new(title: String, content: Option<String>, notification_type: Option<NotificationType>) -> Self {
        let current_type = notification_type.unwrap_or(NotificationType::Email);
        Self {
            id: Notification::generate_id(),
            title,
            content,
            notification_type: current_type,
            notification_state: NotificationState::default(),
            meta: MetaObject::new(),       
        }
    }

    pub fn active_notification(&mut self) {
        self.notification_state.update(State {
            current: NotificationState::Active,
            previous: self.notification_state.previous.clone(),
        })
    }

    pub fn retire_notification(&mut self) {
        self.notification_state.update(State {
            current: NotificationState::Retired,
            previous: self.notification_state.previous.clone(),
        })
    }
}
