import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';

import { PathMap } from "../mappers/PathMap";
import { IPathRepo } from '../services/IRepos/IPathRepo';
import { IPathPersistence } from '../dataschema/IPathPersistance';
import { Path } from '../domain/Lines/Path';

@Service()
export default class PathRepo implements IPathRepo {
    private models: any;


    constructor(
        @Inject('Path') private PathSchema: Model<IPathPersistence & Document>,
    ) { }

    public async save(path: Path): Promise<Path> {
        const query = { domainId: path.ID.value };

        const pathDocument = await this.PathSchema.findOne(query);

        try {
            if (pathDocument === null) {
                const rawPath: any = PathMap.toPersistence(path);

                const pathCreated = await this.PathSchema.create(rawPath);

                return PathMap.toDomain(pathCreated);
            } else {
                pathDocument.key = Path.name;
                await pathDocument.save();
                return path;
            }
        } catch (err) {
            throw err;
        }
    }

    exists(t: Path): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async findAll(): Promise<Path[]> {
        const pathDocument = await this.PathSchema.find({});
        var pathArray = [];
        try {
            if (pathDocument === null) {
                return null;
            } else {
                for (var i = 0; i < pathDocument.length; i++) {
                    pathArray[i] = PathMap.toDomain(pathDocument[i]);
                }
                return pathArray;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findById(id: string) : Promise<Path> {
        const query = { key: id };
        const pathDocument = await this.PathSchema.findOne(query);
        try {
            if (pathDocument === null) {
                return null;
            } else {
                var path = PathMap.toDomain(pathDocument);
                return path;
            }
        } catch (err) {
            throw err;
        }
    }
}