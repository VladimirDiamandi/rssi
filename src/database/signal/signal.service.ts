import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Signal } from './signal.interface';
import { ICreateSignalPayload } from 'src/dto/signal.dto';

@Injectable()
export class SignalService {
  constructor(@Inject('SIGNAL_MODEL') private readonly signalModel: Model<Signal>) { }

  async create(payload: ICreateSignalPayload) {
    return await this.signalModel.create({
      ...payload,
      createdAt: new Date()
    });
  }

  async getLast(deviceId) {
    const signals = await this.signalModel.find({ deviceId }).sort({ createdAt:1 }).limit(1);
    return signals.length ? signals[0] : null;
  }
}