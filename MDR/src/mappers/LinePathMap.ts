import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ILinePathPersistence } from '../dataschema/ILinePathPersistence';

import ILinePathDTO from "../dto/ILinePathDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { linePath } from "../domain/Lines/LinePath";

export class linePathMap extends Mapper<linePath> {

  public static toDTO(linePath: linePath): ILinePathDTO {
    return {
      orientation: linePath.props.orientation,
      pathID: linePath.props.pathID
    } as unknown as ILinePathDTO;
  }

  public static toDomain(linePath: any | Model<ILinePathPersistence & Document>): linePath {
    const linePathOrError = linePath.create(
      linePath,
      new UniqueEntityID(linePath.domainId)
    );

    linePathOrError.isFailure ? console.log(linePathOrError.error) : '';

    return linePathOrError.isSuccess ? linePathOrError.getValue() : null;
  }

  public static toPersistence(linePath: linePath): any {
    return {
      orientation: linePath.orientation.orientation,
      pathID: linePath.pathID.value
    }
  }
}