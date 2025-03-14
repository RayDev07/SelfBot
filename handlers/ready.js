const AsciiTable = require('ascii-table');
const figlet = require('figlet');

module.exports = (client) => {
    client.on('ready', () => {
        // Generate "Logged in as" message in a smaller font
        figlet.text('Logged in as', {
            font: 'ANSI Shadow',
            horizontalLayout: 'default',
            verticalLayout: 'default'
        }, (err, loggedInAscii) => {
            if (err) {
                console.error('Error generating ASCII art:', err);
                return;
            }
            
            // Print the "Logged in as" message
            console.log(loggedInAscii);

            // Generate username in the Slant font
            figlet.text(client.user.tag, {
                font: 'ANSI Shadow',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            }, (err, usernameAscii) => {
                if (err) {
                    console.error('Error generating ASCII art:', err);
                    return;
                }

                // Print the username in Slant font
                console.log(usernameAscii);

                // Create a new ASCII table
                const table = new AsciiTable().setBorder('║', '═', '✦', '✦');
                table.setTitle('🤖 BOT STATUS');
                table.setHeading('📌 Metric', '📊 Value');
                table.addRow('🌍 Guilds', `${client.guilds.cache.size}`)
                     .addRow('📢 Channels', `${client.channels.cache.size}`)
                     .addRow('👥 Users', `${client.users.cache.size}`);

                console.log(table.toString());
                console.log("🌟━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━🌟\n");
            });
        });
    });
};
