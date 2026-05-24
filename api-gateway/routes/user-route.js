const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/index');

const routes = ['user'];

module.exports = (app) => {
    routes.forEach((route) => {
        app.use(`/api/v1/${route}`, createProxyMiddleware({
            target: config.services.USER_ROUTES,
            changeOrigin: true,
            pathRewrite: {
                [`^/api/v1/${route}`]: '',
            },
            // onProxyReq: (proxyReq, req, res) => {
            //     if (req.body) {
            //         const bodyData = JSON.stringify(req.body);
            //         // Update headers
            //         proxyReq.setHeader('Content-Type', 'application/json');
            //         proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
            //         // Write body
            //         proxyReq.write(bodyData);
            //     }
            // }
        }));
    });
};