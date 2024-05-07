import { User } from '../models/user';
import request, { Request } from '../utils/request';

class UserService {
  constructor(private req: Request) {
    this.req = req;
  }

  async getUserInfo() {
    return this.req.get<User>('/users');
  }
}

const userService = new UserService(request);

export default userService;
