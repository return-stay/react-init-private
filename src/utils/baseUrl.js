const proxyTargetMap = {
  prod: '/api',
  randy: 'http://39.97.231.232:9810',
  peter: '/peter'
}
const API_TYPE = process.env.API_TYPE?process.env.API_TYPE:'randy'
let baseUrl = process.env.NODE_ENV === 'production' ? 'https://shop.madao100.com/admin' : proxyTargetMap[API_TYPE]

const WindowLocation = window.document.location

if(WindowLocation.pathname === '/testcms/') {
  baseUrl = 'http://39.97.231.232:9810'
}
export default baseUrl