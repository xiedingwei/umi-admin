import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined, LoadingOutlined,createFromIconfontCN } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import {SettingDrawer } from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useModel } from 'umi';
import type { MenuDataItem } from '@ant-design/pro-components'
import { history, Link} from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import MyLoading from '@/components/Loading'
import { Spin } from 'antd';
import type { RequestConfig , RunTimeLayoutConfig } from 'umi';
import HeaderContent from "@/components/HeaderContent";
import React from 'react';
import {GetUserToken,GetUserName} from '@/common/auth'
import {tranListToTreeData} from '@/utils/common'
import qs from 'qs';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <MyLoading />,
};
// 用来筛选路由值的
const normalRouteFilters=(routes: any[])=>{
  const access: string[]=[]
  const ergodic=(array: any[])=>{
    array.forEach((item: { path: string; routes: any; })=>{
      if(item.path){
        access.push(item.path)
      }
      if(item.routes){
        ergodic(item.routes)
      }
    })
  }
  ergodic(routes)
  return access
}

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  collapsed?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  Spin.setDefaultIndicator(<LoadingOutlined style={{ fontSize: 24 }} spin />)
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser(GetUserName());
      msg.data.routes= tranListToTreeData(msg.data.routes);
      msg.data.access=normalRouteFilters(msg.data.routes);
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      loading:false,
      collapsed:false,
      // access:normalRouteFilters(currentUser?.routes),
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    loading:false,
    settings: defaultSettings,
  };
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  const onCollapse = (collapsed: boolean): void => {
    setInitialState({ ...initialState, collapsed }).then();
  };
  return {
    // title:<FormattedMessage id="menu.title" defaultMessage='南客的后台管理'/>,
    title:'Nanke Manage',
    // logo:'',
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      // content: initialState?.currentUser?.name,//水印
    },
    headerContentRender: () => (
      <HeaderContent collapse={initialState?.collapsed} onCollapse={onCollapse} />
    ),
    collapsedButtonRender: false,
    collapsed: initialState?.collapsed,
    onCollapse: onCollapse,
    footerRender: () => <Footer />,
    onPageChange: () => {
      // const { location } = history;
      // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    // 南极客 修补：二级图标正常显示2021.7.8 
    menuItemRender: (menuItemProps: MenuDataItem, defaultDom: React.ReactNode) => {
      const MyIcon = createFromIconfontCN({
        scriptUrl: initialState?.settings?.iconfontUrl, // 在 iconfont.cn 上生成
      });
      if (
        menuItemProps.isUrl || !menuItemProps.path) {
        return defaultDom;
      }
      // 支持二级菜单显示icon
      return (
      <Link to={menuItemProps.path}>
          <>
            {menuItemProps.pro_layout_parentKeys 
            && menuItemProps.pro_layout_parentKeys.length > 0?<MyIcon type={menuItemProps.pro_layout_parentKeys 
            && menuItemProps.pro_layout_parentKeys.length&&menuItemProps.icon}/>:null}
            {defaultDom}
          </>
        </Link>
      );
    },
    // loading:true,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.username,
      },
      request: async (params: any, defaultMenuData: any[]) => {
        // initialState.currentUser 中包含了所有用户信息
        // const menuData = await new Promise((resolve)=>{
        //   setTimeout(()=>{
        //     resolve(defaultMenuData)
        //   },2000)
        // })
        // console.log(initialState?.currentUser?.routes,111)
        return initialState?.currentUser?.routes;
      },
    },
    childrenRender: (children: any, props: { location: { pathname: string | string[]; }; }) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {
            initialState?.loading?<MyLoading />:null
          }
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};

export const request: RequestConfig = {
  timeout: 20000,
  timeoutMessage:'请求超时',
  errorConfig: {
    adaptor: (resData: any) => {
      return {...resData,errorMessage:resData.msg}
    },
  },
  middlewares: [],
  requestInterceptors: [(url: string, requestConfig: RequestConfig) => {
    // console.log(url,requestConfig)
    // const { initialState, setInitialState } = useModel('@@initialState');
    const token: string|null=GetUserToken();
    if(token){
      requestConfig.headers.TOKEN=token;
    }
    if(requestConfig.method === 'GET'){
        //如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
        requestConfig.paramsSerializer = function(params) {
            return qs.stringify(params, {arrayFormat: 'repeat'})
        }
    }
    return {
      url: 'http://localhost:7000'+url,
      options: requestConfig
    };
  }],
  responseInterceptors: [(response: Response, requestConfig: RequestConfig) => {
    // console.log(response,options)
    // const { initialState, setInitialState } = useModel('@@initialState');
    // if(options.loading){
    //   setInitialState({...initialState,loading:false})
    // }
    return response;
  }],
};