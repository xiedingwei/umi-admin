const APP_LOGIN_USER_TOKEN='TOKEN'
const APP_LOGIN_USER_NAME = 'APP-LOGIN-USER-NAME'
//保存用户token信息
export function SavaUserToken(token: string){
  sessionStorage.setItem(APP_LOGIN_USER_TOKEN,token)
}
//查看用户token信息
export function GetUserToken() {
  const token: string|null = sessionStorage.getItem(APP_LOGIN_USER_TOKEN)
  if(token){
    return token
  }
  return null
}
//清空所有信息
export function OutAll(){
  sessionStorage.clear()
}
//保存用户信息
export function SavaUserName(username: string){
  sessionStorage.setItem(APP_LOGIN_USER_NAME,username)
}
//查看用户信息
export function GetUserName() {
  const username: string|null = sessionStorage.getItem(APP_LOGIN_USER_NAME)
  if(username){
    return username
  }
  return null
}