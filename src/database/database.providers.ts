import * as mongoose from 'mongoose';
import { ConfigService } from 'src/config/config.service';

const config = new ConfigService('.env');
const MONGO_URL = config.get('MONGO_URL');


export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(MONGO_URL),
  },
];