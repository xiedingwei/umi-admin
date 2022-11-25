import {
  deleteRole,
  role,
  updateOrSaveRole,
  roleMenuList as roleMenuListService,
  updateRoleMenu
} from '@/services/system/roleApi';
import {list} from '@/services/system/menuApi';
import { ExclamationCircleOutlined, PlusOutlined,SearchOutlined} from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
  ModalForm,
} from '@ant-design/pro-components';
import {Button, Drawer, Popconfirm, message, Modal, Switch, Row, Col, Checkbox} from 'antd';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import { FormattedMessage, useIntl } from 'umi';
// import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import {useRequest} from "@@/plugin-request/request";
// /**
//  * @en-US Add node
//  * @zh-CN 添加节点
//  * @param fields
//  */
// const handleAdd = async (fields: API.RuleListItem) => {
//   const hide = message.loading('正在添加');
//   // try {
//   //   await addRule({ ...fields });
//   //   hide();
//   //   message.success('Added successfully');
//   //   return true;
//   // } catch (error) {
//   //   hide();
//   //   message.error('Adding failed, please try again!');
//   //   return false;
//   // }
// };
//
// /**
//  * @en-US Update node
//  * @zh-CN 更新节点
//  *
//  * @param fields
//  */
// const handleUpdate = async (fields: FormValueType) => {
//   const hide = message.loading('Configuring');
//   // try {
//   //   await updateRule({
//   //     name: fields.name,
//   //     desc: fields.desc,
//   //     key: fields.key,
//   //   });
//   //   hide();
//   //   message.success('Configuration is successful');
//   //   return true;
//   // } catch (error) {
//   //   hide();
//   //   message.error('Configuration failed, please try again!');
//   //   return false;
//   // }
// };

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: SYSTEM_API.RoleItem[]) => {
  const hide = message.loading('正在删除');
  const id: number[] = []
  selectedRows.forEach((item)=>{
    if(item.isDelete!==0){
      id.push(item.id)
    }
  })
  const {success}=await deleteRole({id})
  hide();
  if(success){return true;}
  else{return false;}

};

const Menu: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const { data }=useRequest(()=>{
    return list();
  })
  const [roleMenuList,setRoleMenuList] = useState<any>([]);
  const [oldRoleMenuList,setOldRoleMenuList] = useState<any>([]);
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [searchVisible, handleSearchVisible] = useState<any>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [modalType, setModalType] = useState<boolean>(true);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SYSTEM_API.RoleItem>();
  const [selectedRowsState, setSelectedRows] = useState<SYSTEM_API.RoleItem[]>([]);
  const diffCheck=(): any[]=>{
    const diffList: any[]=[];
    const oldMap={};
    const map={};
    oldRoleMenuList.forEach((item: any)=>{
      oldMap[item]=item;
    })
    roleMenuList.forEach((item: any)=>{
      map[item]=item;
    })
    oldRoleMenuList.forEach((item: any)=>{
      if(!map[item]){
        diffList.push({roleId:selectedRowsState[0].id,menuId:item,type:'delete'})
      }
    })
    roleMenuList.forEach((item: any)=>{
      if(!oldMap[item]){
        diffList.push({roleId:selectedRowsState[0].id,menuId:item,type:'add'})
      }
    })
    return diffList;
  }
  const selectCheck: number[] = useMemo(()=>{
    const listCheckValue: number[]=[]
    data?.forEach((item: any)=>{
      let flag: boolean=false
      for(let i=0;i<roleMenuList.length;i++){
        if(item.id===roleMenuList[i]){
          flag=true;
          break;
        }
      }
      if(flag)listCheckValue.push(item.id)
    })
    return listCheckValue;
  },[roleMenuList])
  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();
  const columns: ProColumns<SYSTEM_API.RoleItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      // ellipsis:true,
      align:'center',
      tip: '数据唯一标识',
      search: false,
      render: (dom, entity) => {
        return (
          <a
            style={{color:'#1890ff'}}
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
      valueType:'text'
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      ellipsis:true,
      align:'center',
      valueType:'text'
    },
    {
      title: '角色描述',
      dataIndex: 'describe',
      ellipsis:true,
      search: false,
      align:'center',
      valueType:'text'
    },
    {
      title: '是否启用',
      dataIndex: 'isStart',
      ellipsis:true,
      search: false,
      align:'center',
      render:(dom,entity)=>{
        return <Switch defaultChecked={entity.isStart===1?true:false} onChange={async ()=>{
          if(entity.isStart===1){
            const {success}=await updateOrSaveRole({...entity,isStart:0});
            if(success){
              actionRef.current?.reloadAndRest?.();
            }
          }
          else{
            const {success}=await updateOrSaveRole({...entity,isStart:1});
            if(success){
              actionRef.current?.reloadAndRest?.();
            }
          }
        }} />
      }
    },
    {
      title: '创建人',
      dataIndex: 'createUser',
      ellipsis:true,
      align:'center',
      valueType:'text'
    },
    {
      title: '创建时间',
      sorter: (a, b) => a.id - b.id,
      search: false,
      dataIndex: 'createTime',
      ellipsis:true,
      align:'center',
      valueType:'text'
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      ellipsis:true,
      align:'center',
      valueType: 'option',
      render: (_, record) => [
        <Button
          key={record.id+'编辑'}
          type='primary'
          onClick={()=>{
            setModalType(false);
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          编辑
        </Button>,
        <Popconfirm
          title="你确定要删除吗?"
          onConfirm={async()=>{
            setShowDetail(false);
            setCurrentRow(undefined);
            const selectedRows: SYSTEM_API.RoleItem[] =[];
            selectedRows.push(record)
            await handleRemove(selectedRows);
            actionRef.current?.reloadAndRest?.();
          }}
          okText="是"
          cancelText="否"
          key={record.id+'删除'}
        >
          <Button
            danger
            disabled={record.isDelete===0}
          >
            删除
          </Button>
        </Popconfirm>
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<SYSTEM_API.RoleItem, API.PageParams>
        headerTitle='角色管理'
        actionRef={actionRef}
        rowKey="id"
        // search={{
        //   labelWidth: 120
        // }}
        search={searchVisible}
        pagination={{
          defaultPageSize:8,
        }}
        toolBarRender={() => [
          <Button
            danger
            key='addPower'
            onClick={async ()=>{
              if(selectedRowsState.length!==1){
                message.info('请选择一个角色');
              }else{
                const res=await roleMenuListService({id:selectedRowsState[0].id})
                const checkList: number[]=[];
                res?.data.forEach((item: any)=>{
                  checkList.push(item.menuId)
                })
                setOldRoleMenuList(checkList);
                setRoleMenuList(checkList);
                handleModalVisible(true);
              }
            }}
          >设置角色权限</Button>,
          <Button
            type="primary"
            key="search"
            onClick={() => {
              if(!searchVisible){
                handleSearchVisible({labelWidth: 120})
              }else{
                handleSearchVisible(false)
              }
            }}
            icon={<SearchOutlined />}
            shape="circle"
          />,
          <Button
            type="primary"
            key="new"
            onClick={() => {
              handleUpdateModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        // params={{current:1,pageSize:7}}
        request={
          async (params)=> {
            // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
            // 如果需要转化参数可以在这里进行修改
            const msg = await role({
              ...params,
              pageNum: params.current
            });
            return {
              data: msg.data.list,
              // success 请返回 true，
              // 不然 table 会停止解析数据，即使有数据
              success: msg.success,
              // 不传会使用 data 的长度，如果是分页一定要传
              total: msg.data.total,
            };
          }
        }
        revalidateOnFocus={false}
        // loading={false}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
            </div>
          }
        >
          <Button
            danger
            onClick={() => {
              Modal.confirm({
                title: '提示',
                icon: <ExclamationCircleOutlined />,
                content: '你确定要删除选中的吗？',
                okText: '确认',
                cancelText: '取消',
                onOk:async () => {
                  await handleRemove(selectedRowsState);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                }
              })
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title='设置角色'
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async () => {
          const res=await updateRoleMenu({list: diffCheck()})
          if(res.success){
            message.success('设置成功！')
            handleModalVisible(false);
          }
        }}>
        <Checkbox.Group value={selectCheck} onChange={(changeData)=>{
          setRoleMenuList(changeData);
        }}>
          <Row gutter={[16, 16]}>{
            data?.map((item: SYSTEM_API.MenuItem)=>{
              return <Col span={8} key={item.id} style={{textAlign:'center'}}><Checkbox value={item.id}>{item.name}</Checkbox></Col>
            })}
          </Row>
        </Checkbox.Group>
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const {success} = await updateOrSaveRole(value);
          if (success) {
            handleUpdateModalVisible(false);
            setShowDetail(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            if(modalType){message.success('添加成功!');}
            else{message.success('修改成功!');};
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          setModalType(true);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
        modalType={modalType}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<SYSTEM_API.RoleItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<SYSTEM_API.RoleItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Menu;
