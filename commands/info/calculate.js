const math = require('mathjs');

module.exports = {
    name: 'calculate',
    description: 'Calculates a mathematical expression.',
    /**
     * Executes the calculate command.
     * 
     * @param {Channel} channel The channel where the command was executed.
     * @param {Message} message The message object for the command.
     * @param {Client} client The client or bot instance.
     * @param {String[]} args The arguments passed with the command.
     */
    execute(channel, message, client, args) {
        // Delete the command message
        message.delete().catch(console.error);

        // Join the arguments to form the expression
        const expression = args.join(' ');

        // Check if the expression is empty
        if (!expression) {
            return message.channel.send('Please provide a mathematical expression to calculate.').catch(console.error);
        }

        try {
            // Use math.js to evaluate the expression safely
            const result = math.evaluate(expression);

            // Send the result
            message.channel.send(`The result of \`${expression}\` is: **${result}**`).catch(console.error);
        } catch (error) {
            // Handle any errors in the expression
            message.channel.send('There was an error in your mathematical expression. Please try again.').catch(console.error);
        }
    }
};
