#!/bin/bash
echo "🔧 Setting up UJ WiFi Gateway Policies..."
sudo iptables -F
sudo iptables -A FORWARD -j ACCEPT
echo "✅ Gateway rules applied to eth0."
