import React from "react";
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2161762_g5epr3tgsb7.js',
})

const AtIcon =(props) => <IconFont {...props} />
export default AtIcon
