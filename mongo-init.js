db.createUser(
  {
    user: "pixelbot",
    pwd: "pixelbot",
    roles: [
      {
        role: "readWrite",
        db: "pixelbot"
      }
    ]
  }
);
