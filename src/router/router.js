import home from '@/components/home/home';
import login from '@/components/login/login';
import goods from '@/components/goods/goods';


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
