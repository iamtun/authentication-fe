import { LoginDataReq, LoginDataRes } from '../models/auth';
import request, { Request } from '../utils/request';

class AuthService {
  constructor(private req: Request) {
    this.req = req;
  }

  async login(data: LoginDataReq) {
    return this.req.post<LoginDataRes>('/auth/login', data);
  }

  async revokeToken(refreshToken: string) {
    return this.req.post<LoginDataRes>('/auth/revoke', { token: refreshToken });
  }
}

const authService = new AuthService(request);
export default authService;
