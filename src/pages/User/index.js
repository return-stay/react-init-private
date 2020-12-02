import React, { useCallback, useEffect, useState } from 'react';
import { Route, Redirect, Switch, Link } from "react-router-dom";
import I18nCommon from '../../common/I18nCommon'
import { Layout, Menu, Tooltip } from 'antd';
import NotFound from '../NotFound'
import connect from '../../utils/connect'
import { getMenuItem, filterRoutes } from "../../utils";
import AtIcon from '../../common/AtIcon'
import MyCenter from './MyCenter'
import './index.less'
const { Header, Content, Sider } = Layout;

const BodyCont = (props) => {
  const [list] = useState([123])

  const [collapsed] = useState(false)


  const initAction = () => {
    const pathname = props.location.pathname
    const { dispatch, permissionAction, headerAction } = props
    let authed = props.state.authed || localStorage.getItem('authed') // 如果登陆之后可以利用redux修改该值
    if (authed && props.state.permissionList.length === 1) {
      dispatch(permissionAction(pathname))
    }
    dispatch(headerAction({ parent: '', parentPath: '', current: '', currentPath: '' }))
  }
  const usecallbackInitAction = useCallback(initAction, [])
  useEffect(() => {
    usecallbackInitAction()
  }, [usecallbackInitAction])

  //默认进入子组件index
  if (props.location.pathname === '/user') {
    return (
      <Redirect path="/user" exact={true} to={{ pathname: '/user/home' }} />
    )
  }
  const { permissionList } = props.state
  const path = props.location.pathname
  const defaultOpenKeys = filterRoutes(path)
  // const breadList = recursionRouterTwo(defaultOpenKeys, permissionList)
  // console.log(defaultOpenKeys)
  return <Layout style={{ minHeight: '100vh', flexDirection: 'row' }}>

    <LeftMeun defaultOpenKeys={defaultOpenKeys} collapsed={collapsed} />
    <Layout className="site-layout">
      <Header className="site-layout-background header-style" style={{ padding: 0 }}>
        <div className="header-box">
          <div className="header-left"></div>
          <div className="header-right">
            <div className="header-right-item"><I18nCommon /></div>
            <div className="header-right-item"><MyCenter /></div>
          </div>
        </div>
      </Header>
      <Content
        className="layout-content"
        style={{
          minHeight: 280,
        }}
      >
        <div className="user-box">
          <Switch>
            {permissionList.map((value, key) => {
              return (
                <Route
                  routes={value}
                  key={key}
                  exact={value.exact ? true : false}
                  path={value.path}
                  component={value.component}
                  list={list}
                />
              );
            })}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Content>
    </Layout>
  </Layout>
}

export default connect(BodyCont)

const LeftMeun = connect((props) => {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  };

  const actionMenu = () => {
    const { permissionList } = props.state
    const { defaultOpenKeys } = props
    let arr = []
    for (let i = 0; i < permissionList.length; i++) {
      if (permissionList[i].path === defaultOpenKeys[0]) {
        arr = permissionList[i].children
      }
    }
    return arr
  }

  const { permissionList } = props.state
  const { defaultOpenKeys } = props
  const menuChild = actionMenu()

  return (
    <div className="menu-box" style={{ display: 'flex' }}>
      <div className="left-menu-box">
        <div className="logo-text">
          {/* <img src={logo_text_zh} alt="logo" /> */}
          <p>模板</p>
          <p>商城</p>
        </div>
        {
          permissionList.map((item, index) => {
            return <Tooltip placement="right" title={item.name} key={index}>
              <Link to={item.redirect || item.path}
                className={defaultOpenKeys[0] === item.path ? 'menu-prent menu-prent-action' : 'menu-prent'}
                data-path={item.path}
              >
                <AtIcon type={item.icon} style={{ fontSize: 26 }} />
                {
                  item.showName && <span className="menu-prent-show-name"> {item.showName}</span>
                }
              </Link>
            </Tooltip>
          })
        }
      </div>
      {
        (menuChild && menuChild.length > 0) && <Sider theme="light" collapsible style={{ height: '100vh', overflow: 'auto' }} width={200} className="sider-custom" collapsed={collapsed} onCollapse={onCollapse}>

          <Menu theme="light" mode="inline" defaultOpenKeys={defaultOpenKeys} selectedKeys={[defaultOpenKeys[1]]} style={{ paddingTop: 70, borderRight: 'none' }}>
            {
              menuChild && getMenuItem(menuChild)
            }
          </Menu>
        </Sider>
      }
    </div>
  )
}) 
