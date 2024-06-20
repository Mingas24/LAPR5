import { Router } from "express";
import { celebrate, Joi } from "celebrate";
import { Container } from "typedi";
import INodeController from "../../controllers/IControllers/INodeController";
import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/nodes', route);

  const ctrl = Container.get(config.controller.node.name) as INodeController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        nodeID: Joi.number().required(),
        name: Joi.string().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        shortName: Joi.string().required(),
        isDepot: Joi.boolean().required(),
        isReliefPoint: Joi.boolean().required(),
        crewTravelTime: Joi.array()
      }),
    }),
    (req, res, next) => ctrl.createNode(req, res, next)
  );

  route.get('/id',(req, res) => ctrl.nodeByID(req, res))
  
  route.get('/name',(req,res)=>ctrl.nodeByName(req,res))

  route.get('', (req, res) => ctrl.listNodes(req, res));


  /*route.put('',
    celebrate({
      body: Joi.object({
        id: Joi.string.required(),
        name: Joi.string().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        shortName: Joi.string.required(),
        Depot: Joi.string.required(),
        ReliefPoint: Joi.string.required()
      }),
    }),
    (req, res, next) => ctrl.updateNode(req, res, next))*/
};
