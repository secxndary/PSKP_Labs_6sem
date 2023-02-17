const redis = require('redis');
const client = redis.createClient({ url: 'redis://localhost:6379' });

client.on('error', () => console.log('Redis internal error.'));
client.on('connect', () => console.log('\nClient connected to Redis.'));
client.on('end', () => console.log('Client disconnected.\n'));




(async () => {
    const clientClone = client.duplicate();
    await clientClone.connect();

    await clientClone.pSubscribe('*', (msg, channel) => {
        console.log(`${channel} sent: ${msg}`);
    }, true);

    setTimeout(async () => {
        await clientClone.unsubscribe();
        await clientClone.quit();
    }, 2000);
})()