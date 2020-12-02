import React from 'react';
import 'antd/dist/antd.css';
import './styles/theme-file.less'
import './App.less';
import './i18n'
import zhCN from 'antd/es/locale/zh_CN';
import enUS from 'antd/es/locale/en_US';
import renderRoutes from './utils/renderRoutes'
import routes from "./routers";
import { HashRouter as Router, Switch , withRouter} from "react-router-dom";
import connect from './utils/connect'
import {ConfigProvider} from 'antd'
import { getLocal } from './utils/storage';
@connect
class App extends React.Component {
  constructor() {
    super();
    this.state = {
        locale: zhCN,
    };
  }
  storageLocale = () => {
    const lng = getLocal('i18nextLng')
    let text = ''
    switch(lng) {
      case 'en':
        text = enUS
        break;
      case 'zh':
        text = zhCN
        break;
      default:
        text = zhCN
    }
    return text
  }
  render() {
    const locale = this.storageLocale()
    const authPath = '/login' // 默认未登录的时候返回的页面，可以自行设置
    // let authed = this.props.state.authed || localStorage.getItem('authed') // 如果登陆之后可以利用redux修改该值
    let authed = localStorage.getItem('authed')
    return (
      <Router>
        <Switch>
          <ConfigProvider locale={locale}>
            {renderRoutes(routes, authed, authPath)}
          </ConfigProvider>
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
