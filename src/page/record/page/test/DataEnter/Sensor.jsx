import React, { useState } from 'react';
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
import { generateId, numberToHex } from './utils';
import 'antd/dist/antd.css';

function Sensor({
  projectId,
  setLoading
}) {

  const [form] = Form.useForm();
  const [configForm] = Form.useForm();
  const [terminalId, setTerminalId] = useState('');
  const [baseSensors, setBaseSensors] = useState({});
  const [sensorList, setSensorList] = useState({
    factory: [],
    device: [],
    model: []
  });
  const [batchSensors, setBatchSensors] = useState({
    params: [],
    overView: []
  });

  function reset() {
    form.resetFields();
    setBatchSensors({
      params: [],
      overView: []
    });
    setSensorList(origin => ({
      ...origin,
      device: [],
      model: []
    }));
  }

  function joinSensor(values) {
    const {
      factory,
      device,
      model,
      number,
      terminalChannel,
      sensorAddr,
      timingFactor
    } = values;
    const baseSensorId = baseSensors[factory][device][model];
    const params = [];
    const overView = [];

    return new Promise((resolve) => {
      generateId('sensor', number)
        .then(res => {
          res.forEach(item => {
            params.push({
              baseSensorId,
              customName: device,
              terminalId,
              projectId,
              sensorId: item,
              sensorAddr: numberToHex(sensorAddr),
              terminalChannel,
              timingFactor
            });
            overView.push({
              factory,
              device,
              model,
              sensorId: item,
              terminalChannel,
              sensorAddr,
              timingFactor
            });
          });
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
        setLoading(true);
        joinSensor(values)
          .then(res => {
            setBatchSensors(res);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      });
  }

  function addSensor(values) {
    setLoading(true);
    new Promise((resolve) => {
      if (batchSensors.params.length > 0) {
        resolve(batchSensors.params);
      } else {
        joinSensor(values)
          .then(res => {
            resolve(res.params);
          });
      }
    }).then(params => {
      return deviceApi.addSensors(params)
        .then(function () {
          setLoading(false);
          message.success('操作成功');
        });
    })
      .catch(err => {
        setLoading(false);
        message.error(err.message);
      });
  }

  function handleFactorySelect(type, value) {
    if (type === 'factory') {
      form.resetFields(['device', 'model']);
      setSensorList(origin => {
        return {
          ...origin,
          device: Object.keys(baseSensors[value])
        };
      });
    }

    if (type === 'device') {
      form.resetFields(['model']);
      const factory = form.getFieldValue('factory');
      setSensorList(origin => {
        return {
          ...origin,
          model: Object.keys(baseSensors[factory][value])
        };
      });
    }
  }

  function getBaseSensor(baseId) {
    deviceApi.getBaseSensor(baseId)
      .then(({ data }) => {
        setSensorList(origin => ({
          ...origin,
          factory: Object.keys(data)
        }));
        setBaseSensors(data);
      })
      .catch(err => console.log(err));
  }

  function getTerminalDetail(id) {
    deviceApi.getTerminalDetail(id)
      .then(({ data }) => {
        getBaseSensor(data.baseTerminalId);
      })
      .catch(err => console.log(err));
  }

  function handleConfig({ terminalId }) {
    setTerminalId(terminalId);
    getTerminalDetail(terminalId);
  }

  function terminalIdChange(value) {
    if (value.length === 15) {
      setTerminalId(value);
      getTerminalDetail(value);
    }
  }

  const style = { width: 160 };

  const columns = [
    {
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
      dataIndex: 'sensorId'
    }, {
      title: '通道号',
      dataIndex: 'terminalChannel'
    }, {
      title: '传感器地址',
      dataIndex: 'sensorAddr'
    }, {
      title: '传感器标定系数',
      dataIndex: 'timingFactor'
    }
  ];

  return <div>
    <Form form={configForm} onFinish={handleConfig} layout="inline">
      <Form.Item
        label="终端编号"
        name="terminalId"
        rules={[{
          required: true,
          message: '终端编号'
        }, {
          len: 15,
          message: '终端编号的长度为15'
        }]}>
        <Input placeholder="终端编号" onChange={e => terminalIdChange(e.target.value)}/>
      </Form.Item>
      <Form.Item>
        当前终端编号:
        <strong
          style={{ color: terminalId ? 'black' : 'red' }}>{terminalId ? terminalId : '需设置终端编号'}</strong>
      </Form.Item>
    </Form>
    <Divider/>
    <Form form={form} onFinish={addSensor} layout="inline">
      <Form.Item label='设备厂家' name='factory' rules={[{
        required: true,
        message: '请选择设备厂家'
      }]}>
        <Select
          style={style}
          onSelect={(value) => handleFactorySelect('factory', value)}
          placeholder='请选择设备厂家'
          options={sensorList.factory.map(item => ({
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
          options={sensorList.device.map(item => ({
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
          options={sensorList.model.map(item => ({
            label: item,
            value: item
          }))}
        />
      </Form.Item>
      <Divider/>
      <Form.Item
        label='通道号'
        name='terminalChannel'
        rules={[
          {
            required: true,
            message: '请输入通道号'
          },
          {
            pattern: /^[0-9]{1,2}$/g,
            message: '请输入长度小于2的整数'
          }
        ]}
        initialValue={1}
      >
        <Input placeholder="请输入通道号"/>
      </Form.Item>
      <Form.Item
        label='传感器地址'
        name='sensorAddr'
        rules={[
          {
            pattern: /^[0-9]+$/g,
            message: '请输入长度小于2的整数'
          }
        ]}
        initialValue={1}
      >
        <Input style={style} placeholder="示例:1234"/>
      </Form.Item>
      <Form.Item
        label='标定系数'
        name='timingFactor'
        rules={[
          {
            required: true,
            message: '请输入标定系数'
          },
          {
            pattern: /^([0-9]$)|(^[0-9]\.[0-9]{1,8})$/g,
            message: '请输入小于10的数字'
          }
        ]}
        initialValue={1}
      >
        <Input style={style} placeholder="请输入标定系数"/>
      </Form.Item>
      <Form.Item label='数量' name="number">
        <InputNumber style={style} min={1} max={200}/>
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' type="primary">添加传感器</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={overView} type="primary">预览</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={reset} danger type="primary">重置</Button>
      </Form.Item>
    </Form>
    <Divider/>
    <Table
      rowKey="sensorId"
      size="small"
      pagination={false}
      columns={columns}
      dataSource={batchSensors.overView}
    />
  </div>;
}

Sensor.propTypes = {
  setLoading: PropTypes.func,
  projectId: PropTypes.string,
};

export default Sensor;



