const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require('../config/index')

const routes = ['notification']

module.exports = (app) => {
    routes.forEach((route) => {
        app.use(`/api/v1/${route}`, createProxyMiddleware({
            target: config.services.NOTIFICATION_ROUTES,
            changeOrigin: true,
            pathRewrite: {
                [`^/api/v1/${route}`]: '',
            },
        }));
    });
};



