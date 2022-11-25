/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser} = initialState ?? {};
  return {
    normalRouteFilter: (route: any) =>{
      return currentUser?.access?.includes(route.path)
    }// initialState 中包含了的路由才有权限访问
  };
}
