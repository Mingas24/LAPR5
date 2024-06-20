import { Service, Inject } from "typedi";

import { Document, Model } from "mongoose";
import { IUserPersistence } from "../dataschema/IUserPersistence";

import { IUserRepo } from "../services/IRepos/IUserRepo";
import { User } from "../domain/User/User";
import { UserMail } from "../domain/User/UserMail";
import { UserMap } from "../mappers/UserMap";

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;

  constructor(
    @Inject("User")
    private userSchema: Model<IUserPersistence & Document>
  ) {}

  public async exists(user: User | string): Promise<boolean> {
    const idX = user instanceof User ? (<User>user).email.mail : user;

    const query = { domainId: idX };
    const userDocument = await this.userSchema.findOne(query);

    return !!userDocument === true;
  }

  public async save(user: User): Promise<User> {
    const query = { email: user.email.mail };

    const userDocument = await this.userSchema.findOne(query);

    try {
      if (userDocument === null) {
        const rawUser: any = UserMap.toPersistence(user);

        const userCreated = await this.userSchema.create(rawUser);

        return UserMap.toDomain(userCreated);
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail(mail: UserMail | string): Promise<User> {
    const query = { email: mail.toString() };
    const userRecord = await this.userSchema.findOne(query);

    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    } else return null;
  }
}
