import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IPathService from './IServices/IPathService';
import { IPathRepo } from './IRepos/IPathRepo';
import IPathDTO from '../dto/IPathDTO';
import { PathMap } from '../mappers/PathMap';
import { Path } from '../domain/Lines/Path';

@Service()
export default class PathService implements IPathService {
    constructor(
        @Inject(config.repos.path.name) private pathRepo: IPathRepo
    ) { }

    public async createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>> {
        try {

            const pathOrError = await Path.create(pathDTO);

            if (pathOrError.isFailure) {
                return Result.fail<IPathDTO>(pathOrError.errorValue());
            }

            const pathResult = pathOrError.getValue();

            await this.pathRepo.save(pathResult);

            const pathDTOResult = PathMap.toDTO(pathResult) as IPathDTO;
            return Result.ok<IPathDTO>(pathDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async getPaths(): Promise<IPathDTO[]> {
        var paths = [];
        try {
            const path = await this.pathRepo.findAll();
            for (var i = 0; i < path.length; i++) {
                paths[i] = PathMap.toDTO(path[i]);
            }
            return paths;
        } catch (e) {
            throw e;
        }
    }

    public async getPathByID(id: string) : Promise<IPathDTO> {
        var path;
        try {
            const findNode = await this.pathRepo.findById(id)
            path = PathMap.toDTO(findNode)
            return path;
        }
        catch (e) {
            throw e;

        }
    }
}