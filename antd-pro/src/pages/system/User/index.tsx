import {deleteUser, user,updateOrSaveUser} from '@/services/system/userApi';
import { ExclamationCircleOutlined, PlusOutlined,SearchOutlined} from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import {Button, Drawer, Popconfirm, message, Modal, Avatar} from 'antd';
import React, { useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import UpdateForm from './components/UpdateForm';
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
const handleRemove = async (selectedRows: SYSTEM_API.UserItem[]) => {
  const hide = message.loading('正在删除');
  const id: (string | undefined)[] =[]
  selectedRows.forEach((item)=>{
    if(item.isDelete!==0){
      id.push(item.username)
    }
  })
  const {success}=await deleteUser({id})
  hide();
  if(success){return true;}
  else{return false;}

};

const Menu: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  // const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [searchVisible, handleSearchVisible] = useState<any>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [modalType, setModalType] = useState<boolean>(true);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SYSTEM_API.UserItem>();
  const [selectedRowsState, setSelectedRows] = useState<SYSTEM_API.UserItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<SYSTEM_API.UserItem>[] = [
    {
      title: '账号',
      dataIndex: 'username',
      // ellipsis:true,
      align:'center',
      tip: '数据唯一标识',
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
      title: '名字',
      dataIndex: 'name',
      ellipsis:true,
      align:'center',
      valueType:'text'
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      ellipsis:true,
      search: false,
      align:'center',
      render:(dom,entity)=>{
        return <Avatar size={32} src={"http://localhost:7000"+entity.avatar}  />
      }
    },
    {
      title: '角色',
      dataIndex: 'roleName',
      ellipsis:true,
      align:'center',
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
          key={record.username+'编辑'}
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
            const selectedRows: SYSTEM_API.UserItem[] =[];
            selectedRows.push(record)
            await handleRemove(selectedRows);
            actionRef.current?.reloadAndRest?.();
          }}
          okText="是"
          cancelText="否"
          key={record.username+'删除'}
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
      <ProTable<SYSTEM_API.UserItem, API.PageParams>
        headerTitle='用户管理'
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
            type="primary"
            key="primary"
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
            key="primary"
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
            const msg = await user({
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
      <UpdateForm
        onSubmit={async (value) => {
          const {success} = await updateOrSaveUser(value);
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
        {currentRow?.username && (
          <ProDescriptions<SYSTEM_API.UserItem>
            column={2}
            title={currentRow?.username}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.username,
            }}
            columns={columns as ProDescriptionsItemProps<SYSTEM_API.UserItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default Menu;
