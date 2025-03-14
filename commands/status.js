const { enableWebServer } = require('../config'); // Import the web server setting

module.exports = {
    name: 'status',
    description: 'Sets the bot\'s status or returns the web page URL if the web server is enabled.',
    
    execute(channel, message, client, args) {
        // If the web server is enabled, return the web page URL
        if (enableWebServer) {
            return message.channel.send(`The web server is active! Update your status here: http://localhost:3003`).catch(console.error);
        }

        // Check if the user has provided a status type and status message
        if (args.length < 2) {
            return message.channel.send('Please provide the status type and message. Usage: !status <type> <message>').catch(console.error);
        }

        const type = args[0].toLowerCase();
        const statusMessage = args.slice(1).join(' ');

        // Valid status types
        const validTypes = {
            playing: 'PLAYING',
            streaming: 'STREAMING',
            listening: 'LISTENING',
            watching: 'WATCHING'
        };

        // Check if the provided type is valid
        if (!validTypes[type]) {
            return message.channel.send('Invalid status type. Available types: playing, streaming, listening, watching.').catch(console.error);
        }

        // Set the bot's status based on the provided type and message
        client.user.setActivity(statusMessage, { 
            type: validTypes[type], 
            url: type === 'streaming' ? 'https://twitch.tv/' : null 
        });

        // Send confirmation message
        message.channel.send(`Status set to "${statusMessage}"`).catch(console.error);
    }
};
