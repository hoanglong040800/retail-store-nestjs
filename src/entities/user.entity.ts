import { Entity, Column } from "typeorm";
import { EBase } from "./base.entity";

@Entity("users")
export class EUser extends EBase {
  @Column({
    name: "email",
    type: "varchar",
    length: 100,
    nullable: false,
  })
  email?: string;

  @Column({
    name: "first_name",
    type: "varchar",
    length: 50,
  })
  firstName?: string;

  @Column({
    name: "last_name",
    type: "varchar",
    length: 50,
  })
  lastName?: string;

  @Column({
    name: "password",
    type: "varchar",
    length: 100,
    nullable: false,
    select: false,
  })
  password?: string;

  @Column({
    name: "refresh_token",
    type: "varchar",
    length: 200,
    nullable: true,
    select: false,
  })
  refreshToken?: string;
}
