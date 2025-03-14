const { translate } = require('@vitalets/google-translate-api');

module.exports = {
    name: 'translate',
    description: 'Translates text to English from the replied message or provided text.',
    /**
     * Executes the translate command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {String[]} args The arguments passed with the command.
     */
    async execute(channel, message, client, args) {
        // Delete the command message
        message.delete().catch(console.error);

        let textToTranslate;

        // Check if the message is a reply
        if (message.reference) {
            try {
                // Get the replied message
                const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
                textToTranslate = repliedMessage.content;

                // Use the translation API to translate the text
                const res = await translate(textToTranslate, { to: 'en' });

                // Send the translated text
                await message.channel.send(`Translated text: **${res.text}**`);
            } catch (err) {
                console.error(err);
                await message.channel.send('There was an error translating the text. Please try again.');
            }
        } else {
            // Check if there are enough arguments
            if (args.length < 1) {
                return await message.channel.send('Please provide the text to translate or reply to a message.');
            }

            // Extract the text to translate
            textToTranslate = args.join(' ');

            try {
                // Use the translation API to translate the text
                const res = await translate(textToTranslate, { to: 'en' });

                // Send the translated text
                await message.channel.send(`Translated text: **${res.text}**`);
            } catch (err) {
                console.error(err);
                await message.channel.send('There was an error translating the text. Please try again.');
            }
        }
    }
};
