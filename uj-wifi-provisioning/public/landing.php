<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: sans-serif; text-align: center; padding: 20px; background: #f4f4f4; }
        .card { background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); max-width: 450px; margin: auto; }
        .btn { display: block; background: #FF6600; color: white; padding: 15px; margin: 10px 0; text-decoration: none; border-radius: 5px; font-weight: bold; }
        code { background: #eee; padding: 2px 5px; border-radius: 3px; display: block; margin: 10px 0; font-family: monospace; }
    </style>
</head>
<body>
    <div class="card">
        <h1>UJ Wi-Fi Setup</h1>
        <?php $os = $_GET['os'] ?? 'desktop'; ?>

        <?php if ($os == 'ios'): ?>
            <p>Apple Device Detected</p>
            <a href="../profiles/uj_staff.mobileconfig" class="btn">Install iOS Profile</a>
        <?php elseif ($os == 'android'): ?>
            <p>Android Detected</p>
            <a href="../certs/uj_root.crt" class="btn">Download Root Cert</a>
        <?php else: ?>
            <p>Windows PC Detected</p>
            <a href="../profiles/uj_student.xml" class="btn" download>Download Windows Profile</a>
            <p style="font-size: 0.8em; text-align: left;"><strong>To Install:</strong> Open PowerShell and run:</p>
            <code>netsh wlan add profile filename="uj_student.xml"</code>
        <?php endif; ?>
    </div>
</body>
</html>
