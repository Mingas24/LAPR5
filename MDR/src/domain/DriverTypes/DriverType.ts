import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";
import { DriverTypeID } from "./DriverTypeId";

import IDriverTypeDTO from "../../dto/IDriverTypeDTO";
import { Description } from "./Description";

interface DriverTypeProps {
  id: DriverTypeID;
  description: Description;
}

export class DriverType extends AggregateRoot<DriverTypeProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get driverTypeId(): DriverTypeID {
    return this.props.id;
  }

  get description(): Description {
    return this.props.description;
  }

  set description(value: Description) {
    this.props.description = value;
  }

  set driverTypeId(value: DriverTypeID) {
    this.props.id = value;
  }
  private constructor(props: DriverTypeProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    driverTypeDTO: IDriverTypeDTO,
    id?: UniqueEntityID
  ): Result<DriverType> {
    const description = Description.create(driverTypeDTO.description);
    const driverId = DriverTypeID.create(driverTypeDTO.id);

    const driverType = new DriverType({
      id: driverId.getValue(),
      description: description.getValue(),
    });
    return Result.ok<DriverType>(driverType);
  }
}
