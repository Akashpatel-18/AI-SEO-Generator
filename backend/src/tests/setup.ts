import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Allow up to 10 minutes for first-time MongoDB binary download.
// Subsequent runs use the cached binary and complete in < 5s.
jest.setTimeout(600000);

let mongo: any;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  }
});
