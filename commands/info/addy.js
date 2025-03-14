const config = require('../../config');

module.exports = {
    name: 'addy',
    description: '🔑 Sends your Litecoin (LTC) wallet address in a styled message with emojis.',
    execute(channel, message, client, args) {
        const ltcAddress = config.paymentSources.ltc; // Access Litecoin address from paymentSources
        const addressMessage = `🔒 **Pay Here (LTC) Wallet Address:**\n\n||${ltcAddress}||`;
        message.channel.send(addressMessage);
    }
};