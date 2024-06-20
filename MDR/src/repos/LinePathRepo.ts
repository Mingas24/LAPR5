// import { Service, Inject } from 'typedi';

// import { Document, Model } from 'mongoose';
// import { ILinePersistence } from '../dataschema/ILinePersistence';

// import { linePath} from '../models/lines/linePath';
// import { linePathId } from '../models/lines/linePathId';
// import { ILinePathRepo } from '../services/IRepos/ILinePathRepo';
// import { linePathMap } from "../mappers/linePathMap";

// @Service()
// export default class LinePathRepo implements ILinePathRepo {
//   private models: any;

//   constructor(
//     @Inject('LinePath') private linePathSchema : Model<ILinePersistence & Document>,
//   ) { }

//   public async save (linePath: linePath): Promise<linePath> {
//     const query = { domainId: linePath.id.toString()}; 

//     const linePathDocument = await this.linePathSchema.findOne( query );

//     try {
//       if (linePathDocument === null ) {
//         const linePathRole: any = linePathMap.toPersistence(linePath);

//         const linePathCreated = await this.linePathSchema.create(linePathRole);

//         return linePathMap.toDomain(linePathCreated);
//       } else {
//         linePathDocument.id = linePath;
//         await linePathDocument.save();
//         return linePath;
//       }
//     } catch (err) {
//       throw err;
//     }
//   }

//   public async exists (LinePathId: linePathId | string): Promise<boolean> {

//     const idX = LinePathId instanceof linePathId ? (<linePathId>LinePathId).id.toValue() : LinePathId;

//     const query = { domainId: idX}; 
//     const linePathDocument = await this.linePathSchema.findOne( query );

//     return !!linePathDocument === true;
//   }

//   private createBaseQuery (): any {
//     return {
//       where: {},
//     }
//   }
  
// }