import { Mapper } from "../core/infra/Mapper";
import { Document, Model } from 'mongoose';
import { ILinePersistence } from '../dataschema/ILinePersistence';
import ILineDTO from "../dto/ILineDTO";
import { Line } from "../domain/Lines/Line";
import ILinePathDTO from "../dto/ILinePathDTO";
import { isUndefined } from "lodash";
import { orientation } from "../domain/Lines/Orientation";
import { PathID } from "../domain/Lines/PathID";

export class lineMap extends Mapper<Line> {

  public static toDTO(line: Line): ILineDTO {
    var newLinePaths: Array<ILinePathDTO> = []
    if (!isUndefined(line.linePath)) {
      for (var i = 0; i < line.linePath.length; i++) {
        var ori = orientation.create(line.linePath[i].orientation.orientation)
        var pID = PathID.create(line.linePath[i].pathID.value)
        var tmp = {
          orientation: ori.getValue().orientation,
          pathID: pID.getValue().value
        }
        newLinePaths.push(tmp)
      }
      return {
        lineID: line.lineID.id,
        name: line.lineName.name,
        color: line.lineColor.color,
        linePath: newLinePaths
      } as ILineDTO
    } else {
      return {
        lineID: line.lineID.id,
        name: line.lineName.name,
        color: line.lineColor.color
      } as ILineDTO
    }
  }

  public static toDomain(line: any | Model<ILinePersistence & Document>): Line {
    const lineOrError = Line.create(line);

    lineOrError.isFailure ? console.log(lineOrError.error) : 'Error';

    return lineOrError.isSuccess ? lineOrError.getValue() : null
  }

  public static toPersistence(line: Line): any {
    var newLinePaths: Array<ILinePathDTO> = []
    if (!isUndefined(line.linePath)) {
      for (var i = 0; i < line.linePath.length; i++) {
        var ori = orientation.create(line.linePath[i].orientation.orientation)
        var pID = PathID.create(line.linePath[i].pathID.value)
        var tmp = {
          orientation: ori.getValue().orientation,
          pathID: pID.getValue().value
        }
        newLinePaths.push(tmp)
      }
      return {
        lineID: line.lineID.id,
        name: line.lineName.name,
        color: line.lineColor.color,
        linePath: newLinePaths
      }
    } else {
      return {
        lineID: line.lineID.id,
        name: line.lineName.name,
        color: line.lineColor.color
      }
    }
  }
}