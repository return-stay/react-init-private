
// import AsyncComponent from '../utils/asyncComponent'
import BodyCont from '../pages/User'
import Login from '../pages/Login'
import Home from "../pages/Home";
import Others from '../pages/Others'
import NotFound from "../pages/NotFound";
import UserHome from '../pages/User/Home'
const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    requiresAuth: false,
  },
  // {
  //   path: '/home',
  //   exact: true,
  //   component: Home,
  //   requiresAuth: false,
  // },
  {
    path: '/user',
    component: BodyCont,
    requiresAuth: true, //需要登陆后才能跳转的页面
    children: [
      {
        path: '/user/home',
        pathName: 'home',
        component: UserHome,
        name: '首页',
        icon: 'iconhome'
      },
    ]
  },
  {
    path: '/others',
    component: Others,
    requiresAuth: false,
  },
  {
    path: '/login',
    component: Login,
    requiresAuth: false,
  },
  {
    path: '*',
    component: NotFound,
    requiresAuth: false,
  }
]

export default routes