import { fromPairs } from "lodash";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Result } from "../../core/logic/Result";
import { UserAddress } from "./UserAddress";
import { UserBirth } from "./UserBirth";
import { UserMail } from "./UserMail";
import { UserName } from "./UserName";
import { UserNumber } from "./UserNumber";
import { UserPass } from "./UserPass";
import { UserSex } from "./UserSex";
import { IUserDTO } from "../../dto/IUserDTO";
import { Role } from "./Role";

interface UserProps {
  name: UserName;
  email: UserMail;
  pass: UserPass;
  sex: UserSex;
  birth: UserBirth;
  address: UserAddress;
  phoneNumber: UserNumber;
  role: Role;
}

export class User extends AggregateRoot<UserProps> {
  get name(): UserName {
    return this.props.name;
  }
  get email(): UserMail {
    return this.props.email;
  }
  get pass(): UserPass {
    return this.props.pass;
  }
  get sex(): UserSex {
    return this.props.sex;
  }
  get birth(): UserBirth {
    return this.props.birth;
  }
  get address(): UserAddress {
    return this.props.address;
  }
  get phoneNumber(): UserNumber {
    return this.props.phoneNumber;
  }
  get role(): Role {
    return this.props.role;
  }

  private constructor(props: UserProps) {
    super(props);
  }

  public static create(userDTO: IUserDTO): Result<User> {
    const name = UserName.create(userDTO.name);
    const email = UserMail.create(userDTO.email);
    const pass = UserPass.create({value: userDTO.pass, hashed: true});
    const sex = UserSex.create(userDTO.sex);
    const birth = UserBirth.create(userDTO.birth);
    const address = UserAddress.create(userDTO.address);
    const phoneNumber = UserNumber.create(userDTO.phoneNumber);
    const role = Role.create(userDTO.role);

    const user = new User({
      name: name.getValue(),
      email: email.getValue(),
      pass: pass.getValue(),
      sex: sex.getValue(),
      birth: birth.getValue(),
      address: address.getValue(),
      phoneNumber: phoneNumber.getValue(),
      role: role.getValue(),
    });

    return Result.ok<User>(user);
  }
}
