import { Mapper } from "../core/infra/Mapper";

import { IUserDTO } from "../dto/IUserDTO";

import { User } from "../domain/User/User";

import { Model, Document } from "mongoose";
import { IUserPersistence } from "../dataschema/IUserPersistence";

// import RoleRepo from "../repos/roleRepo";

export class UserMap extends Mapper<User> {
  public static toDTO(user: User): IUserDTO {
    return {
      name: user.name.name,
      email: user.email.mail,
      pass: user.pass.value,
      sex: user.sex.sex,
      birth: user.birth.birth,
      address: user.address.address,
      phoneNumber: user.phoneNumber.pNumber,
      role: user.role.role,
    } as IUserDTO;
  }

  public static async toDomain(
    user: any | Model<IUserPersistence & Document>
  ): Promise<User> {
    const userOrError = User.create(user);

    userOrError.isFailure ? console.log(userOrError.error) : "Error!";

    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence(user: User): any {
    return {
      name: user.name.name,
      email: user.email.mail,
      pass: user.pass.value,
      sex: user.sex.sex,
      birth: user.birth.birth,
      address: user.address.address,
      phoneNumber: user.phoneNumber.pNumber,
      role: user.role.role,
    };
  }
}
