import { Repo } from "../../core/infra/Repo";
import { Line } from "../../domain/Lines/Line";

export interface ILineRepo extends Repo<Line> {
    save(line: Line): Promise<Line>;
    //findByDomainId(lineId: LineID | number): Promise<Line>;
    findAll(): Promise<Line[]>
    findByName(lineName: string): Promise<Line>
}