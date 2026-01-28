#!/bin/bash
echo "--- UJ WiFi Internal Health Check ($(date)) ---"
# Check LDAP
docker exec uj_wifi_portal nc -zv uj_ldap_server 389 && echo "✅ LDAP is Reachable" || echo "❌ ALERT: LDAP Unreachable"
# Check Database
docker exec uj_wifi_portal nc -zv uj_audit_db 3306 && echo "✅ Database is Reachable" || echo "❌ ALERT: Database Unreachable"
