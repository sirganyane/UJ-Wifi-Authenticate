<?php
// Simple API to generate a challenge for SCEP enrollment
header('Content-Type: application/json');

// In production, verify user session or UJ credentials here first
$challengeToken = bin2hex(random_bytes(16));

// Log token to database to verify later during SCEP request
// $db->query("INSERT INTO scep_challenges (token, expires) VALUES ('$challengeToken', NOW() + INTERVAL 1 HOUR)");

echo json_encode([
    "status" => "success",
    "challenge" => $challengeToken,
    "scep_url" => "https://scep.uj.ac.za/cgi-bin/pkiclient.exe"
]);
?>
location /profiles/ {
    types {
        application/x-apple-aspen-config mobileconfig;
    }
}