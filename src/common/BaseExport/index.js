import React from 'react'
import PropTypes from 'prop-types';
import { Button } from 'antd'
import baseURL from '../../utils/baseUrl'
import { searchJoint } from '../../utils'
// import request from '../../utils/request'

const BaseExport = (props) => {
  const { type, btnStyle, btnText, url, query } = props
  const handleExport = () => {
    const queryStr = searchJoint(query)
    const queryUrl = `${baseURL}${url}${queryStr}`;
    window.location.href = queryUrl;
  }
  return <Button type={type} style={btnStyle} onClick={handleExport}>{btnText}</Button>
}

BaseExport.propTypes = {
  url: PropTypes.string, //导出的地址
  query: PropTypes.object, //导出的参数
  btnText: PropTypes.string, //按钮文字
  btnStyle: PropTypes.object, //按钮样式
  type: PropTypes.string, // 按钮类型
}

BaseExport.defaultProps = {
  type: 'primary',
  btnText: '导出列表',
}

export default BaseExport