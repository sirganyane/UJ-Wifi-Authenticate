import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Chart from 'chart.js/auto';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [vCode, setVCode] = useState("XXXX-XXXX");
  const chartsRef = useRef({});

  useEffect(() => {
    // Initialize charts for Dashboard and Nodes views
    const chartIds = ['usageChart', 'node1Chart', 'node2Chart', 'node3Chart'];
    chartIds.forEach(id => {
      const ctx = document.getElementById(id);
      if (ctx && !chartsRef.current[id]) {
        chartsRef.current[id] = new Chart(ctx, {
          type: 'line',
          data: { 
            labels: Array(15).fill(''), 
            datasets: [{ 
              data: Array(15).fill(0), 
              borderColor: '#FF8C00', 
              tension: 0.4, 
              fill: true, 
              backgroundColor: 'rgba(255,140,0,0.05)', 
              pointRadius: 0 
            }] 
          },
          options: { animation: false, plugins: { legend: { display: false } }, scales: { x: { display: false }, y: { display: false } } }
        });
      }
    });

    const interval = setInterval(() => {
      Object.values(chartsRef.current).forEach(chart => {
        chart.data.datasets[0].data.shift();
        chart.data.datasets[0].data.push(Math.random() * 100);
        chart.update('none');
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <nav id="sidebar">
        <div className="p-4 text-center border-bottom border-secondary">
          <h3 className="fw-bold m-0">UJ <span style={{color: 'var(--uj-orange)'}}>WIFI</span></h3>
          <small className="text-muted text-uppercase">Root Authority</small>
        </div>
        <div className="mt-3 flex-grow-1">
          {['dashboard', 'nodes', 'monitor', 'vouchers', 'blacklist', 'tools'].map((tab) => (
            <div key={tab} className={`nav-item ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              <i className={`fa ${tab === 'dashboard' ? 'fa-th-large' : tab === 'nodes' ? 'fa-network-wired' : tab === 'monitor' ? 'fa-microchip' : tab === 'vouchers' ? 'fa-ticket-alt' : tab === 'blacklist' ? 'fa-user-shield' : 'fa-cogs'}`}></i>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>
        <div className="p-4">
          <button className="btn btn-sm btn-outline-light w-100 mb-2" onClick={() => setIsDarkMode(!isDarkMode)}>🌓 Switch Theme</button>
        </div>
      </nav>

      <main id="main-content">
        <header className="top-bar">
          <h5 className="fw-bold m-0">{activeTab.toUpperCase()}</h5>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/af/University_of_Johannesburg_Logo.svg/1200px-University_of_Johannesburg_Logo.svg.png" height="45" alt="UJ Logo" />
        </header>

        {activeTab === 'dashboard' && (
          <div className="p-4">
            <div className="uj-card">
              <h6>ALL CAMPUS USAGE (REAL-TIME)</h6>
              <canvas id="usageChart" height="280"></canvas>
            </div>
          </div>
        )}
        {/* You can add more conditional blocks here for other tabs (nodes, monitor, etc.) */}
      </main>
    </div>
  );
}

export default App;
:root {
    --uj-orange: #FF8C00;
    --uj-dark: #121212;
}

.light-mode { --bg: #f4f7f6; --text: #212529; --card: #ffffff; --border: #dee2e6; }
.dark-mode { --bg: #0d0d0d; --text: #e0e0e0; --card: #1a1a1a; --border: #333; }

body { margin: 0; background-color: var(--bg); color: var(--text); transition: 0.3s; }
.app-container { display: flex; height: 100vh; width: 100vw; }

#sidebar { width: 280px; background: var(--uj-dark); color: white; display: flex; flex-direction: column; flex-shrink: 0; }
.nav-item { padding: 15px 25px; color: #888; cursor: pointer; display: flex; align-items: center; gap: 15px; border-left: 4px solid transparent; }
.nav-item.active { background: #1a1a1a; color: white; border-left-color: var(--uj-orange); }

#main-content { flex-grow: 1; overflow-y: auto; }
.top-bar { background: var(--card); padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); }

.uj-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 20px; }