const { Channel, Message, Client } = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');

module.exports = {
    name: "quote",
    description: "Quotes a referenced message",
    /**
     * Executes the quote command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     */
    async execute(channel, message, client) {
        if (!message.reference) {
            return message.reply({ content: "No message to quote.", ephemeral: true });
        }

        try {
            const quotedChannel = await client.channels.fetch(message.reference.channelId);
            const quotedMessage = await quotedChannel.messages.fetch(message.reference.messageId);

            const payload = {
                username: quotedMessage.author.username,
                display_name: quotedMessage.member ? quotedMessage.member.displayName : quotedMessage.author.username,
                text: quotedMessage.content,
                avatar: quotedMessage.author.displayAvatarURL({ dynamic: true }),
                color: true
            };

            const response = await fetch('https://api.voids.top/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch quote: ${response.statusText}`);
            }

            const quote = await response.json();
            await message.reply({ content: quote.url, ephemeral: true });
        } catch (error) {
            console.error('Error quoting the message:', error);
            await message.reply({ content: "An error occurred while quoting the message.", ephemeral: true });
        }
    }
};
