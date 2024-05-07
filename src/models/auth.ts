export interface LoginDataReq {
  username: string;
  password: string;
}

export interface LoginDataRes {
  access_token: string;
  refresh_token: string;
}
