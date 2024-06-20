import { Service } from 'typedi';
import IImportService from './IServices/IImportService';
import { NextFunction, Request, Response } from 'express';

var convert = require('xml-js');

import { promises as fs, readFileSync } from "fs";
var parser = require('xml2json');

@Service()
export default class ImportService implements IImportService {

    public xmlToJson(req, res: Response, next: NextFunction) {
        const data = readFileSync("./filesToImport/"+req.file.fieldname, "utf-8");
        var json = JSON.parse(parser.toJson(data));
        return json;
    } 
}