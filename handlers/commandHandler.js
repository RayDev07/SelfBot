const fs = require('fs');
const path = require('path');

const commands = {};
let commandsLoaded = false; // Flag to track if commands have already been loaded

const loadCommands = () => {
    // If commands are already loaded, exit the function
    if (commandsLoaded) {
        return;
    }

    const baseDir = path.join(__dirname, '../commands');

    const readCommands = (dir) => {
        return fs.readdirSync(dir).filter(file => file.endsWith('.js')).map(file => {
            try {
                return require(path.join(dir, file));
            } catch (error) {
                console.error(`\n❌ [ERROR] Failed to load command: ${file}`);
                console.error(`🚨 Error:`, error, "\n");
                return null;
            }
        }).filter(command => command !== null);
    };

    // Clear the commands object before loading to prevent duplicates
    for (const key in commands) {
        delete commands[key];
    }

    console.log(`\n🛠️ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`);
    console.log(`📂 ┃ 🚀 Loading Commands...               `);
    console.log(`🔍 ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫`);

    // Load commands from the root /commands directory
    const rootCommands = readCommands(baseDir);
    commands['root'] = rootCommands;
    rootCommands.forEach(command => {
        console.log(`✅ ┃ 📌 Loaded: root/${command.name}`);
    });

    // Load commands from subdirectories
    const commandCategories = fs.readdirSync(baseDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
    commandCategories.forEach(categoryDir => {
        const category = categoryDir.name;
        const commandsInCategory = readCommands(path.join(baseDir, category));
        commands[category] = commandsInCategory;
        commandsInCategory.forEach(command => {
            console.log(`🎯 ┃ 📜 Loaded: ${category}/${command.name}`);
        });
    });

    console.log(`🎉 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n`);

    // Set the flag to true after loading commands
    commandsLoaded = true;
};

const getCommand = (commandName) => {
    for (const category in commands) {
        const command = commands[category].find(cmd => cmd.name === commandName);
        if (command) return command;
    }
    return null;
};

module.exports = {
    loadCommands,
    getCommand,
    commands
};