import { IVehicleTypePersistence } from '../../dataschema/IVehicleTypePersistence';
import mongoose from 'mongoose';

const VehicleTypeSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    autonomy: { type: Number, unique: false },
    cost: { type: Number, unique: false},
    averageSpeed: { type: Number, unique: false},
    energySource: { type: Number, unique: false},
    consumption: { type: Number, unique: false},
    emissions: { type: Number, unique: false},
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IVehicleTypePersistence & mongoose.Document>('VehicleType', VehicleTypeSchema);
