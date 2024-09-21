import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop()
  readonly zone: string;

  @Prop()
  readonly name: string;

  @Prop({ required: false })
  readonly lostAt: Date | null;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);