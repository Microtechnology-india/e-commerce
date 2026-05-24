// config/index.js
const local = require('./json/local.json');
const staging = require('./json/staging.json');
const production = require('./json/production.json');

// Parse CLI args like NODE_ENV=staging
process.argv.forEach(arg => {
    const [key, value] = arg.split('=');
    if (key && value) process.env[key] = value;
});

const stage = process.env.NODE_ENV || 'local';

const configs = { local, staging, production };
const config = configs[stage];

if (!config) throw new Error(`Configuration for stage "${stage}" not found!`);

console.log(`Using "${stage}" configuration`);

module.exports = config;