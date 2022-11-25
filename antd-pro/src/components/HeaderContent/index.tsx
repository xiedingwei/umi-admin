import React from 'react';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import './index.less'

export type HeaderContent = {
  collapse?: boolean;
  onCollapse: (collapsed: boolean) => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
const HeaderContent: React.FC<HeaderContent> = (props) => {
  // const [collapsed, setCollapsed] = useMergedState<boolean>(props.collapse ?? false, {
  //   value: props.collapse,
  //   onChange: props.onCollapse,
  // });

  return (
    <>
      <div
        // onClick={() => setCollapsed(!collapsed)}
        onClick={()=>{props.onCollapse(!props.collapse)}}
        className='collapsed'
      >
        {props.collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </div>
    </>
  );
};

export default HeaderContent;