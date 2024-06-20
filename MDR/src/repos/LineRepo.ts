import { Service, Inject } from "typedi";

import { Document, Model } from "mongoose";
import { ILinePersistence } from "../dataschema/ILinePersistence";
import { ILineRepo } from "../services/IRepos/ILineRepo";
import { Line } from "../domain/Lines/Line";
import { lineMap } from "../mappers/LineMap";
import { orientation } from "../domain/Lines/Orientation";
import { PathID } from "../domain/Lines/PathID";
import ILinePathDTO from "../dto/ILinePathDTO";

@Service()
export default class LineRepo implements ILineRepo {
  private models: any;

  constructor(
    @Inject("Line") private lineSchema: Model<ILinePersistence & Document>
  ) {}

  public async save(line: Line): Promise<Line> {
    const query = { name: line.lineName.name };

    const lineDocument = await this.lineSchema.findOne(query);

    try {
      if (lineDocument === null) {
        const rawLine: any = lineMap.toPersistence(line);

        const lineCreated = await this.lineSchema.create(rawLine);

        return lineMap.toDomain(lineCreated);
      } else {
        var newLinePath: Array<ILinePathDTO> = [];
        for (var i = 0; i < line.linePath.length; i++) {
          const ori = orientation.create(
            line.linePath[i].orientation.orientation
          );
          const pathID = PathID.create(line.linePath[i].pathID.value);
          var tmp = {
            orientation: ori.getValue().orientation,
            pathID: pathID.getValue().value,
          };
          newLinePath.push(tmp);
        }
        lineDocument.lineID = line.lineID.id;
        lineDocument.name = line.lineName.name;
        lineDocument.color = line.lineColor.color;
        lineDocument.linePath = newLinePath;
        await lineDocument.save();
      }
    } catch (err) {
      throw err;
    }
  }

  public async exists(line: Line): Promise<boolean> {
    const idX =
      Line instanceof line.toString ? (<Line>line).toString() : line;

    const query = { line: idX };
    const lineDocument = await this.lineSchema.findOne(query);

    return !!lineDocument === true;
  }

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async findAll(): Promise<Line[]> {
    const lineDocument = await this.lineSchema.find({});
    var lineArray = [];

    try {
      if (lineDocument === null) {
        return null;
      } else {
        for (var i = 0; i < lineDocument.length; i++) {
          lineArray[i] = lineMap.toDomain(lineDocument[i]);
        }
        return lineArray;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByName(lineName: string): Promise<Line> {
    const query = { name: lineName };
    const lineRecord = await this.lineSchema.findOne(query);
    if (lineRecord != null) {
      return lineMap.toDomain(lineRecord);
    } else {
      return null;
    }
  }

  // public async findByDomainId(lineId: lineId | number): Promise<Line> {
  //   const query = { domainId: lineId };
  //   const lineRecord = await this.lineSchema.findOne(query);

  //   if (lineRecord != null) {
  //     return lineMap.toDomain(lineRecord);
  //   } else return null;
  // }
}
