# Lambda Apps Website - Development Server Makefile
# Usage: make [command]

.PHONY: serve dev python-serve help install

PORT ?= 3000
HOST ?= localhost

# Default target
help:
	@echo "Lambda Apps Website - Development Commands"
	@echo ""
	@echo "  make serve        - Start production-like server (Node.js) on port $(PORT)"
	@echo "  make dev          - Start development server with live reload on port $(PORT)"
	@echo "  make python-serve - Start server using Python on port $(PORT)"
	@echo "  make install      - Install development dependencies"
	@echo "  make clean        - Remove installed dependencies"
	@echo ""
	@echo "Override port: make serve PORT=8080"

# Install dependencies
install:
	@echo "Installing development dependencies..."
	npm install

# Serve with Node.js (recommended)
serve:
	@echo "Starting Lambda Apps website on http://$(HOST):$(PORT)"
	@echo "Press Ctrl+C to stop"
	@npx serve . -l $(PORT) --no-clipboard

# Development server with debug
dev:
	@echo "Starting development server on http://$(HOST):$(PORT)"
	@echo "Press Ctrl+C to stop"
	@npx serve . -l $(PORT) --no-clipboard --debug

# Python fallback server
python-serve:
	@echo "Starting Python HTTP server on http://$(HOST):$(PORT)"
	@echo "Press Ctrl+C to stop"
	@python3 -m http.server $(PORT) --bind $(HOST)

# Clean up
clean:
	@echo "Cleaning up..."
	rm -rf node_modules package-lock.json
