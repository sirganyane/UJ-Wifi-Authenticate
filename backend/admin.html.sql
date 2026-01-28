-- Query for Admin Panel
SELECT 
    connection_time AS Time, 
    username AS Username, 
    ip_address AS "Device IP", 
    status AS Status, 
    CONCAT(os_name, ' - ', device_model) AS Device 
FROM wifi_sessions 
ORDER BY connection_time DESC;