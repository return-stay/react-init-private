import React, { useState } from 'react'
import connect from '../../../utils/connect'
import { Menu, Dropdown } from 'antd';
import './index.less'
import { withRouter } from "react-router-dom";
import { UserOutlined, LogoutOutlined } from '@ant-design/icons'
// import Gimage from '../../../common/Gimage'
// import HeaderLogo from '../../../asset/login/logo_text_zh.png'
const MyCenter =connect((props) => {
  const [visible, setVisible] = useState(false)
  const visibleChange = (e) => {
    setVisible(e)
  }
  const userClick = () => {
    setVisible(false)
    this.props.history.push("/personalCenter");
  }
  const logOut = () => {
    const { dispatch, authChangeAction } = props
    localStorage.removeItem('authed')
    dispatch(authChangeAction(null))
  }

  let { name } = props.state
    const menu = (
      <Menu style={{ width: 160 }}>
        <Menu.Item >
          <div className='user-menu' onClick={userClick}>
            个人中心
            {/* <Icon type="user" /> */}
            <UserOutlined />
          </div>
        </Menu.Item>
        <Menu.Item>
          <div className='user-menu' onClick={logOut}>
            退出登录
            <LogoutOutlined />
          </div>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlayClassName="user-style" overlay={menu} onVisibleChange={visibleChange}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: visible ? '#08f' : '' }}>{name}</span>
          {/* <Gimage style={{ width: 36, height: 36, borderRadius: 10, marginLeft: 10 }} src={HeaderLogo} /> */}

          {/* <Icon style={{ marginLeft: 10 }} type={visible ? 'caret-up' : 'caret-down'} /> */}
        </div>
      </Dropdown>
    )
}) 

// class MyCenter extends React.Component {

//   state = {
//     visible: false,
//   };

//   visibleChange = (e) => {
//     this.setState({
//       visible: e
//     })
//   }

//   userClick = (e) => {
//     this.setState({
//       visible: false
//     })
//     this.props.history.push("/personalCenter");
//   }

//   logOut = () => {
//     const { dispatch, authChangeAction } = this.props
//     localStorage.removeItem('authed')
//     dispatch(authChangeAction(null))
//   }
//   render() {
//     let { name } = this.props.state
//     const menu = (
//       <Menu style={{ width: 160 }}>
//         <Menu.Item >
//           <div className='user-menu' onClick={this.userClick}>
//             个人中心
//             {/* <Icon type="user" /> */}
//             <UserOutlined />
//           </div>
//         </Menu.Item>
//         <Menu.Item>
//           <div className='user-menu' onClick={this.logOut}>
//             退出登录
//             <LogoutOutlined />
//           </div>
//         </Menu.Item>
//       </Menu>
//     );
//     const { visible } = this.state
//     return (
//       <Dropdown overlayClassName="user-style" overlay={menu} onVisibleChange={this.visibleChange}>
//         <div style={{ display: 'flex', alignItems: 'center' }}>
//           <span style={{ color: visible ? '#08f' : '' }}>{name}</span>
//           {/* <Gimage style={{ width: 36, height: 36, borderRadius: 10, marginLeft: 10 }} src={HeaderLogo} /> */}

//           {/* <Icon style={{ marginLeft: 10 }} type={visible ? 'caret-up' : 'caret-down'} /> */}
//         </div>
//       </Dropdown>
//     )
//   }
// }

export default withRouter(MyCenter)