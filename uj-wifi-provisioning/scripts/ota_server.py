import http.server
import socketserver
import os

PORT = 8080
DIRECTORY = "../profiles"

class ProfileHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Serve from the 'profiles' directory
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Essential: Add the header Apple devices look for
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

# Explicitly map the extension to the correct Apple MIME type
ProfileHandler.extensions_map.update({
    '.mobileconfig': 'application/x-apple-aspen-config',
})

print(f"🚀 UJ Provisioning Server started at http://localhost:{PORT}")
print(f"👉 On your iPhone/Mac, go to: http://[YOUR-IP-ADDRESS]:{PORT}/uj_wifi_final.mobileconfig")

with socketserver.TCPServer(("", PORT), ProfileHandler) as httpd:
    httpd.serve_forever()