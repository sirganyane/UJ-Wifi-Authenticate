CREATE DATABASE IF NOT EXISTS uj_wifi_db;
USE uj_wifi_db;

-- 1. Table for UJ Users (Staff/Students)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL, 
    role ENUM('Student', 'Staff', 'Admin') DEFAULT 'Student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Table for WiFi Sessions (Continuous Browsing Logs)
CREATE TABLE IF NOT EXISTS wifi_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    device_ip VARCHAR(45) NOT NULL,
    os_name VARCHAR(50),      -- e.g., 'Windows 11'
    device_make VARCHAR(50),  -- e.g., 'Apple'
    device_model VARCHAR(50), -- e.g., 'iPhone 15 Pro'
    status ENUM('Active', 'Expired') DEFAULT 'Active',
    connected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
);

-- Seed an admin user for testing
INSERT INTO users (username, role) VALUES ('admin_madibeng', 'Admin');