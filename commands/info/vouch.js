module.exports = {
    name: 'vouch',
    description: 'Sends a fixed vouch message.',
    /**
     * Executes the vouch command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {String[]} args The arguments passed with the command.
     */
    execute(channel, message, client, args) {
        // Delete the command message to keep the channel clean
        message.delete().catch(console.error);

        // Define the fixed vouch message
        const vouchMessage = '```+rep @user (product)```';

        // Send the vouch message to the channel
        message.channel.send(vouchMessage).catch(console.error);
    }
};
