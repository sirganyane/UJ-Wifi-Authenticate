import http.server
import socketserver
import sys

# Now it checks if you provided a port, otherwise defaults to 8080
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

class UJHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or 'index.php' in self.path:
            ua = self.headers.get('User-Agent', '').lower()
            os_type = 'ios' if 'iphone' in ua or 'ipad' in ua else ('android' if 'android' in ua else 'desktop')
            self.send_response(302)
            self.send_header('Location', f'/landing.php?os={os_type}')
            self.end_headers()
        else:
            return http.server.SimpleHTTPRequestHandler.do_GET(self)

# Added "Allow Reuse" to prevent the WinError 10048 in the future
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", PORT), UJHandler) as httpd:
    print(f"UJ Portal running at http://localhost:{PORT}")
    httpd.serve_forever()
