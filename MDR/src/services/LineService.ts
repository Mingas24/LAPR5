import { Service, Inject } from "typedi";
import config from "../../config";
import ILineDTO from "../dto/ILineDTO";
import { Line } from "../domain/Lines/Line";
import { ILineRepo } from "./IRepos/ILineRepo";
import ILineService from "./IServices/ILineService";
import { Result } from "../core/logic/Result";
import { lineMap } from "../mappers/LineMap";
import { linePath } from "../domain/Lines/LinePath";
import { orientation } from "../domain/Lines/Orientation";
import { PathID } from "../domain/Lines/PathID";
import { lineName } from "../domain/Lines/LineName";
import { lineColor } from "../domain/Lines/LineColor";
import { lineId } from "../domain/Lines/LineId";


@Service()
export default class lineService implements ILineService {
  constructor(@Inject(config.repos.line.name) private lineRepo: ILineRepo) { }

  public async createLine(lineDTO: ILineDTO): Promise<Result<ILineDTO>> {
    try {
      const lineOrError = await Line.create(lineDTO);
      if (lineOrError.isFailure) {
        return Result.fail<ILineDTO>(lineOrError.errorValue());
      }

      const lineResult = lineOrError.getValue();

      await this.lineRepo.save(lineResult);

      const lineDTOResult = lineMap.toDTO(lineResult) as ILineDTO;
      return Result.ok<ILineDTO>(lineDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async addLinePath(lineDTO: ILineDTO): Promise<Result<ILineDTO>> {
    try {
      const line = await this.lineRepo.findByName(lineDTO.name);

      if (line === null) {
        return Result.fail<ILineDTO>("Line not found");
      } else {
        var newLinePathA: Array<linePath> = [];
        for (var i = 0; i < lineDTO.linePath.length; i++) {
          var ori = orientation.create(lineDTO.linePath[i].orientation);
          var pathID = PathID.create(lineDTO.linePath[i].pathID);
          var newlinePath = linePath.create({
            orientation: ori.getValue().orientation,
            pathID: pathID.getValue().value,
          });
          newLinePathA.push(newlinePath.getValue());
        }
        var id = lineId.create(lineDTO.lineID);
        var name = lineName.create(lineDTO.name);
        var color = lineColor.create(lineDTO.color);
        line.lineID = id.getValue(),
          line.lineName = name.getValue();
        line.lineColor = color.getValue();
        line.linePath = newLinePathA;
        await this.lineRepo.save(line);

        const lineDTOResult = lineMap.toDTO(line) as ILineDTO;
        return Result.ok<ILineDTO>(lineDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getLines(): Promise<ILineDTO[]> {
    var lines = [];
    try {
      const line = await this.lineRepo.findAll();
      for (var i = 0; i < line.length; i++) {
        lines[i] = lineMap.toDTO(line[i]);
      }
      return lines;
    } catch (e) {
      throw e;
    }
  }

  public async getLineByName(name: string): Promise<ILineDTO> {
    var line;
    try {
      const findLine = await this.lineRepo.findByName(name)
      line = lineMap.toDTO(findLine)
      return line;
    }
    catch (e) {
      throw e;
    }
  }
  public async getColorByLineName(name:string):Promise<ILineDTO>{
    var line;
    try {
      const findedLine = await this.lineRepo.findByName(name)
      line = lineMap.toDTO(findedLine)
      return line;
    }
    catch (e) {
      throw e;
    }
  }
}
