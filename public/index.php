<?php
// index.php - Automated Device Routing for WiFi@UJ
$userAgent = $_SERVER['HTTP_USER_AGENT'];

function getDeviceType($ua) {
    if (preg_match('/iPhone|iPad|iPod/i', $ua)) return 'ios';
    if (preg_match('/Android/i', $ua)) return 'android';
    if (preg_match('/Macintosh/i', $ua)) return 'macos';
    return 'generic';
}

$device = getDeviceType($userAgent);

// Redirect based on device capabilities
switch ($device) {
    case 'ios':
    case 'macos':
        // Direct iOS/macOS to landing page with .mobileconfig profile link
        header('Location: landing.php?device=apple');
        break;
    case 'android':
        // Android users receive specific configuration instructions
        header('Location: landing.php?device=android');
        break;
    default:
        // PC or unknown devices go to the standard dashboard interface
        header('Location: dashboard.php');
        break;
}
exit();
?>