import { User } from './interface';

export const admin: User = {
  id: 1,
  name: 'Zongbin',
  email: 'nzb329@163.com',
  avatar: './assets/images/avatar.jpg',
};

export const guest: User = {
  id: null,
  name: 'unknown',
  email: 'unknown',
  // path in local  
  // avatar: './assets/images/avatar-default.jpg',
  
  //path in server
  avatar: 'assets/images/avatar.default.jpg',
};
