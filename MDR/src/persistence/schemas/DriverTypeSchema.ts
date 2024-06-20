import { IDriverTypePersistence } from '../../dataschema/IDriverTypePersistence';
import mongoose from 'mongoose';

const DriverTypeSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    description: { type: String, unique: true }
    
  },
  {
    timestamps: true
  }
);



export default mongoose.model<IDriverTypePersistence & mongoose.Document>('driverTypeSchema', DriverTypeSchema);
