const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'help',
    description: 'Displays a list of available commands.',
    execute(channel, message, client, args) {
        message.delete().catch(() => {});

        const { prefix } = require('../config');
        const baseDir = path.resolve(__dirname, '../commands');

        const readCommands = (dir) => {
            return fs.readdirSync(dir).filter(file => file.endsWith('.js')).map(file => require(path.join(dir, file)));
        };

        let helpMessage = `**✅ V3 SELF BOT COMMANDS ✅**\n\n`;

        // Root commands
        const rootCommands = readCommands(baseDir);
        if (rootCommands.length > 0) {
            helpMessage += `📌 **General Commands**\n`;
            rootCommands.forEach(cmd => {
                helpMessage += `➜ \`${prefix}${cmd.name}\` - ${cmd.description}\n`;
            });
            helpMessage += `\n`;
        }

        // Categorized commands
        const categories = fs.readdirSync(baseDir, { withFileTypes: true }).filter(dir => dir.isDirectory());
        categories.forEach(categoryDir => {
            const category = categoryDir.name;
            const commandsInCategory = readCommands(path.join(baseDir, category));
            if (commandsInCategory.length > 0) {
                helpMessage += `📂 **${category.toUpperCase()} COMMANDS**\n`;
                commandsInCategory.forEach(cmd => {
                    helpMessage += `🔹 \`${prefix}${cmd.name}\` - ${cmd.description}\n`;
                });
                helpMessage += `\n`;
            }
        });

        helpMessage += `_Made by Devrock and Ray 🚀_`;

        // Sending message in code block for cleaner formatting
        channel.send(`\`\`\`${helpMessage}\`\`\``).catch(err => console.error('Failed to send help message:', err));
    }
};
