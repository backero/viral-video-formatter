// Simple development API server
// Run this with: node dev-server.js
// It will serve /api routes on localhost:3001

import http from 'http';
import url from 'url';
import { default as extractNuggets } from './api/extract-nuggets.js';
import { default as generateScreenplay } from './api/generate-screenplay.js';
import { default as validateScreenplay } from './api/validate-screenplay.js';

// Mock request/response objects that work with our API handlers
class MockRequest {
  constructor(data) {
    this.body = data;
    this.method = 'POST';
    this.url = '';
  }
}

class MockResponse {
  constructor(callback) {
    this.statusCode = 200;
    this.headers = {};
    this.callback = callback;
  }

  status(code) {
    this.statusCode = code;
    return this;
  }

  json(data) {
    this.callback({
      statusCode: this.statusCode,
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  end(data) {
    this.callback({
      statusCode: this.statusCode,
      body: data || '',
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const server = http.createServer((req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/api/extract-nuggets' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const mockReq = new MockRequest(data);
        const mockRes = new MockResponse(({ statusCode, body, headers }) => {
          res.writeHead(statusCode, headers);
          res.end(body);
        });
        try {
          extractNuggets(mockReq, mockRes);
        } catch (handlerErr) {
          console.error('extract-nuggets handler error:', handlerErr);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Server error', details: handlerErr.message }));
        }
      } catch (err) {
        console.error('Parse error:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (pathname === '/api/generate-screenplay' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const mockReq = new MockRequest(data);
        const mockRes = new MockResponse(({ statusCode, body, headers }) => {
          res.writeHead(statusCode, headers);
          res.end(body);
        });
        try {
          generateScreenplay(mockReq, mockRes);
        } catch (handlerErr) {
          console.error('generate-screenplay handler error:', handlerErr);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Server error', details: handlerErr.message }));
        }
      } catch (err) {
        console.error('Parse error:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else if (pathname === '/api/validate-screenplay' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const mockReq = new MockRequest(data);
        const mockRes = new MockResponse(({ statusCode, body, headers }) => {
          res.writeHead(statusCode, headers);
          res.end(body);
        });
        try {
          validateScreenplay(mockReq, mockRes);
        } catch (handlerErr) {
          console.error('validate-screenplay handler error:', handlerErr);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Server error', details: handlerErr.message }));
        }
      } catch (err) {
        console.error('Parse error:', err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Endpoint not found' }));
  }
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`🚀 Development API server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  POST /api/extract-nuggets`);
  console.log(`  POST /api/generate-screenplay`);
  console.log(`  POST /api/validate-screenplay`);
});
