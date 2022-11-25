import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  pwa: false,
  logo: 'https://www.nankezs.cn/files/manage.png',
  iconfontUrl: '//at.alicdn.com/t/c/font_3683706_6zgpid7p6.js',
  // headerHeight:64,
  splitMenus:false
};
export default Settings;
