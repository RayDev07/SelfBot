const express = require('express');
const path = require('path');
const { enableWebServer, applicationId } = require('../config');
const http = require('http');
const { Server } = require('socket.io');

module.exports = (client) => {
    if (!enableWebServer) {
        console.log('Web server is disabled in config.js.');
        return;
    }

    const app = express();
    const server = http.createServer(app);
    const io = new Server(server);

    // Middleware to serve static files from /public
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.json());

    console.log('Initializing web server...');

    // Serve homepage.html as the default page
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/homepage.html'));
    });

    // Serve rpc.html at /rpc
    app.get('/rpc', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/rpc.html'));
    });

    // Endpoint to update Discord RPC status
    app.post('/update-status', (req, res) => {
        try {
            const { activityType, details, state, url, largeImage, smallImage } = req.body;

            const activityOptions = {
                applicationId: applicationId,
                name: details,
                type: activityType.toUpperCase(),
                url: activityType.toUpperCase() === 'STREAMING' ? url : undefined,
                assets: {
                    large_image: largeImage || undefined,
                    small_image: smallImage || undefined,
                },
                state: state || undefined,
            };

            client.user.setActivity(activityOptions);
            client.user.setPresence({ status: 'dnd' });

            console.log('Status updated:', activityOptions);
            return res.status(200).send('Status updated successfully!');
        } catch (error) {
            console.error('Error updating status:', error);
            return res.status(500).send('Error updating status');
        }
    });

    // Endpoint to receive logs from messageCreate.js and emit them via Socket.io
    app.post('/log-command', (req, res) => {
        const { user, userId, command, args } = req.body;

        const logMessage = `👤 ${user} (${userId}) executed: 🔧 ${command} [${args.join(', ')}]`;
        console.log(logMessage);

        // Emit log message to connected clients
        io.emit('newLog', logMessage);

        res.status(200).send('Log received');
    });

    // Start the server
    const PORT = process.env.PORT || 3003;
    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    // Handle WebSocket connections
    io.on('connection', (socket) => {
        console.log('A user connected to the log viewer.');
        socket.on('disconnect', () => {
            console.log('A user disconnected from the log viewer.');
        });
    });
};
