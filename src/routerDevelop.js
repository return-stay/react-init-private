
import UserHome from './pages/User/Home'
import applicationRouter from './routers/approuter'
import i18n from './i18n';
const routerDevelop = [
  {
    path: '/user/home',
    pathName: 'index',
    component: UserHome,
    name: i18n.t('menu-console'),
    showName: i18n.t('menu-console'),
    icon: 'iconhome',
  },
  ...applicationRouter,
]

export default routerDevelop