import React from 'react'
import { Dropdown, Menu } from 'antd'
import i18n from 'i18next'
import { getLocal, setLocal } from '../../utils/storage'
import './index.less'

const I18nCommon = () => {
  const handleMenuClick = (e) => {
    // const { i18n } = props
    // console.log(i18n)
    const language = e.key
    const stroageLanguage = getLocal('i18nextLng')
    if(language === stroageLanguage) return
    i18n.changeLanguage(language)
    setLocal('i18nextLng', language)
    window.location.reload();
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="en">
        <div className="i18n-menu">
          <img className="i18n-menu-flag" src="" alt="" />
          English
        </div>
      </Menu.Item>
      <Menu.Item key="zh">
        <div className="i18n-menu">
          <img className="i18n-menu-flag" src="" alt="" />
          中文
        </div>
      </Menu.Item>
    </Menu>
  );
  return <Dropdown overlay={menu} placement="bottomLeft">
    <div style={{cursor: 'pointer'}}>切换语言</div>
  </Dropdown>
}

export default I18nCommon