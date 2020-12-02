import React, { useState } from "react";
import { useTranslation } from 'react-i18next'

import './index.less'
import home_3 from '../../../asset/imgs/homes/home_3.png'
import home_4 from '../../../asset/imgs/homes/home_4.png'
import home_5 from '../../../asset/imgs/homes/home_5.png'
import home_6 from '../../../asset/imgs/homes/home_6.png'
import home_fufei from '../../../asset/imgs/homes/home_fufei.png'
import home_fabu from '../../../asset/imgs/homes/home_fabu.png'
import home_quxiao from '../../../asset/imgs/homes/home_quxiao.png'

const UserHome = () => {
  const { t } = useTranslation()
  const [cont] = useState(0)
  return <div className="h-box">
    <div className="cp-title">{t('page-dc')}</div>
    <div className="cp-top-cont">
      <div className="cp-top-item-box">
        <DataItem title="今日销售额度" icon={home_3} total={cont} day={0} yesterday={0} />
      </div>
      <div style={{ width: 20 }}></div>
      <div className="cp-top-item-box">
        <DataItem title="今日订单数量" icon={home_4} total={0} day={0} yesterday={0} />
      </div>
      <div style={{ width: 20 }}></div>
      <div className="cp-top-item-box">
        <DataItem title="今日付费订单数量" icon={home_5} total={0} day={0} yesterday={0} />
      </div>
      <div style={{ width: 20 }}></div>
      <div className="cp-top-item-box">
        <DataItem title="今日购买会员数量" icon={home_6} total={0} day={0} yesterday={0} />
      </div>
    </div>

    <div className="cp-top-cont" style={{ marginTop: 20 }}>
      <div className="cp-top-item-box">
        <DataItem title="累计销售额度" icon={home_fufei} total={0} day={0} yesterday={0} />
      </div>
      <div style={{ width: 20 }}></div>
      <div className="cp-top-item-box">
        <DataItem title="累计订单数量" icon={home_fabu} total={0} day={0} yesterday={0} />
      </div>
      <div style={{ width: 20 }}></div>
      <div className="cp-top-item-box">
        <DataItem title="累计付费订单数量" icon={home_fabu} total={0} day={0} yesterday={0} />
      </div>
      <div style={{ width: 20 }}></div>
      <div className="cp-top-item-box">
        <DataItem title="累计购买会员数量" icon={home_quxiao} total={0} day={0} yesterday={0} />
      </div>
    </div>
  </div>
}

export default UserHome


const DataItem = (props) => {
  const { title, total = 0, day = 0, yesterday = 0, icon } = props
  return <div className='cp-top-item'>
    <div className="cp-top-item-t">{title}</div>
    <div className="cp-top-item-n">{total}</div>
    <div className="cp-top-item-d">
      <div><span>今日新增</span><span style={{ color: '#4ba0b7', marginLeft: 2 }}>+{day}</span></div>
      <div><span>昨日新增</span><span style={{ color: '#f81d22', marginLeft: 2 }}>+{yesterday}</span></div>
    </div>
    <div className="cp-top-icon">
      <img src={icon} alt="" />
    </div>
  </div>
}