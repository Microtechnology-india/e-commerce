module.exports = {
    apps: [
        {
            name: 'api-gateway',
            script: './api-gateway/server.js',
            // args: 'NODE_ENV=staging PORT=4000',
        },
        {
            name: 'user-service',
            script: './user-service/server.js',
            // args: 'NODE_ENV=staging PORT=4001',
        },
        {
            name: 'product-service',
            script: './product-service/server.js',
            // args: 'NODE_ENV=staging PORT=4002',
        },
        {
            name: 'order-service',
            script: './order-service/server.js',
            // args: 'NODE_ENV=staging PORT=4003',
        },
        {
            name: 'payment-service',
            script: './payment-service/server.js',
            // args: 'NODE_ENV=staging PORT=4004',
        },
        {
            name: 'notification-service',
            script: './notification-service/server.js',
            // args: 'NODE_ENV=staging PORT=4005',
        }
    ]
};