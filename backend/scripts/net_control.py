import subprocess

class WiFiTools:
    @staticmethod
    def limit_bandwidth(interface, speed_mbps):
        """Uses Traffic Control (tc) to throttle the WiFi interface."""
        # Clear existing rules
        subprocess.run(["tc", "qdisc", "del", "dev", interface, "root"], capture_output=True)
        
        if speed_mbps == "0":
            return "Speed limit removed."

        # Apply new speed limit
        cmd = [
            "tc", "qdisc", "add", "dev", interface, "root", "tbf",
            "rate", f"{speed_mbps}mbit", "burst", "32kbit", "latency", "400ms"
        ]
        subprocess.run(cmd)
        return f"Interface {interface} throttled to {speed_mbps}Mbps"

    @staticmethod
    def get_connected_clients():
        """Returns a list of MAC addresses currently on the network."""
        result = subprocess.run(["arp", "-a"], capture_output=True, text=True)
        return result.stdout

@staticmethod
    def blacklist_device(mac):
        """Adds a MAC address to the firewall DROP list."""
        # Ensure the MAC is removed from any ALLOW lists first
        subprocess.run(["sudo", "iptables", "-D", "INPUT", "-m", "mac", "--mac-source", mac, "-j", "ACCEPT"])
        
        # Add to the DROP list (Banned)
        subprocess.run(["sudo", "iptables", "-I", "INPUT", "-m", "mac", "--mac-source", mac, "-j", "DROP"])
        return f"MAC {mac} has been blacklisted."

@staticmethod
    def get_user_usage(mac):
        """Queries iptables to see how many bytes a MAC address has consumed."""
        result = subprocess.run(["sudo", "iptables", "-L", "FORWARD", "-v", "-n"], 
                                capture_output=True, text=True)
        # Logic to parse the specific line for the MAC address and extract 'bytes'
        # This is a simplified representation of the parsing logic
        for line in result.stdout.splitlines():
            if mac in line:
                parts = line.split()
                return int(parts[1]) # The second column in 'iptables -v' is usually bytes
        return 0