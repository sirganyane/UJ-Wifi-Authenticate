import subprocess
import time
import requests

# Threshold in Megabytes
DATA_CAP_MB = 1024 

def get_user_usage(mac):
    """
    Retrieves the bytes transferred for a specific MAC via iptables statistics.
    """
    try:
        # Commands to check iptables byte counts
        result = subprocess.check_output(["sudo", "iptables", "-L", "FORWARD", "-v", "-n"]).decode()
        for line in result.splitlines():
            if mac.lower() in line.lower():
                # Extracting the byte column (usually the second column)
                parts = line.split()
                bytes_transferred = int(parts[1]) 
                return bytes_transferred / (1024 * 1024) # Convert to MB
    except:
        return 0

def watchdog_loop():
    print("🛰️ UJ WiFi Usage Watchdog Started...")
    while True:
        # Fetch active sessions from our API
        try:
            sessions = requests.get("http://localhost:5000/api/active-sessions").json()
            for user in sessions:
                usage = get_user_usage(user['mac'])
                if usage > DATA_CAP_MB:
                    print(f"⚠️ ALERT: {user['username']} exceeded {DATA_CAP_MB}MB. Triggering Throttle.")
                    # Automatically call our kick or throttle API
                    requests.post(f"http://localhost:5000/api/kick-user/{user['id']}")
        except Exception as e:
            print(f"Watchdog Error: {e}")
        
        time.sleep(30) # Check every 30 seconds

if __name__ == "__main__":
    watchdog_loop()

if usage > DATA_CAP_MB:
    send_uj_alert(f"User {user['username']} has been kicked for exceeding 1GB.")