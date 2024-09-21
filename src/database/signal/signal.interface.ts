import { Document } from 'mongoose';

export interface Signal extends Document {
  readonly device: string;
  readonly rssiLevel: number;
  readonly createdAt: Date;
}