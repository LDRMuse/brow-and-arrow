import dotenv from 'dotenv';

// allows us to connect to mongodb
import { MongoClient } from 'mongodb';

// allows us to use .env
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI, {
  useUnifiedTopology: true,
});

(async () => {
  await client.connect();
  process.on('SIGINT', () => {
    client.close().then(() => {
      console.info('Closing');
    });

    process.exit(0);
  });
})();

export default client;
