const express = require("express");
const mysql = require("mysql2");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "uj_audit_db",
    user: "root",
    password: "uj_admin_2026",
    database: "uj_wifi_db"
});

// Match the path exactly: /auth/login
app.post("/auth/login", (req, res) => {
    const { username, password } = req.body;
    console.log(`Auth attempt for student: ${username}`);
    
    db.query("INSERT INTO wifi_sessions (username, ip_address, device_model, status) VALUES (?, ?, ?, ?)", 
    [username, req.ip, "UJ-Campus-Device", "Success"], (err) => {
        if (err) {
            console.error("Audit Log Error:", err);
            return res.status(500).send("Database Error");
        }
        res.redirect("/success.html");
    });
});

app.listen(3000, () => console.log("UJ WiFi Portal LIVE on port 3000"));
