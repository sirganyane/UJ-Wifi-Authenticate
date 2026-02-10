#!/bin/bash
# gateway_setup.sh - Run this on the WiFi Gateway Server

# 1. Enable IP Forwarding (Allows the server to act as a router)
echo 1 > /proc/sys/net/ipv4/ip_forward

# 2. Redirect all traffic on Port 80 (HTTP) to our Flask App (Port 5000)
# This forces the "Inverted" portal to appear
sudo iptables -t nat -A PREROUTING -i eth1 -p tcp --dport 80 -j REDIRECT --to-port 5000

# 3. Allow DNS (Port 53) so users can resolve the UJ login domain
sudo iptables -A FORWARD -p udp --dport 53 -j ACCEPT
sudo iptables -A FORWARD -p tcp --dport 53 -j ACCEPT

echo "UJ WiFi Gateway Interception Active."