export interface IUserLogin {
  email: string;
  password: string
}

export default interface IUser extends IUserLogin {
  username: string
  role: string
}

export interface IUserWithoutPassword {
  email: string
  username: string
  role: string
}
