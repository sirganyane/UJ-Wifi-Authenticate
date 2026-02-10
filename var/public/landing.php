<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UJ Wi-Fi Onboarding</title>
    <style>
        body { font-family: -apple-system, sans-serif; background: #f0f2f5; text-align: center; padding: 20px; }
        .card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); max-width: 400px; margin: auto; }
        .uj-orange { color: #FF6600; }
        .btn { display: inline-block; background: #FF6600; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 15px; }
        .instructions { text-align: left; font-size: 0.9em; margin-top: 20px; color: #555; }
    </style>
</head>
<body>
    <div class="card">
        <h1 class="uj-orange">UJ Wi-Fi Setup</h1>
        <?php
        $os = $_GET['os'] ?? 'desktop';

        if ($os === 'ios') {
            echo "<h3>Apple Device Detected</h3>";
            echo "<p>Tap below to download the secure configuration profile.</p>";
            echo "<a href='../profiles/uj_staff.mobileconfig' class='btn'>Download Profile</a>";
            echo "<div class='instructions'><strong>Next Steps:</strong><br>1. Tap 'Allow'<br>2. Go to Settings > Profile Downloaded<br>3. Tap Install</div>";
        } elseif ($os === 'android') {
            echo "<h3>Android Detected</h3>";
            echo "<p>First, download and install the Root Certificate.</p>";
            echo "<a href='../certs/uj_root.crt' class='btn'>Download Certificate</a>";
            echo "<div class='instructions'><strong>Next Steps:</strong><br>1. Open the file to install.<br>2. Name it 'UJ Root'.<br>3. Connect to UJ Wi-Fi manually.</div>";
        } else {
            echo "<h3>Desktop/PC Detected</h3>";
            echo "<p>Please select your group:</p>";
            echo "<a href='../profiles/uj_staff.mobileconfig' class='btn'>Staff Setup</a><br>";
            echo "<a href='#' class='btn' style='background:#003366;'>Student Setup</a>";
        }
        ?>
    </div>
</body>
</html>