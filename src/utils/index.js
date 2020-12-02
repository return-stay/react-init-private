import React from "react"
import { Menu,Select } from "antd"
import { Link } from "react-router-dom"
// import request from './request'
import AtIcon from "../common/AtIcon";
const Option = Select.Option

// const Option = Select.Option
const { SubMenu } = Menu
const MenuItem = Menu.Item



//获取侧边栏Item
export const getMenuItem = list => {
  return list.map((item, index) => {
    if (!item.isHide) {
      if (item.children && item.children.length > 0) {
        return (
          <SubMenu
            key={item.path}
            title={
              <span>
                <AtIcon type={item.icon} />
                <span>{item.name}</span>
              </span>
            }
          >
            {getMenuItem(item.children)}
          </SubMenu>
        )
      } else {
        return (
          <MenuItem key={item.path}>
            <Link to={item.path}>
              <AtIcon type={item.icon} />
              <span>{item.name}</span>
            </Link>
          </MenuItem>
        )
      }
    } else {
      return null
    }
  })
}

//左侧栏默认展开项
export const filterRoutes = pathname => {
  let pathSnippets = pathname.split('/').filter(path => path)
  let paths = pathSnippets.map((path, index) => `/${pathSnippets.slice(0, index + 1).join('/')}`)
  paths.splice(0,1)
  return paths
}

//获取options
export const getOptionsList = data => {
  if(!(data instanceof Array)){
      return []
  };
  return data.map((item,index)=>{
      return <Option key={item.id} value={item.value} disabled={item.disabled}>{item.label}</Option>
  })
}



//参数拼接成 ？key=value&key2=value2
export const searchJoint = (obj) => {
  let str = '?'
  for (const key in obj) {
      str += key + '=' + obj[key] + '&'
  }
  str = str.substr(0,str.length-1)
  return str
}

export const dismantleSearch = (that) => {
  let str = that.props.location.search
  let newstr = str = str.substr(1)

  let arr  = newstr.split('&')
  let obj = {}
  for(let i=0; i < arr.length; i++) {
      let itemArr = arr[i].split('=')
      obj[itemArr[0]] = itemArr[1]
  }

  return obj
}