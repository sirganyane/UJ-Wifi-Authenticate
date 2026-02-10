<?php
$ua = $_SERVER['HTTP_USER_AGENT'];

// OS Detection Logic
if (preg_match('/iPhone|iPad|iPod/i', $ua)) {
    $os = "ios";
} elseif (preg_match('/Android/i', $ua)) {
    $os = "android";
} else {
    $os = "desktop";
}

// Redirect to the landing page with the OS type
header("Location: landing.php?os=$os");
exit;
?>