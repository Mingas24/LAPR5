import { Entity } from '../../core/domain/Entity';
import { Result } from '../../core/logic/Result';
import ILinePathDTO from '../../dto/ILinePathDTO';
import { orientation } from './Orientation';
import { PathID } from './PathID';

interface LinePathProps {
  orientation: orientation;
  pathID: PathID;
}

export class linePath extends Entity<LinePathProps>{

  get orientation(): orientation {
    return this.props.orientation;
  }
  set orientation(orientation: orientation) {
    this.props.orientation = orientation;
  }
  get pathID():PathID{
      return this.props.pathID;
  }

  private constructor(props: LinePathProps) {
    super(props);
  }

  public static create(linePathDTO: ILinePathDTO): Result<linePath> {
    const orientationLinePath = orientation.create(linePathDTO.orientation);
    const pathID = PathID.create(linePathDTO.pathID)
    if (!orientationLinePath.isSuccess || !pathID.isSuccess) {
      return Result.fail<linePath>('Something went wrong with the creation of a Line Path.');
    } else {
      var line: linePath = new linePath(
        {
          orientation: orientationLinePath.getValue(),
          pathID: pathID.getValue()
        });
      return Result.ok<linePath>(line);
    }
  }
}