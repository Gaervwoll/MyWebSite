use actix_web::{web, App, HttpServer, Responder};

async fn hello() -> impl Responder {
    "Hello World!"
}

// Обычно маршруты выносятся в отдельные модули
mod handlers;
mod models;
mod routes;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(hello))
            // Подключаем другие маршруты
            .configure(routes::config)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}