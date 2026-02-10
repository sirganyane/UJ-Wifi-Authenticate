<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#FF8C00" />
    <title>UJ WIFI Command Center</title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <style>
        /* Integrated Styles from admin.html */
        :root {
            --uj-orange: #FF8C00;
            --uj-dark: #121212;
            --uj-grey: #4A4A4A;
        }
        body.dark-mode { --bg: #0d0d0d; --text: #e0e0e0; --card: #1a1a1a; --border: #333; }
        body.light-mode { --bg: #f4f7f6; --text: #212529; --card: #ffffff; --border: #dee2e6; }

        body { background-color: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; transition: 0.3s; overflow: hidden; }
        .app-container { display: flex; height: 100vh; width: 100vw; }

        /* Sidebar & Layout */
        #sidebar { width: 280px; background: var(--uj-dark); color: white; display: flex; flex-direction: column; flex-shrink: 0; }
        .nav-item { padding: 15px 25px; color: #888; cursor: pointer; display: flex; align-items: center; gap: 15px; transition: 0.2s; border-left: 4px solid transparent; }
        .nav-item.active { background: #1a1a1a; color: white; border-left-color: var(--uj-orange); }
        #main-content { flex-grow: 1; overflow-y: auto; display: flex; flex-direction: column; }
        .uj-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .log-window { background: #000; color: #0f0; font-family: 'Courier New', monospace; padding: 15px; border-radius: 8px; height: 180px; overflow-y: auto; font-size: 0.8rem; }
    </style>
</head>

<body class="light-mode">
<div class="app-container">
    <nav id="sidebar">
        <div class="p-4 text-center border-bottom border-secondary">
            <h3 class="fw-bold m-0">UJ <span style="color:var(--uj-orange)">WIFI</span></h3>
            <small class="text-muted text-uppercase">Root Authority</small>
        </div>
        <div class="mt-3 flex-grow-1">
            <div class="nav-item active" onclick="nav('dashboard')"><i class="fa fa-th-large"></i> Dashboard</div>
            <div class="nav-item" onclick="nav('nodes')"><i class="fa fa-network-wired"></i> Network Nodes</div>
            <div class="nav-item" onclick="nav('monitor')"><i class="fa fa-microchip"></i> Network Monitor</div>
            <div class="nav-item" onclick="nav('vouchers')"><i class="fa fa-ticket-alt"></i> Voucher Engine</div>
            <div class="nav-item" onclick="nav('blacklist')"><i class="fa fa-user-shield"></i> Blacklist Manager</div>
        </div>
        <div class="p-4">
            <button class="btn btn-sm btn-outline-light w-100 mb-2" onclick="toggleMode()">🌓 Switch Theme</button>
        </div>
    </nav>

    <main id="main-content">
        <header class="top-bar">
            <h5 class="fw-bold m-0" id="m-title">DASHBOARD</h5>
            <div class="d-flex align-items-center gap-3">
                <span class="badge bg-dark px-3 py-2">SYS_IP: 10.0.0.1</span>
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/af/University_of_Johannesburg_Logo.svg/1200px-University_of_Johannesburg_Logo.svg.png" height="45" alt="UJ Logo">
            </div>
        </header>

        <div id="dashboard" class="module-view active p-4">
            <div class="uj-card">
                <h6 class="fw-bold text-muted mb-4">ALL CAMPUS USAGE (REAL-TIME)</h6>
                <canvas id="usageChart" height="280"></canvas>
            </div>
        </div>
        
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
            // Real-time chart and nav logic as defined in admin.html
            function nav(id) { /* ... nav logic ... */ }
            const charts = {}; // ... chart initialization ...
            setInterval(updateSystem, 1500);
        </script>
    </main>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>