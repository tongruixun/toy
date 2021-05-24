import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Divider,
  message,
  Select,
  InputNumber,
  Table,
} from 'antd';
import { deviceApi } from '../../../service';
import { generateId } from './utils';
import 'antd/dist/antd.css';

const { Option } = Select;

const timeUnit = ['秒', '分', '时', '日'];

function Terminal({
  setLoading,
  projectId,
  baseTerminals
}) {

  const [form] = Form.useForm();
  const [terminalList, setTerminalList] = useState({
    factory: [],
    device: [],
    model: []
  });
  const [batchTerminals, setBatchTerminals] = useState({
    params: [],
    overView: []
  });

  useEffect(() => {
    if (Object.keys(baseTerminals).length > 0) {
      setTerminalList(origin => ({
        ...origin,
        factory: Object.keys(baseTerminals)
      }));
    }
  }, [baseTerminals]);

  function resetTerminal() {
    form.resetFields();
    setTerminalList(origin => ({
      ...origin,
      device: [],
      model: []
    }));
    setBatchTerminals({
      params: [],
      overView: []
    });
  }

  function handleFactorySelect(type, value) {
    if (type === 'factory') {
      form.resetFields(['device', 'model']);
      setTerminalList(origin => {
        return {
          ...origin,
          device: Object.keys(baseTerminals[value])
        };
      });
    }

    if (type === 'device') {
      form.resetFields(['model']);
      const factory = form.getFieldValue('factory');
      setTerminalList(origin => {
        return {
          ...origin,
          model: Object.keys(baseTerminals[factory][value])
        };
      });
    }
  }

  // 拼接数据，批量添加终端
  function joinTerminal(values) {
    setLoading(true);
    const {
      factory,
      device,
      model,
      collectInterval,
      number,
      frequencyUnit,
      customName
    } = values;
    const baseTerminalId = baseTerminals[factory][device][model];
    const params = [];
    const overView = [];

    let deviceName = device;

    if (customName) {
      deviceName = customName;
    }

    return new Promise((resolve) => {
      generateId('terminal', number)
        .then(res => {
          res.forEach((item, index) => {
            params.push({
              baseTerminalId,
              collectInterval,
              customName: `${deviceName}-${index + 1}`,
              frequencyUnit,
              projectId,
              terminalId: item
            });
            overView.push({
              factory,
              device,
              model,
              terminalId: item,
              collectInterval,
              frequencyUnit
            });
          });
          setLoading(false);
          resolve({
            params,
            overView
          });
        });
    });
  }

  function overView() {
    form.validateFields()
      .then(values => {
        joinTerminal(values)
          .then(res => {
            setBatchTerminals(res);
          })
          .catch(() => {
            setLoading(false);
          });
      });
  }

  function addTerminal(values) {
    setLoading(true);
    new Promise((resolve) => {
      if (batchTerminals.params.length > 0) {
        resolve(batchTerminals.params);
      } else {
        joinTerminal(values)
          .then(res => {
            resolve(res.params);
          });
      }
    }).then(params => {
      return deviceApi.addTerminals(params)
        .then(function () {
          setLoading(false);
          setBatchTerminals({
            params: [],
            overView: []
          });
          message.success('操作成功');
        });
    })
      .catch(err => {
        setLoading(false);
        message.error(err.message);
      });
  }

  const style = { width: 160 };
  return <div>
    <Form form={form} onFinish={addTerminal} layout="inline">
      <Form.Item label='设备厂家' name='factory' rules={[{
        required: true,
        message: '请选择设备厂家'
      }]}>
        <Select
          style={style}
          onSelect={(value) => handleFactorySelect('factory', value)}
          placeholder='请选择设备厂家'
          options={terminalList.factory.map(item => ({
            label: item,
            value: item
          }))}
        />
      </Form.Item>
      <Form.Item label='设备名称' name='device' rules={[{
        required: true,
        message: '请选择设备名称'
      }]}>
        <Select
          style={style}
          onSelect={(value) => handleFactorySelect('device', value)}
          placeholder='请选择设备名称'
          options={terminalList.device.map(item => ({
            label: item,
            value: item
          }))}
        />
      </Form.Item>
      <Form.Item label='设备型号' name='model' rules={[{
        required: true,
        message: '请选择设备型号'
      }]}>
        <Select
          style={style}
          placeholder='请选择设备型号'
          options={terminalList.model.map(item => ({
            label: item,
            value: item
          }))}
        />
      </Form.Item>
      <Form.Item
        label='采集间隔'
        name='collectInterval'
        initialValue={10}
        rules={[
          {
            pattern: /^\d*$/g,
            message: '请输入整数'
          },
          {
            required: true,
            message: '请输入采集间隔!'
          },
        ]}
      >
        <Input addonAfter={(
          <Form.Item name='frequencyUnit' initialValue={1} noStyle>
            <Select style={{ width: 60 }}>
              {
                timeUnit.map((item, index) => <Option key={index}
                                                      value={index}>{item}</Option>)
              }
            </Select>
          </Form.Item>
        )} style={style}/>
      </Form.Item>
      <Form.Item label='自定义名称' name="customName">
        <Input/>
      </Form.Item>
      <Form.Item label='数量' name="number">
        <InputNumber style={style} min={1} max={200}/>
      </Form.Item>
      <Divider/>
      <Form.Item>
        <Button htmlType='submit' type="primary">添加终端</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={overView} type="primary">预览</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={resetTerminal} danger type="primary">重置</Button>
      </Form.Item>
    </Form>
    <Divider/>
    <Table
      rowKey="terminalId"
      size="small"
      pagination={false}
      columns={
        [{
          title: '设备厂家',
          dataIndex: 'factory'
        }, {
          title: '设备名称',
          dataIndex: 'device'
        }, {
          title: '设备型号',
          dataIndex: 'model'
        }, {
          title: '设备编号',
          dataIndex: 'terminalId'
        }, {
          title: '采集间隔',
          render: (text, {
            collectInterval,
            frequencyUnit
          }) => {
            return `${collectInterval} ${timeUnit[frequencyUnit]}`;
          }
        }]
      }
      dataSource={batchTerminals.overView}
    />
  </div>;
}

Terminal.propTypes = {
  setLoading: PropTypes.func,
  projectId: PropTypes.string,
  baseTerminals: PropTypes.object
};

export default Terminal;





