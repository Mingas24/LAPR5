import mongoose from 'mongoose';
import { ILinePersistence } from '../../dataschema/ILinePersistence';
const Schema = mongoose.Schema;

const LineSchema = new Schema({
    lineID: {type: Number, required:true, unique: true},
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true, unique: true },
    linePath: Array<{
        orientation: { type: string },
        path: { type: string },
        required: false
    }>()
});
// Exportar o modelo
export default mongoose.model<ILinePersistence & mongoose.Document>('Line', LineSchema);