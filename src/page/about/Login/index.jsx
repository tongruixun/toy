import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './index.less';

function Login() {

  const [form] = Form.useForm();
  let history = useHistory();

  function onFinish({ secretKey }) {

    if (secretKey === 'tongruixun') {
      history.push('/about/page');
    } else {
      message.error('验证失败');
    }
  }

  return <div className={styles.wrap}>
    <Form layout='inline' form={form} onFinish={onFinish}>
      <Form.Item label='秘钥' name='secretKey'>
        <Input/>
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>用户验证</Button>
      </Form.Item>
    </Form>
  </div>;
}

export default Login;
