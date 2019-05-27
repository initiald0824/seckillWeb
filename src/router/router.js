import { home } from '@/components/home';
import { login } from '@/components/login';
import { goods } from '@/components/goods';


export const routerConfig = [
  {
    path: '/',
    component: home,
    auth: true
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/goods',
    component: goods,
    auth: true
  }
];
