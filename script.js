// Point this to your cloud signaling backend (e.g., Render or Glitch)
const SERVER_URL = 'https://your-backend-server-url.onrender.com';

const socket = io(SERVER_URL);

document.getElementById('joinBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value.trim();
    const roomCode = document.getElementById('roomCode').value.trim().toUpperCase();
    const errorMsg = document.getElementById('errorMsg');

    errorMsg.innerText = '';

    if (!username || !roomCode) {
        errorMsg.innerText = 'Please enter both your name and a room code.';
        return;
    }

    // Attempt to join the room as a PC client
    socket.emit('join-room', { 
        role: 'pc-client', 
        name: username, 
        room: roomCode 
    });
});

// Server replies if the room doesn't have an active iOS host
socket.ons('room-error', (message) => {
    document.getElementById('errorMsg').innerText = message;
    document.getElementById('status').innerText = 'Connection Failed';
    document.getElementById('status').style.color = '#ff3b30';
});

socket.on('room-joined', () => {
    document.getElementById('status').innerText = 'Connected to iOS Host';
    document.getElementById('status').style.color = '#34c759';
    document.getElementById('joinBtn').disabled = true;
    document.getElementById('username').disabled = true;
    document.getElementById('roomCode').disabled = true;
});
