import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Device } from './device.interface';

@Injectable()
export class DeviceService {
  constructor(@Inject('DEVICE_MODEL') private readonly deviceModel: Model<Device>) { }

  async getById(id: string) {
    return await this.deviceModel.findById(id);
  }

  async setLost(device: Device) {
    if (device.lostAt) {
      return;
    }
    await this.deviceModel.updateOne({_id: device._id}, {$set: {lostAt: new Date()}});
  }

  async setActive(device: Device) {
    if (!device.lostAt) {
      return;
    }
    await this.deviceModel.updateOne({_id: device._id}, {$set: {lostAt: null}});
  }

  async getLost() {
    const date = new Date();
    date.setMinutes(-5);
    return await this.deviceModel.find({lostAt: {$lte: date} });
  }

  async getActiveByZone(zone: string) {
    const date = new Date();
    date.setMinutes(-5);
    return await this.deviceModel.countDocuments({
      zone,
      $or: [
        {lostAt: {$gt: date} },
        {lostAt: {$exists: false}},
        {lostAt: null},
      ]
    });
  }
}