module.exports = (client) => {
    const targetServerID = '1165841460751507468'; // Define targetServerID directly here

    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
        console.error('Unhandled Exception:', error);
        // Optionally, inform a designated channel or admin about the crash.
        // const channelId = 'YOUR_CHANNEL_ID_HERE';
        // client.channels.cache.get(channelId)?.send(`🚨 An error occurred: ${error.message}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
        console.warn('Unhandled Rejection at:', promise, 'reason:', reason);
        // Optionally, inform a designated channel or admin about the rejection.
        // const channelId = 'YOUR_CHANNEL_ID_HERE';
        // client.channels.cache.get(channelId)?.send(`🚨 Unhandled promise rejection: ${reason}`);
    });

    // Check if the account is joined to the target server
    client.once('ready', async () => {
        console.log("Logged in successfully.");

        setImmediate(() => {
            setTimeout(() => {
                if (!client.guilds.cache.has(targetServerID)) {
                    console.log('Account is not joined in our server. Click here to join: https://discord.gg/d3EKfVufrg.');
                    client.destroy(); // Destroy the client if not in the server
                } else {
                    console.log(`Account is joined to the server.`);
                }
            }, 10000); // 3-second delay
        });
    });
};
