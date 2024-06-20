import { Repo } from "../../core/infra/Repo";
import { linePath } from "../../domain/Lines/LinePath";

export interface ILinePathRepo extends Repo<linePath> {
    //findByEmail (email: UserEmail | string): Promise<User>;
    save(linePath: linePath): Promise<linePath>;
}