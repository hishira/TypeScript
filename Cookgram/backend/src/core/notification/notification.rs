use crate::core::{
    entity::{entity::IdGenerator, Entity},
    metaobject::metaobject::MetaObject,
    state::state::State,
};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use super::notificationid::NotificationId;

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct EmailValue(String);

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct PhoneNumber(String);

impl EmailValue {
    pub fn get_email(&self) -> String {
        self.0.clone()
    }
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub enum NotificationType {
    Email(EmailValue),
    Sms(PhoneNumber),
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
    pub id: NotificationId,
    pub title: String,
    pub content: Option<String>,
    pub notification_type: NotificationType,
    pub notification_state: State<NotificationState>,
    pub meta: MetaObject,
}

impl Entity for Notification {
    fn generate_id() -> impl IdGenerator {
        NotificationId::default()
    }
}

impl Notification {
    pub fn new(
        title: String,
        content: Option<String>,
        notification_type: Option<NotificationType>,
    ) -> Self {
        let current_type =
            notification_type.unwrap_or(NotificationType::Email(EmailValue("".to_string())));
        Self {
            id: NotificationId::default(),
            title,
            content,
            notification_type: current_type,
            notification_state: NotificationState::default(),
            meta: MetaObject::new(),
        }
    }

    pub fn new_email_notification(title: String, content: Option<String>, email: String) -> Self {
        let notification_type = NotificationType::Email(EmailValue(email));
        Self {
            id: NotificationId::default(),
            title,
            content,
            notification_type,
            notification_state: NotificationState::default(),
            meta: MetaObject::new(),
        }
    }

    pub fn new_sms_notification(title: String, content: Option<String>, phone: String) -> Self {
        let notification_type = NotificationType::Sms(PhoneNumber(phone));
        Self {
            id: NotificationId::default(),
            title,
            content,
            notification_type,
            notification_state: NotificationState::default(),
            meta: MetaObject::new(),
        }
    }
    pub fn new_gui_notificatin(title: String, content: Option<String>) -> Self {
        Self {
            id: NotificationId::default(),
            title,
            content,
            notification_type: NotificationType::GUI,
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
