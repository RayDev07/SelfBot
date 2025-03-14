const socket = io();

// Function to add a new log entry to the terminal UI
socket.on('newLog', (logMessage) => {
    const consoleOutput = document.getElementById('consoleOutput');
    const logElement = document.createElement('p');
    logElement.className = 'line';
    logElement.textContent = `$ ${logMessage}`;

    // Add new log entry and remove the "waiting for logs" message if it's still there
    if (consoleOutput.firstChild.textContent.includes('Waiting for logs')) {
        consoleOutput.innerHTML = '';
    }

    consoleOutput.appendChild(logElement);

    // Auto-scroll to the latest log
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
});

