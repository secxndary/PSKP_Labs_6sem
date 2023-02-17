const redis = require('redis');
const client = redis.createClient({ url: 'redis://localhost:6379' });

client.on('error', () => console.log('Redis internal error.'));
client.on('connect', () => console.log('\nClient connected to Redis.'));
client.on('end', () => console.log('Client disconnected.\n'));



(async () => {
    await client.connect();

    setInterval(async () => {
        await client.publish('ChannelZero', 'Hello from Kanye West ☻');
    }, 1000)
        .unref();

    setInterval(async () => {
        await client.publish('Novoe radio', 'Skrillex – Drop the Bass');
    }, 2000)
        .unref();

    setTimeout(async () => {
        await client.quit();
    }, 5000);
})();
