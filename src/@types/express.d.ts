declare namespace Express {
  export interface Request {
    user: {
      id: string;
      type: IUserType;
    };
  }
}
type IUserType = 'admin' | 'default';
