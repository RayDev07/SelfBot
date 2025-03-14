const config = require('../../config.js'); // Adjust path if needed

module.exports = {
    name: 'social',
    description: 'Displays the user\'s social media links.',

    execute(channel, message, client, args) {
        message.delete().catch(console.error);

        // Get social links from config
        const socialLinks = `
        📱 **Follow me on my Socials** 📱

        ✈️ Telegram: [t.me](<${config.socialLinks.telegram}>)
        🛠️ Discord: **${config.socialLinks.discord}**
        📸 Instagram: [Instagram](<${config.socialLinks.instagram}>)
        `;

        message.channel.send(socialLinks).catch(console.error);
    }
};
