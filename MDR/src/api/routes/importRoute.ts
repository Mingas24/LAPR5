import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IImportController from '../../controllers/IControllers/IImportController'; 

import config from "../../../config";

const import_ = Router();

export default (app: Router) => {
  app.use('/import', import_);

  const ctrl = Container.get(config.controller.import_.name) as IImportController;

  // import_.post('',
  //   celebrate({
  //     body: Joi.object({
  //       importPath:Joi.string(),
  //     })
  //   }),
  //   (req, res, next) => ctrl.createImport(req, res, next) );

    //server.js
    const multer = require('multer');

    // SET STORAGE
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './filesToImport')                   // Pasta onde o ficheiro vai ficar (lado servidor)
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname)
        }
    })

    var upload = multer({ storage: storage })
    import_.post('', upload.single('fileImport'), (req, res, next) => ctrl.createImport(req, res, next));
};