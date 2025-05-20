const net = require('net');

const host = 'db.naheomblzirlsxkowygx.supabase.co';
const port = 5432;

const client = new net.Socket();

client.connect(port, host, () => {
  console.log(`Successfully connected to ${host}:${port}`);
  client.destroy(); // Close the connection immediately after connecting
});

client.on('error', (err) => {
  console.error(`Connection failed to ${host}:${port}: ${err.message}`);
});

client.on('close', () => {
  console.log('Connection closed');
});
