import UserHome from '../pages/User/Home'
import AsyncComponent from '../utils/asyncComponent'

// import { useTranslation } from 'react-i18next'
import i18n from '../i18n';
const SecondLevelComponent = AsyncComponent(() => import('../common/SecondLevelComponent'))

const UserList = AsyncComponent(() => import('../pages/User/List'))
const UserTwoList =  AsyncComponent(() => import('../pages/User/TwoList'))

// const [t] = useTranslation()
const applicationRouter = [
  {
    path: '/user/list',
    component: SecondLevelComponent,
    pathName: 'makingSMS',
    name: i18n.t('menu-list'),
    showName: i18n.t('menu-list'),
    icon: 'iconliebiao',
    redirect: '/user/list/two',
    children: [
      {
        path: '/user/list/two',
        component: UserList,
        pathName: 'ListTwo',
        name: i18n.t('menu-list-one'),
        showName: i18n.t('menu-list-one'),
        icon: 'iconhome',
      },
      {
        path: '/user/list/two-other',
        component: UserTwoList,
        pathName: 'ListTwo',
        name: i18n.t('menu-list-two'),
        showName: i18n.t('menu-list-two'),
        icon: 'iconhome',
      },
    ]
  },
  {
    path: '/user/usermanage',
    component: UserHome,
    pathName: 'User',
    name: i18n.t('menu-user'),
    showName: i18n.t('menu-user'),
    icon: 'iconuser',
  },
  {
    path: '/user/application',
    component: UserHome,
    pathName: 'application',
    name: i18n.t('menu-application'),
    showName: i18n.t('menu-application'),
    icon: 'iconyingyongzhongxin',
  },
]


export default applicationRouter