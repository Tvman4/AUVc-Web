// Point this to your cloud signaling backend (e.g., Render or Glitch) that bridges the iOS host and PC clients
const SERVER_URL = 'https://your-backend-server-url.onrender.com';

const socket = io(SERVER_URL);

document.getElementById('joinBtn').addEventListener('click', () => {
    // Join as a web client looking for the iOS host
    socket.emit('join-room', { role: 'pc-client' });
    document.getElementById('status').innerText = 'Connected to Session';
    document.getElementById('status').style.color = '#34c759';
    document.getElementById('joinBtn').disabled = true;
});

socket.on('host-status', (data) => {
    console.log("iOS Host status received:", data);
});
