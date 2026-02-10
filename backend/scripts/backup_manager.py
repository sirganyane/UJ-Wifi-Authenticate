import shutil
import time
import os
from datetime import datetime

BACKUP_DIR = 'backups'
DB_FILE = 'database.db'

if not os.path.exists(BACKUP_DIR):
    os.makedirs(BACKUP_DIR)

def run_backup():
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_path = os.path.join(BACKUP_DIR, f"uj_wifi_backup_{timestamp}.db")
    
    try:
        shutil.copy2(DB_FILE, backup_path)
        print(f"📦 Backup created: {backup_path}")
        
        # Keep only the last 7 backups to save space
        all_backups = sorted([os.path.join(BACKUP_DIR, f) for f in os.listdir(BACKUP_DIR)])
        if len(all_backups) > 7:
            os.remove(all_backups[0])
    except Exception as e:
        print(f"❌ Backup failed: {e}")

if __name__ == "__main__":
    while True:
        run_backend()
        time.sleep(86400) # Wait 24 hours