const { Channel, Message, Client } = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');

module.exports = {
    name: "fakequote",
    description: "Creates a quote image using a UserID and provided text",
    /**
     * Executes the fakequote command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {Array} args Arguments provided with the command.
     */
    async execute(channel, message, client, args) {
        if (args.length < 2) {
            return message.reply({ content: "Missing arguments. Please specify a UserID and the content.", ephemeral: true });
        }

        const userId = args[0];
        const content = args.slice(1).join(' ');

        // Check if userId contains only digits
        if (!/^\d+$/.test(userId)) {
            return message.reply({ content: 'UserID should be numeric.', ephemeral: true });
        }

        try {
            // Fetch user information using client
            const user = await client.users.fetch(userId);

            // Check if the user exists
            if (!user) {
                return message.reply({ content: 'Invalid UserID provided.', ephemeral: true });
            }

            // Construct payload for quote image generation
            const payload = {
                username: `${user.username}#${user.discriminator}`,
                display_name: user.username,
                text: content,
                avatar: user.displayAvatarURL({ dynamic: true }),
                color: true
            };

            // Send payload to quote API
            const response = await fetch('https://api.voids.top/quote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`Failed to generate quote image: ${response.statusText}`);
            }

            const quote = await response.json();
            await message.reply({ content: quote.url, ephemeral: true });
        } catch (error) {
            console.error('Error generating quote image:', error);
            await message.reply({ content: "An error occurred while generating the quote image.", ephemeral: true });
        }
    }
};
