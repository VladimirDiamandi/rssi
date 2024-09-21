import { Device } from "src/database/device/device.schema";

export interface ISignalPayload {
  deviceId: string;
  rssiLevel: number;
}

export interface ICreateSignalPayload {
  device: Device;
  rssiLevel: number;
}

export interface IAlertPayload {
  deviceId: string;
  last: Date
}