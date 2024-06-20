import { Repo } from "../../core/infra/Repo"
import { Node } from "../../domain/Nodes/Node"

export interface INodeRepo extends Repo<Node> {
    //findByEmail (email: UserEmail | string): Promise<User>;
    save(node: Node): Promise<Node>
    findAll(): Promise<Node[]>
    findByID(any):Promise<Node>
    findByName(any):Promise<Node>
}