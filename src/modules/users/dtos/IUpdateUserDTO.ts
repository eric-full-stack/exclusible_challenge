export default interface IUpdateUserDTO {
  name: string;
  id: string;
  email: string;
  password: string;
  type: IUserType;
}
