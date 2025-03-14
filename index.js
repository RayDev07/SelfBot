const { Client } = require('discord.js-selfbot-v13');
const { token, enableWebServer } = require('./config');
const readyHandler = require('./handlers/ready');
const messageCreateHandler = require('./handlers/messageCreate');
const commandHandler = require('./handlers/commandHandler');
const crashHandler = require('./handlers/crash-handler');
const webServer = require('./handlers/webServer');

const client = new Client();
let logs = []; // Store logs to send to the website

console.log('Starting bot...');

// Log errors properly
process.on('unhandledRejection', (error) => {
    console.error(`[ERROR] Unhandled Rejection: ${error}`);
});
process.on('uncaughtException', (error) => {
    console.error(`[ERROR] Uncaught Exception: ${error}`);
});

// Initialize event handlers
readyHandler(client);
messageCreateHandler(client);
crashHandler(client);

// Load commands
commandHandler.loadCommands(client);



// Start web server only if enabled in config.js
if (enableWebServer) {
    webServer(client, logs); // Pass logs to the web server
    console.log("Web server is enabled and running.");
} else {
    console.log("Web server is disabled in config.js.");
}

// Log login attempt & success
client.login(token)
    .then(() => console.log('Logged in successfully!'))
    .catch(err => console.error('Failed to login:', err));
