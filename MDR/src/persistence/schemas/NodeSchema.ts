import mongoose from "mongoose";
import { INodePersistance } from "../../dataschema/INodePersistance";

const NodeSchema = new mongoose.Schema({
  nodeID: { type: Number, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  latitude: { type: Number, required: true, unique: true },
  longitude: { type: Number, required: true, unique: true },
  shortName: { type: String, required: true, unique: true },
  isDepot: { type: Boolean, required: true },
  isReliefPoint: { type: Boolean, required: true },
  crewTravelTime: [
    {
      id: { type: Number, required: true },
      nodeID: { type: Number, required: true },
      duration: { type: Number, required: true },
    },
  ],
});

export default mongoose.model<INodePersistance & mongoose.Document>(
  "Node",
  NodeSchema
);
