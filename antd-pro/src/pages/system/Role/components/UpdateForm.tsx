import {
  ProFormText,
  ProForm,
} from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';
import { FormattedMessage, useIntl } from 'umi';
import { useRef } from 'react';
import {GetUserName} from '@/common/auth'
import getNowFormatDate from '@/utils/common';
// export type FormValueType = {
//   target?: string;
//   template?: string;
//   type?: string;
//   time?: string;
//   frequency?: string;
// } & Partial<API.RuleListItem>;

export type UpdateFormProps = {
  onCancel: () => void;
  onSubmit: (values: SYSTEM_API.RoleItem) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<SYSTEM_API.RoleItem>;
  modalType: boolean;
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const formRef = useRef<ProFormInstance>();
  const validateAndGetFormatValue = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then((values) => {
      if(props.modalType){
        props.onSubmit({...values,createUser:GetUserName(),createTime:getNowFormatDate()})
      }else{
        props.onSubmit({...props.values,...values})
      }
    });
  };
  const intl = useIntl();
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
        <ProFormText
          colProps={{sm: 24,xs: 24,md: 12 }}
          name="name"
          label={intl.formatMessage({
            id: 'pages.searchTable.updateForm.ruleName.nameLabel',
            defaultMessage: '角色名称',
          })}
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
        <ProFormText
          colProps={{sm: 24,xs: 24,md: 12 }}
          name="describe"
          label='角色描述'
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
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
