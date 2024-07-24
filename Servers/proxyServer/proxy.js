const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/user', createProxyMiddleware({ target: 'http://localhost:5001', changeOrigin: true }));
app.use('/event', createProxyMiddleware({ target: 'http://localhost:5002', changeOrigin: true }));
app.use('/booking', createProxyMiddleware({ target: 'http://localhost:5003', changeOrigin: true }));
app.use('/comment', createProxyMiddleware({ target: 'http://localhost:5004', changeOrigin: true }));

app.listen(5000, () => {
    console.log('Proxy server running on port 5000')
});