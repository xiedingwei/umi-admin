export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/',
  //   component: '../layouts/BaseLayout',
  // },
  {
    path: '/welcome',
    name: 'welcome',
    access: 'normalRouteFilter',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    access: 'normalRouteFilter',
    // layout: false,
    // component:'../layouts/BaseLayouts',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        access:'normalRouteFilter',
        component: './Admin',
      },
      {
        component: './404',
      },
    ],
  },
  {
    name: 'list.table-list',
    access:'normalRouteFilter',
    path: '/list',
    component: './TableList',
  },
  {
    name: '系统管理',
    access:'normalRouteFilter',
    path: '/system',
    routes: [
      {
        name: '菜单管理',
        access:'normalRouteFilter',
        path: '/system/menu',
        component: './system/Menu',
      },
      {
        name: '角色管理',
        access:'normalRouteFilter',
        path: '/system/role',
        component: './system/Role',
      },
      {
        name: '用户管理',
        access:'normalRouteFilter',
        path: '/system/user',
        component: './system/User',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
