import random
import time
from datetime import datetime

def generate():
    print("🚀 UJ WiFi Mock Traffic Started...")
    try:
        while True:
            users = random.randint(200, 500)
            load = round(random.uniform(10.5, 95.5), 1)
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Active: {users} users | Bandwidth: {load} Mbps")
            time.sleep(2)
    except KeyboardInterrupt:
        print("Stopping...")

if __name__ == '__main__':
    generate()
