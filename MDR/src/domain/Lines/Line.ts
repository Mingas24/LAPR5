import { isUndefined } from "lodash";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import ILineDTO from "../../dto/ILineDTO";
import ILinePathDTO from "../../dto/ILinePathDTO";
import { lineColor } from "../../domain/Lines/LineColor";
import { lineId } from "../../domain/Lines/LineId";
import { lineName } from "../../domain/Lines/LineName";
import { linePath } from "../../domain/Lines/LinePath";

interface LineProps {
  lineID: lineId;
  name: lineName;
  color: lineColor;
  linePath?: Array<linePath>;
}

export class Line extends AggregateRoot<LineProps> {
  get lineID(): lineId {
    return this.props.lineID;
  }

  set lineID(value: lineId) {
    this.props.lineID = value;
  }

  get lineColor(): lineColor {
    return this.props.color;
  }

  set lineColor(value: lineColor) {
    this.props.color = value;
  }

  get lineName(): lineName {
    return this.props.name;
  }

  set lineName(value: lineName) {
    this.props.name = value;
  }

  get linePath(): Array<linePath> {
    return this.props.linePath;
  }

  set linePath(value: Array<linePath>) {
    this.props.linePath = value;
  }

  private constructor(props: LineProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(lineDTO: ILineDTO, id?: UniqueEntityID): Result<Line> {
    const lineID = lineId.create(lineDTO.lineID);
    const nameLine = lineName.create(lineDTO.name);
    const colorLine = lineColor.create(lineDTO.color);

    var linePathList: Array<linePath> = [];
    if (!isUndefined(lineDTO.linePath)) {
      for (var i = 0; i < lineDTO.linePath.length; i++) {
        var linePathOrFailure = linePath.create(
          lineDTO.linePath[i] as ILinePathDTO
        );
        linePathList.push(linePathOrFailure.getValue());
      }
    }

    if (lineID.isSuccess && nameLine.isSuccess && colorLine.isSuccess) {
      var line: Line = new Line(
        {
          lineID: lineID.getValue(),
          name: nameLine.getValue(),
          color: colorLine.getValue(),
          linePath: linePathList,
        },
        id
      );
      return Result.ok<Line>(line);
    }
    return Result.fail<Line>(
      "Something went wrong with the creation of a Line."
    );
  }
}
