const sinon = require("sinon");
import { Result } from "../../core/logic/Result";
import ILineDTO from "../../dto/ILineDTO";
import { Line } from "../../domain/Lines/Line";
import { lineName } from "../../domain/Lines/LineName";
import { lineColor } from "../../domain/Lines/LineColor";
import { lineMap } from "../LineMap";
import { lineId } from "../../domain/Lines/LineId";

describe("line map create", () => {
  var pathList = [];
  var pathListE = [];
  const dto: ILineDTO = {
    lineID: 1,
    name: "nameTest",
    color: "colorTest",
    linePath: pathList,
  };
  const lienIDE = lineId.create(1);
  const nameE = lineName.create("nameTest");
  const colorE = lineColor.create("colorTest");
  let line: Result<Line> = Line.create({
    lineID: lienIDE.getValue().id,
    name: nameE.getValue().name,
    color: colorE.getValue().color,
    linePath: pathListE,
  });

  beforeEach(() => {});

  afterEach(function() {
    sinon.restore();
  });

  it("to DTO", async () => {
    sinon.assert.match(lineMap.toDTO(line.getValue()), dto);
  });

  // it('to Domain', async () => {
  //     sinon.assert.match(await NodeMap.toDomain(dto), node.getValue())
  // });

  it("to persistence", async () => {
    sinon.assert.match(lineMap.toPersistence(line.getValue()), dto);
  });
});
