import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendEmailInput {
  @IsNotEmpty()
  @IsEmail()
  to: string;
}
