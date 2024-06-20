import { Request, Response, NextFunction } from "express";
import { Inject } from "typedi";
import config from "../../config";

import IImportController from "./IControllers/IImportController";
import IImportService from "../services/IServices/IImportService";

import { Result } from "../core/logic/Result";
import INodeService from "../services/IServices/INodeService";
import INodeDTO from "../dto/INodeDTO";
import IVehicleTypeService from "../services/IServices/IVehicleTypeService";
import IDriverTypeDTO from "../dto/IDriverTypeDTO";
import IVehicleTypeDTO from "../dto/IVehicleTypeDTO";
import IDriverTypeService from "../services/IServices/IDriverTypeService";
import ILineService from "../services/IServices/ILineService";
import IPathDTO from "../dto/IPathDTO";
import IPathService from "../services/IServices/IPathService";
import ILineDTO from "../dto/ILineDTO";
import { isUndefined } from "lodash";

export default class ImportController implements IImportController {
  constructor(
    @Inject(config.services.import_.name) private importService: IImportService,
    @Inject(config.services.node.name) private nodeService: INodeService,
    @Inject(config.services.path.name) private pathService: IPathService,
    @Inject(config.services.vehicleType.name)
    private VehicleTypeService: IVehicleTypeService,
    @Inject(config.services.driverType.name)
    private driverTypeService: IDriverTypeService,
    @Inject(config.services.line.name) private lineService: ILineService //@Inject(config.services.path.name) private driverTypeService: IDriverTypeService
  ) { }
  public async createImport(req: Request, res: Response, next: NextFunction) {
    const json = this.importService.xmlToJson(req, res, next);
    var pathNodeList = [];
    const nodeArray = [];

    try {
      json["GlDocumentInfo"]["world"]["GlDocument"]["GlDocumentNetwork"][
        "Network"
      ]["Nodes"]["Node"].forEach(async (element) => {
        let body;
        var id: string = element["key"];
        var name: string = element["Name"];
        var latitude: string = element["Latitude"];
        var longitude: string = element["Longitude"];
        var shortName: string = element["ShortName"];
        var isDepot: boolean = element["IsDepot"] == "True";
        var isReliefPoint: boolean = element["IsReliefPoint"] == "True";
        var nodeID = id.split(":", 5);
        const crewTravelTime = [element["CrewTravelTimes"]["CrewTravelTime"]];
        var crewTimeList = [];
        if (isUndefined(crewTravelTime[0])) {
          body = {
            nodeID: Number(nodeID[1]),
            name: name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            shortName: shortName,
            isDepot: isDepot,
            isReliefPoint: isReliefPoint,
          };
          nodeArray.push(body);
        } else {
          for (var i = 0; i < crewTravelTime.length; i++) {
            var key: string = crewTravelTime[i].key;
            var iD: string = crewTravelTime[i].Node;
            var dur: number = crewTravelTime[i].Duration;
            var k = key.split(":", 5);
            var j = iD.split(":", 5);
            let body2 = {
              id: Number(k[1]),
              nodeID: Number(j[1]),
              duration: dur,
            };
            crewTimeList.push(body2);
          }
          body = {
            nodeID: Number(nodeID[1]),
            name: name,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            shortName: shortName,
            isDepot: isDepot,
            isReliefPoint: isReliefPoint,
            crewTravelTime: crewTimeList,
          };
          nodeArray.push(body);
        }

        try {
          const nodeOrError = (await this.nodeService.createNode(
            (body as unknown) as INodeDTO
          )) as Result<INodeDTO>;

          if (nodeOrError.isFailure) {
            return res.status(402).send();
          }
        } catch (e) {
          return next(e);
        }
      });
    } catch (e) {
      console.log("Node not found");
    }

    try {
      const paths =
        json["GlDocumentInfo"]["world"]["GlDocument"]["GlDocumentNetwork"][
        "Network"
        ]["Paths"]["Path"];
      for (let elem in paths) {
        const element = paths[elem];
        var key: string = element["key"];
        var isEmpty: boolean =
          element["IsEmpty"] == "True" || element["IsEmpty"] == "true";

        const pathNodes = element["PathNodes"]["PathNode"];
        var pathNodeList = [];
        var firstNodeName
        var secondNodeName
        for (let i = 0; i < pathNodes.length - 1; i++) {
          var firstNode = pathNodes[i];
          var secondNode = pathNodes[i + 1];
          var t = firstNode.Node.split(":", 5);
          var l = secondNode.Node.split(":", 5);
          for (let j = 0; j < nodeArray.length; j++) {
            if (t[1] == nodeArray[j].nodeID) {
              firstNodeName = nodeArray[j].name
            }
          }
          for (let j = 0; j < nodeArray.length; j++) {
            if (l[1] == nodeArray[j].nodeID) {
              secondNodeName = nodeArray[j].name
            }
          }
          let bodyPathNode = {
            node1: firstNodeName,
            node2: secondNodeName,
            duration: secondNode.Duration,
            distance: secondNode.Distance,
          };
          pathNodeList.push(bodyPathNode);
        }

        let body = {
          key: key,
          isEmpty: isEmpty,
          pathNode: pathNodeList,
        };

        try {
          const pathOrError = (await this.pathService.createPath(
            (body as unknown) as IPathDTO
          )) as Result<IPathDTO>;
          if (pathOrError.isFailure) {
            return res.status(402).send();
          }
        } catch (e) {
          return next(e);
        }
      }
    } catch (e) {
      console.log("Path not found");
    }

    try {
      const lines =
        json["GlDocumentInfo"]["world"]["GlDocument"]["GlDocumentNetwork"][
        "Network"
        ]["Lines"]["Line"];
      for (let elem in lines) {
        const element = lines[elem];
        var lineID: string = element["key"];
        var name: string = element["Name"];
        var color: string = element["Color"];
        var k = lineID.split(":", 5);

        const linePaths = element["LinePaths"]["LinePath"];
        var linePathList = [];
        for (let i = 0; i < linePaths.length; i++) {
          var orientation: string = linePaths[i].Orientation;
          var pathID: string = linePaths[i].Path;
          let bodyLinePath = {
            orientation: orientation,
            pathID: pathID,
          };
          linePathList.push(bodyLinePath);
        }
        let body = {
          lineID: Number(k[1]),
          name: name,
          color: color,
          linePath: linePathList,
        };

        try {
          const lineOrError = await this.lineService.createLine(
            (body as unknown) as ILineDTO
          );
          if (lineOrError.isFailure) {
            return res.status(402).send();
          }
        } catch (e) {
          return next(e);
        }
      }
    } catch (e) {
      console.log("Line not found");
    }

    try {
      json["GlDocumentInfo"]["world"]["GlDocument"]["GlDocumentNetwork"][
        "Network"
      ]["VehicleTypes"]["VehicleType"].forEach(async (element) => {
        var name: string = element["Name"];
        var autonomy: string = element["Autonomy"];
        var cost: string = element["Cost"];
        var averageSpeed: string = element["AverageSpeed"];
        var energySource: string = element["EnergySource"];
        var consumption: string = element["Consumption"];
        var emissions: string = element["Emissions"];

        let body = {
          name: name,
          autonomy: parseFloat(autonomy),
          cost: parseFloat(cost),
          averageSpeed: parseFloat(averageSpeed),
          energySource: parseFloat(energySource),
          consumption: parseFloat(consumption),
          emissions: parseFloat(emissions),
        };

        try {
          const vehicleTypeOrError = (await this.VehicleTypeService.createVehicleType(
            body as IVehicleTypeDTO
          )) as Result<IVehicleTypeDTO>;
          if (vehicleTypeOrError.isFailure) {
            return res.status(402).send();
          }
        } catch (e) {
          return next(e);
        }
      });
    } catch (e) {
      console.log("VehicleType not found");
    }

    try {
      json["GlDocumentInfo"]["world"]["GlDocument"]["GlDocumentNetwork"][
        "Network"
      ]["DriverTypes"]["DriverType"].forEach(async (element) => {
        var key: string = element["key"];
        var description: string = element["Description"];

        let body = {
          id: key,
          description: description,
        };

        try {
          const driverTypeOrError = (await this.driverTypeService.createDriverType(
            body as IDriverTypeDTO
          )) as Result<IDriverTypeDTO>;
          if (driverTypeOrError.isFailure) {
            return res.status(402).send();
          }
        } catch (e) {
          return next(e);
        }
      });
    } catch (e) {
      console.log("DriverType not found");
    }

    return console.log("File was imported with success");
  }
}
