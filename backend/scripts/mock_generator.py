import random
import time
import sqlite3
from datetime import datetime

def generate_mock_traffic():
    """Simulates live traffic data for the Admin Dashboard."""
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    print("🚀 Starting UJ WiFi Mock Traffic Generator...")
    
    try:
        while True:
            # Generate fake metrics
            active_users = random.randint(150, 450)
            avg_speed = round(random.uniform(5.5, 18.2), 2)
            timestamp = datetime.now().strftime('%H:%M:%S')
            
            # This simulates writing to a 'LiveStats' table if you add one,
            # or just printing to console for verification.
            print(f"[{timestamp}] Active Students: {active_users} | Avg Throughput: {avg_speed} Mbps")
            
            # Optional: Simulate a 'Network Alert' every 20 seconds
            if random.random() > 0.8:
                print("⚠️ ALERT: High latency detected on APK Library Access Point.")

            time.sleep(2) # Update every 2 seconds to match the Chart.js refresh
    except KeyboardInterrupt:
        print("\nStopping mock generator...")
    finally:
        conn.close()

if __name__ == "__main__":
    generate_mock_traffic()