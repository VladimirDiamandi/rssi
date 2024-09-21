
// Unit tests for: getById

import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from '../device.service';


// Mock interface for Device
interface MockDevice {
  _id: string;
  lostAt?: Date | null;
  zone?: string;
}

// Mock implementation of the Model
class MockDeviceModel {
  findById = jest.fn();
}

describe('DeviceService.getById() getById method', () => {
  let service: DeviceService;
  let mockDeviceModel: MockDeviceModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        {
          provide: 'DEVICE_MODEL',
          useClass: MockDeviceModel,
        },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    mockDeviceModel = module.get('DEVICE_MODEL');
  });

  describe('Happy Path', () => {
    it('should return a device when a valid ID is provided', async () => {
      // Arrange
      const mockDevice: MockDevice = { _id: '123', lostAt: null };
      mockDeviceModel.findById.mockResolvedValue(mockDevice as any as never);

      // Act
      const result = await service.getById('123');

      // Assert
      expect(result).toEqual(mockDevice);
      expect(mockDeviceModel.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('Edge Cases', () => {
    it('should return null when no device is found for the given ID', async () => {
      // Arrange
      mockDeviceModel.findById.mockResolvedValue(null as any as never);

      // Act
      const result = await service.getById('nonexistent-id');

      // Assert
      expect(result).toBeNull();
      expect(mockDeviceModel.findById).toHaveBeenCalledWith('nonexistent-id');
    });

    it('should handle errors thrown by the model', async () => {
      // Arrange
      const error = new Error('Database error');
      mockDeviceModel.findById.mockRejectedValue(error as never);

      // Act & Assert
      await expect(service.getById('123')).rejects.toThrow('Database error');
      expect(mockDeviceModel.findById).toHaveBeenCalledWith('123');
    });
  });
});

// End of unit tests for: getById
