use actix_web::web;
use actix_files as fs;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg
        // API routes
        .service(
            web::scope("/api")
                .route("/users", web::get().to(handlers::get_users))
                .route("/users", web::post().to(handlers::create_user))
        )
        // Serve static files
        .service(fs::Files::new("/", "./static").index_file("index.html"));
}