import { Router } from 'express'
import { celebrate, Joi } from 'celebrate'
import { Container } from 'typedi'
import IPathController from '../../controllers/IControllers/IPathController'
import config from "../../../config"

const route = Router()

export default (app: Router) => {
  app.use('/path', route)

  const ctrl = Container.get(config.controller.path.name) as IPathController
  

  route.post('',
    celebrate({
      body: Joi.object({
        key: Joi.string().required(),
        isEmpty: Joi.boolean().required(),
        pathNode: Joi.array(),
      })
    }),
    (req, res, next) => ctrl.createPath(req, res, next))

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

    route.get('/listPaths', (req,res) => ctrl.listPaths(req, res));
}