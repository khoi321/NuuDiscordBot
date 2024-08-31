export default {
  name: 'ping',
  description: 'Replies with Pong!',
  async execute(message) {
    const msg = await message.channel.send('Ping is ...');
    const timeTaken = msg.createdTimestamp - message.createdTimestamp;
    await msg.edit(`Pong! Latency is ${timeTaken}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
  }
};

