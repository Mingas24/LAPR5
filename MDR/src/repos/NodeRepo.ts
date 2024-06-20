import { Service, Inject } from "typedi";
import { Document, Model } from "mongoose";
import { INodePersistance } from "../dataschema/INodePersistance";
import { INodeRepo } from "../services/IRepos/INodeRepo";
import { Node } from "../domain/Nodes/Node";
import { NodeMap } from "../mappers/NodeMap";

@Service()
export default class NodeRepo implements INodeRepo {
  constructor(
    @Inject("NodeSchema") private NodeSchema: Model<INodePersistance & Document>
  ) {}

  public async save(node: Node): Promise<Node> {
    const query = {
      name: node.nodeName.name,
    };

    const nodeDocument = await this.NodeSchema.findOne(query);

    try {
      if (nodeDocument === null) {
        const rawNode: any = NodeMap.toPersistence(node);
        const nodeCreated = await this.NodeSchema.create(rawNode);
        return NodeMap.toDomain(nodeCreated);
      } else {
        nodeDocument.name = Node.name;
        await nodeDocument.save();
        return node;
      }
    } catch (error) {
      throw error;
    }
  }

  public async exists(node: Node): Promise<boolean> {
    const idx =
      Node instanceof node.toString
        ? (<Node>node).toString()
        : node;
    const query = { node: idx };
    const nodeDocument = await this.NodeSchema.findOne(query);
    return !!nodeDocument === true;
  }

  private createBaseQuery(): any {
    return { where: {} };
  }

  public async findAll(): Promise<Node[]> {
    const nodeDocument = await this.NodeSchema.find({});
    var nodeArray = [];

    try {
      if (nodeDocument === null) {
        return null;
      } else {
        for (var i = 0; i < nodeDocument.length; i++) {
          nodeArray[i] = NodeMap.toDomain(nodeDocument[i]);
        }
        return nodeArray;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByID(name:number): Promise<Node> {
    const query = { nodeID: name };
    const nodeDocument = await this.NodeSchema.findOne(query);
    var node;
    try {
      if (nodeDocument === null) {
        return null;
      } else {
          node = NodeMap.toDomain(nodeDocument);
        return node;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByName(name:string): Promise<Node> {
    const query = { name: name };
    const nodeDocument = await this.NodeSchema.findOne(query);
    var node;
    try {
      if (nodeDocument === null) {
        return null;
      } else {
          node = NodeMap.toDomain(nodeDocument);
        return node;
      }
    } catch (err) {
      throw err;
    }
  }
}
