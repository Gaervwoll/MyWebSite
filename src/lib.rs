pub mod models;
pub mod handlers;
pub mod routes;
pub mod database;

// Реэкспорт часто используемых компонентов
pub use models::User;
pub use database::DbPool;