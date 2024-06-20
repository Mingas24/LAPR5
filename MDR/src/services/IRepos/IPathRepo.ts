import { Repo } from "../../core/infra/Repo"
import { Path } from "../../domain/Lines/Path"

export interface IPathRepo extends Repo<Path> {
    //findByEmail (email: UserEmail | string): Promise<User>;
    save(path: Path): Promise<Path>;
    //findByDomainId (roleId: lineId | string): Promise<Line>;
    findAll(): Promise<Path[]>;
    findById(any): Promise<Path>;
}