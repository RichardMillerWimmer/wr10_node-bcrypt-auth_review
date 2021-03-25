INSERT INTO users3 (username, hash)
VALUES ($1, $2)
returning id, username;