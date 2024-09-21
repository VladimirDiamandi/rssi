
import { Mongoose } from 'mongoose';
import { SignalSchema } from './signal.schema';

export const signalProviders = [
  {
    provide: 'SIGNAL_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Signal', SignalSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];