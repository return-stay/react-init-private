// 把地址栏的？后面的字符串值转化为对象
export const searchStrToSearchObj = (str) => {
  // const str = "?id=0&pageSize=2&pageNumber=10"
  if(str) {
    let obj = {}
    let newstr = str.substr(1)
    newstr.split('&').map(item=> {
      let itemArr = item.split('=')
      obj[itemArr[0]] = itemArr[1]
      return obj
    })
    return obj
  }else {
    return {}
  }
}

// 把参数从对象转成字符串
export const searchObjToSearchStr = (obj) => {
  let arr = []
  for (const key in obj) {
    arr.push(`${key}=${obj[key]}`)
  }
  return arr.join('&')
}

// 修改分页和地址栏参数
export const searchParamsFunc = (that, pageNumber = 1) => {
  const searchObj = searchStrToSearchObj(that.props.location.search) || {}
  if (Number(searchObj.pageNumber) !== 1) {
      const searchParams = { ...searchObj, pageNumber: pageNumber }
      const pathname = that.props.location.pathname
      const serarchStr = searchObjToSearchStr(searchParams)
      that.props.history.push(`${pathname}?${serarchStr}`)
      let statepagination = that.tableChild.state.pagination
      statepagination.current = 1
      that.tableChild.pagination(statepagination)
  }
}