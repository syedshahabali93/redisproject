import { createClient } from 'redis';

(async () => {
    try{
        const client = createClient();

        client.on('error', (err) => console.log('Redis Client Error', err));
      
        await client.connect();
      
        await client.set('key', 'value');
        const value = await client.get('key');
      
        const subscriber = client.duplicate();
        await subscriber.connect();
      
        await subscriber.subscribe('channel', (message) => {
          console.log(message); // 'message'
        });
        
        await subscriber.pSubscribe('channe*', (message, channel) => {
          console.log(message, channel); // 'message', 'channel'
        });
        
        await subscriber.unsubscribe('channel');
        
        await subscriber.pUnsubscribe('channe*');
      
        await publisher.publish('channel', 'message');
      
    } catch (error) {
        console.log(error);
    }


})();

