use actix_web::{web, HttpResponse};
use crate::models::User;

pub async fn get_users() -> HttpResponse {
    // Логика получения пользователей
    HttpResponse::Ok().json(vec![])
}

pub async fn create_user(user: web::Json<User>) -> HttpResponse {
    // Логика создания пользователя
    HttpResponse::Created().json(user.into_inner())
}