// localStorage 操作
const WlocalStorage = window.localStorage
/*
* get 获取方法
* @ param {String} 	key 键
* @ param {String} 	expired 存储时为非必须字段，所以有可能取不到，默认为 Date.now()+1
* @ 由@IT·平头哥联盟-首席填坑官∙苏南 分享
*/
export const getLocal = (key) => {
  const datanow = Date.now()
  const expired = WlocalStorage.getItem([`${key}__expires__`]) || datanow + 1;
	if ( datanow >= expired ) {
		removeLocal(key);
		return;
  }
  const source = WlocalStorage.getItem(key)
	const value = source
	return value;
}

/*
* set 存储方法
* @ param {String} 	key 键
* @ param {String} 	value 值，
* @ param {String} 	expired 过期时间，以分钟为单位，非必须
*/
export const setLocal = (key, value, expired) => {
  WlocalStorage.setItem(key, value)
	if (expired){
    WlocalStorage.setItem(`${key}__expires__`, Date.now() + 1000*60*expired)
	};
}

export const removeLocal = (key) => {
  WlocalStorage.removeItem(key)
}

export const clearLocal = () => {
  WlocalStorage.clear()
}

// sessionStorage 操作
const WsessionStorage = window.sessionStorage
export const getSession = (key) => {
  const datanow = Date.now()
  const expired = WsessionStorage.getItem([`${key}__expires__`]) || datanow + 1;
	if ( datanow >= expired ) {
		removeSession(key);
		return;
  }
  const source = WsessionStorage.getItem(key)
	const value = source
	return value;
}

export const setSession = (key, value, expired) => {
  WsessionStorage.setItem(key, value)
	if (expired){
    WsessionStorage.setItem(`${key}__expires__`, Date.now() + 1000*60*expired)
	};
}

export const removeSession = (key) => {
  WsessionStorage.removeItem(key)
}

export const clearSession = () => {
  WsessionStorage.clear()
}
