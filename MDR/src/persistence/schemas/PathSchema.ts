import mongoose from 'mongoose'
import { IPathPersistence } from '../../dataschema/IPathPersistance'
const Schema = mongoose.Schema;

const PathSchema = new Schema({
  key: { type: String, required: true, unique: true },
  isEmpty: { type: Boolean },
  pathNode: Array<{
    node1: { type: string, unique: true}
    node2: { type: string , unique: true}
    duration: { type: Number }
    distance: { type: Number }
  }>(),
});
// Exportar o modelo
export default mongoose.model<IPathPersistence & mongoose.Document>('Path', PathSchema)