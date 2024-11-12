// Find all our documentation at https://docs.near.org
mod web4;
use near_sdk::serde_json::Value;
use near_sdk::{env, near, Promise, PromiseResult};
use web4::types::{Web4Request, Web4Response};

// Define the contract structure
#[near(contract_state)]
#[derive(Default)]
pub struct Contract {}
pub mod external;
pub use crate::external::*;

// Implement the contract structure
#[near]
impl Contract {
    #[payable]
    pub fn update_widgets(
        &mut self,
        widget_reference_account_id: String,
        social_db_account_id: String,
    ) -> Promise {
        socialdb::ext(social_db_account_id.parse().unwrap())
            .get([format!("{}/widget/**", widget_reference_account_id)].to_vec())
            .then(
                Self::ext(env::current_account_id())
                    .with_attached_deposit(env::attached_deposit())
                    .update_widgets_callback(widget_reference_account_id, social_db_account_id),
            )
    }

    #[payable]
    pub fn update_widgets_callback(
        &mut self,
        widget_reference_account_id: String,
        social_db_account_id: String,
    ) -> Promise {
        if env::predecessor_account_id() != env::current_account_id() {
            env::panic_str("Should not be called directly");
        }
        match env::promise_result(0) {
            PromiseResult::Successful(result) => {
                let mut widget: Value =
                    near_sdk::serde_json::from_slice(result.as_slice()).unwrap();

                if let Some(obj) = widget.as_object_mut() {
                    obj.insert(
                        env::current_account_id().to_string(),
                        obj[&widget_reference_account_id].clone(),
                    );
                    obj.remove(&widget_reference_account_id);
                }

                socialdb::ext(social_db_account_id.parse().unwrap())
                    .with_attached_deposit(env::attached_deposit())
                    .set(widget)
            }
            _ => env::panic_str("Failed to get reference widget data"),
        }
    }

    #[allow(unused_variables)]
    pub fn web4_get(&self, request: Web4Request) -> Web4Response {
        Web4Response::Body {
            content_type: "text/html; charset=UTF-8".to_owned(),
            body: include_str!("../index.html.base64.txt").to_string(),
        }
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use super::*;

    use near_sdk::base64::{engine::general_purpose, Engine as _};

    #[test]
    fn web4_get() {
        let contract = Contract::default();
        let response = contract.web4_get(
            serde_json::from_value(serde_json::json!({
                "path": "/"
            }))
            .unwrap(),
        );
        match response {
            Web4Response::Body { content_type, body } => {
                assert_eq!("text/html; charset=UTF-8", content_type);

                let body_string =
                    String::from_utf8(general_purpose::STANDARD.decode(body).unwrap()).unwrap();

                assert!(body_string.contains("near-social-viewer"));
            }
            _ => {
                panic!("Should return Web4Response::Body");
            }
        }
    }
}
