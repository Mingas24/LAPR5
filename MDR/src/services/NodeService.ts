import { Service, Inject } from 'typedi';
import config from "../../config";
import INodeDTO from '../dto/INodeDTO';
import { Node } from "../domain/Nodes/Node";
import { INodeRepo } from '../services/IRepos/INodeRepo';
import INodeService from './IServices/INodeService';
import { Result } from "../core/logic/Result";
import { NodeMap } from "../mappers/NodeMap";

@Service()
export default class NodeService implements INodeService {
    constructor(
        @Inject(config.repos.node.name) private nodeRepo: INodeRepo
    ) { }

    public async createNode(nodeDTO: INodeDTO): Promise<Result<INodeDTO>> {
        try {

            const nodeOrError = await Node.create(nodeDTO);

            if (nodeOrError.isFailure) {
                return Result.fail<INodeDTO>(nodeOrError.errorValue());
            }

            const nodeResult = nodeOrError.getValue();

            await this.nodeRepo.save(nodeResult);

            const nodeDTOResult = NodeMap.toDTO(nodeResult) as INodeDTO;
            return Result.ok<INodeDTO>(nodeDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async getNodes(): Promise<INodeDTO[]> {

        var nodes = [];
        try {
            const node = await this.nodeRepo.findAll()
            for (var i = 0; i < node.length; i++) {
                nodes[i] = NodeMap.toDTO(node[i])
            }
            return nodes;
        }
        catch (e) {
            throw e;
        }
    }

    public async getNodeByID(name:number): Promise<INodeDTO> {
        var node;
        try {
            const findNode = await this.nodeRepo.findByID(name)
                node = NodeMap.toDTO(findNode)
            return node;
        }
        catch (e) {
            throw e;
        }
    }
    public async getNodeByName(name:string): Promise<INodeDTO> {
        var node;
        try {
            const findNode = await this.nodeRepo.findByName(name)
                node = NodeMap.toDTO(findNode)
            return node;
        }
        catch (e) {
            throw e;
        }
    }
    /*
    public async updateNode(nodeDTO: INodeDTO): Promise<Result<INodeDTO>> {
        try {
            const node = await this.nodeRepo.findByDomainId(nodeDTO.name);
 
            if (node === null) {
                return Result.fail<INodeDTO>("Node not found");
            }
            else {
                node.name = nodeDTO.name;
                await this.nodeRepo.save(node);
 
                const nodeDTOResult = NodeMap.toDTO(node) as INodeDTO;
                return Result.ok<INodeDTO>(nodeDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }
*/
}
