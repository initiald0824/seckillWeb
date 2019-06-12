import login from '@/components/login/login';
import goods from '@/components/goods/goods';
import goodsDetail from '@/components/seckill/goodsDetail'
import orderDetail from '@/components/seckill/orderDetail';
import seckillFail from '@/components/seckill/seckillFail';


export const routerConfig = [
  {
    path: '/',
    component: goods,
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
  },
  {
    path: '/goodsDetail/:id',
    component: goodsDetail,
    auth: true
  },
  {
    path: '/orderDetail/:id',
    component: orderDetail,
    auth: true
  },
  {
    path: '/seckillFail',
    component: seckillFail,
    auth: true
  }
];
