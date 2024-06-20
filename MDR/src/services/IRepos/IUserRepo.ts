import { Repo } from "../../core/infra/Repo";

import { User } from "../../domain/User/User";
import { UserMail } from "../../domain/User/UserMail";

export interface IUserRepo extends Repo<User> {
  findByEmail(email: UserMail | string): Promise<User>;
  save(user: User): Promise<User>;
  exists(user: User | string): Promise<boolean>;
}
