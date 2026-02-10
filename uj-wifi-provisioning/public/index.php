<?php
$ua = $_SERVER['HTTP_USER_AGENT'];
$os = (preg_match('/iPhone|iPad|iPod/i', $ua)) ? "ios" : ((preg_match('/Android/i', $ua)) ? "android" : "desktop");
header("Location: landing.php?os=$os");
exit;
?>
