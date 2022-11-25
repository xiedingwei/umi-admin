import {
  ProFormText,
  ProForm,
  ProFormSelect
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {message, Modal, Upload} from 'antd';
import React, {useEffect, useMemo} from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { useRef } from 'react';
import {GetUserName} from '@/common/auth'
import getNowFormatDate from '@/utils/common';
import {useRequest} from "@@/plugin-request/request";
import {list} from "@/services/system/roleApi";
// export type FormValueType = {
//   target?: string;
//   template?: string;
//   type?: string;
//   time?: string;
//   frequency?: string;
// } & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: SYSTEM_API.UserItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SYSTEM_API.UserItem>;
  modalType: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [fileImg,setFileImg]=React.useState(null)
  const {data}=useRequest(()=>{
    return list();
  })
  useEffect(()=>{
    if(props.updateModalVisible){
      setImageUrl(null);
    }
  },[props.updateModalVisible])
  const formRef = useRef<ProFormInstance>();
  const validateAndGetFormatValue = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      if(props.modalType){
        if(fileImg){
          props.onSubmit({...values,createUser:GetUserName(),createTime:getNowFormatDate(),fileImg:fileImg})
        }else{
          message.info('头像不能为空！')
        }
      }else{
        if(fileImg){
          props.onSubmit({...props.values,...values,fileImg:fileImg})
        }else{
          props.onSubmit({...props.values,...values})
        }
      }
    });
    setFileImg(null);
  };
  const filterOption=useMemo(()=>{
    const newOption: any[]=[];
    data?.forEach((item: any)=>{
      newOption.push({
        label:item.name,
        value:item.id,
      })
    })
    return newOption;
  },[data])
  const intl = useIntl();

  const getBase64 = (img: Blob, callback: { (): void; (arg0: string | ArrayBuffer | null): any; }) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: { type: string; size: number; }) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
      message.error('你只能上传JPG/PNG的图片!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
    }

    return isJpgOrPng && isLt2M;
  };
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, () => {
        setLoading(false);
      });
    }
  };
  const customRequest=(info: any)=>{
    const reader = new FileReader();
    reader.readAsDataURL(info.file);
    reader.onload = function(e) {
      const fileBase64Data: any = e?.target?.result;
      setLoading(false);
      setImageUrl(fileBase64Data);
      setFileImg(info.file);
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        上传
      </div>
    </div>
  );
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title={props.modalType?'新建':'编辑'}
      visible={props.updateModalVisible}
      // footer={submitter}
      okText={props.modalType?'添加':'修改'}
      onCancel={() => {
        setImageUrl(null);
        setFileImg(null);
        props.onCancel();
    }}
      onOk={validateAndGetFormatValue}
    >
      <ProForm
        // onFinish={props.onSubmit}
        formRef={formRef}
        initialValues={props.values}
        grid={true}
        submitter={{render:false}}
      >
        {props.modalType?<>
          <ProFormText
          colProps={{sm: 24,xs: 24,md: 24 }}
          name="username"
          label='账号（请输入没有注册过的账号）'
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="请输入规则名称！"
                />
              ),
            },
          ]}
        />
        <ProFormText.Password
          colProps={{sm: 24,xs: 24,md: 24 }}
          name="password"
          label='密码'
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="请输入规则名称！"
                />
              ),
            },
          ]}
        />
        </>:null}
        <ProFormText
          colProps={{sm: 24,xs: 24,md: 24 }}
          name="name"
          label='中文名'
          width="md"
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.updateForm.ruleName.nameRules"
                  defaultMessage="请输入规则名称！"
                />
              ),
            },
          ]}
        />
        <ProFormSelect
          options={filterOption}
          colProps={{sm: 24,xs: 24,md: 24}}
          name="roleId"
          label='角色'
          width="md"
        />
        <div style={{margin:'10px 0'}}><span style={{color:'red'}}>* </span>切换头像</div>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={customRequest}
        >
          {props.values.avatar||imageUrl? (
            <img
              src={imageUrl?imageUrl:"http://localhost:7000"+props.values.avatar}
              alt="avatar"
              style={{
                width: '100%',
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
