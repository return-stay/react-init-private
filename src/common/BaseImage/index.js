import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

const baseStyle = {
  imgBox: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
    zIndex: 100000,
  }
}

const BaseImage = (props) => {
  const { src , alt, style} = props
  const [isShowBig, setShowBig] = useState(false)
  const [bigUrl, setBigUrl] = useState('')
  const hideBig = (e) => {
    e.stopPropagation()
    setShowBig(false)
  }
  const imgClick = (e) => {
    e.stopPropagation()
    setShowBig(true)
  }
  const largerImage = () => {
    setShowBig(true)
    setBigUrl(src)
  }

  useEffect(() => {
    console.log(isShowBig);   
  }, [isShowBig])

  return <>
    <img alt={alt} src={src} style={style} onClick={largerImage} />
    {
      isShowBig && <div onClick={hideBig} style={baseStyle.imgBox}>
        <img src={bigUrl} alt="大图" onClick={imgClick} style={{ height: '80%' }} />
      </div>
    }
  </>
}

BaseImage.propTypes = {
  src: PropTypes.string,
  bigUrl: PropTypes.string, //大图地址
  alt: PropTypes.string, //图片显示不出来时的默认文字
  style: PropTypes.object, //图片的样式
}

BaseImage.defaultProps = {
  src: '12', //图片的样式
  alt: '33',
}

export default BaseImage


