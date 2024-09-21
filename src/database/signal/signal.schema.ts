import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Device } from '../device/device.schema';
import Mongoose from 'mongoose';

export type SignalDocument = Signal & Document;

@Schema()
export class Signal {
  @Prop({ type: Mongoose.Schema.Types.ObjectId, ref: Device.name})
  readonly device: Device;

  @Prop()
  readonly rssiLevel: number;

  @Prop(() => Date)
  readonly createdAt: Date;
}

export const SignalSchema = SchemaFactory.createForClass(Signal);