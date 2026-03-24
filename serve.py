#!/usr/bin/env python3
"""
Lambda Apps Website - Development Server
A professional HTTP server for local development with proper MIME types and logging.
"""

import http.server
import socketserver
import webbrowser
import argparse
import sys
from pathlib import Path


class LambdaHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler with enhanced MIME types and clean logging."""
    
    # Enhanced MIME types for modern web development
    EXTENSIONS_MAP = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.json': 'application/json',
        '.svg': 'image/svg+xml',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.otf': 'font/otf',
        '.eot': 'application/vnd.ms-fontobject',
        '.webp': 'image/webp',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif',
        '.ico': 'image/x-icon',
        '.pdf': 'application/pdf',
    }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(Path(__file__).parent), **kwargs)
    
    def end_headers(self):
        # Add security and caching headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('Cache-Control', 'no-cache, must-revalidate')
        super().end_headers()
    
    def guess_type(self, path):
        """Override MIME type guessing with enhanced mappings."""
        ext = Path(path).suffix.lower()
        if ext in self.EXTENSIONS_MAP:
            return self.EXTENSIONS_MAP[ext]
        return super().guess_type(path)
    
    def log_message(self, format, *args):
        """Clean log format."""
        # Filter out favicon 404s and common noise
        if 'favicon.ico' in args[0] and args[1] == '404':
            return
        
        # Color-code status codes
        status_code = args[1]
        color = {
            '200': '\033[32m',  # Green
            '304': '\033[33m',  # Yellow
            '404': '\033[31m',  # Red
        }.get(status_code, '\033[0m')
        
        reset = '\033[0m'
        print(f"{color}[{status_code}]{reset} {args[0]}")


def print_banner(host: str, port: int):
    """Print a nice startup banner."""
    url = f"http://{host}:{port}"
    banner = f"""
┌─────────────────────────────────────────────────┐
│                                                 │
│   🚀 Lambda Apps Website - Development Server   │
│                                                 │
│   Local:   {url:<35}│
│   Network: http://0.0.0.0:{port:<29}│
│                                                 │
│   Press Ctrl+C to stop                          │
│                                                 │
└─────────────────────────────────────────────────┘
"""
    print(banner)


def main():
    parser = argparse.ArgumentParser(
        description='Lambda Apps Website - Development Server',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                    # Serve on default port 3000
  %(prog)s -p 8080            # Serve on port 8080
  %(prog)s --no-browser       # Don't auto-open browser
        """
    )
    parser.add_argument(
        '-p', '--port',
        type=int,
        default=3000,
        help='Port to serve on (default: 3000)'
    )
    parser.add_argument(
        '--host',
        default='localhost',
        help='Host to bind to (default: localhost)'
    )
    parser.add_argument(
        '--no-browser',
        action='store_true',
        help='Do not automatically open browser'
    )
    
    args = parser.parse_args()
    
    # Allow CORS and bind to all interfaces if using 0.0.0.0
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer((args.host, args.port), LambdaHTTPRequestHandler) as httpd:
            print_banner(args.host, args.port)
            
            # Open browser if requested
            if not args.no_browser:
                url = f"http://{args.host}:{args.port}"
                webbrowser.open(url)
            
            try:
                httpd.serve_forever()
            except KeyboardInterrupt:
                print("\n\n👋 Server stopped. See you next time!")
                sys.exit(0)
                
    except OSError as e:
        if e.errno == 98:  # Address already in use
            print(f"\n❌ Port {args.port} is already in use.")
            print(f"   Try: python3 serve.py -p {args.port + 1}")
            sys.exit(1)
        raise


if __name__ == '__main__':
    main()
