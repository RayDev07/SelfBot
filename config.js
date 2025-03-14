module.exports = {
    token: "", // Add your bot token here
    prefix: ".", // Set your command prefix
    allowedUserIDs: [], // Replace with actual user IDs
    allowedNoPrefixUserIDs: [], // Users allowed to use commands without a prefix
    targetServerID: '', // Add your target server ID here
    applicationId: '', // Add your target bot ID here(required for status to work.)

    // Enable or disable the web server
    enableWebServer: true, // Set to false to disable the web server(turn it false if running this on a host.)

    // Payment Sources
    paymentSources: {
        ltc: '', // Add your LTC address here
        paypal: '' // Add your PayPal info here
    },

    // Social Media Links
    socialLinks: {
        telegram: "", // Add your Telegram link here
        discord: "", // Add your Discord username here
        instagram: "" // Add your Instagram link here
    }
};