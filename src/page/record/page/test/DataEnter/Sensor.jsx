import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Divider,
  message,
  InputNumber,
  Table, Cascader, Spin,
} from 'antd';
import { deviceApi } from '../../../service';
import { generateId, numberToHex, deviceObjToArr } from './utils';
import styles from './index.less';

function Sensor({
  projectId
}) {

  const [form] = Form.useForm();
  const [sensorOptions, setSensorOptions] = useState([]);
  const [terminalId, setTerminalId] = useState('');
  const [loading, setLoading] = useState(false);
  const [terminalTree, setTerminalTree] = useState();

  function reset() {
    form.resetFields();
  }

  function getTerminalTree(id) {
    deviceApi.getTerminalTree(id)
      .then(({ data }) => {
        setTerminalTree(data);
      });
  }

  function joinSensor(values) {
    const {
      number,
      terminalChannel,
      sensorAddr,
      timingFactor,
      sensorMap
    } = values;

    let deviceName = sensorMap[1];
    let baseSensorId = sensorMap[2];

    const params = [];

    return new Promise((resolve) => {
      generateId('sensor', number)
        .then(res => {
          res.forEach(item => {
            params.push({
              baseSensorId,
              customName: deviceName,
              terminalId,
              projectId,
              sensorId: item,
              sensorAddr: numberToHex(sensorAddr),
              terminalChannel,
              timingFactor
            });
          });
          resolve(params);
        });
    });
  }

  function addSensor(values) {
    setLoading(true);
    new Promise((resolve) => {
      joinSensor(values)
        .then(res => {
          resolve(res);
        });
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

  function getBaseSensor(baseId) {
    deviceApi.getBaseSensor(baseId)
      .then(({ data }) => {
        setSensorOptions(deviceObjToArr(data));
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

  function terminalIdChange(value) {
    if (value.length === 15) {
      setTerminalId(value);
      getTerminalDetail(value);
    }
  }

  const style = { width: 160 };

  const columns = [
    {
      title: '终端名称',
      dataIndex: 'deviceName'
    }, {
      title: '终端编号',
      dataIndex: 'deviceId',
      render(text) {
        if (text === terminalId) {
          return <span style={{ color: 'red' }}> {text}</span>;
        }
        return text;
      }
    }
  ];

  return <div className={styles.sensor}>
    <div className={styles.left}>
      <Button onClick={() => getTerminalTree(projectId)} type="primary">查询已有终端</Button>
      <Table
        rowKey="deviceId"
        size="small"
        pagination={false}
        columns={columns}
        dataSource={terminalTree}
      />
    </div>
    <div className={styles.right}>
      <Spin spinning={loading}>
        当前终端编号:
        <strong
          style={{ color: terminalId ? 'black' : 'red' }}>{terminalId ? terminalId : '需设置终端编号'}</strong>
        <Divider/>
        <Form form={form} onFinish={addSensor} layout="inline">
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
          <Divider/>
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
          <Form.Item label='传感器设备' name='sensorMap' rules={[{
            required: true,
            message: '请选择传感器设备'
          }]}>
            <Cascader style={{ width: 360 }} options={sensorOptions} placeholder="厂家/设备/模型编号"/>
          </Form.Item>
          <Form.Item label='数量' name="number">
            <InputNumber style={style} min={1} max={200}/>
          </Form.Item>
          <Divider/>
          <Form.Item>
            <Button htmlType='submit' type="primary">添加传感器</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={reset} danger type="primary">重置</Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  </div>;
}

Sensor.propTypes = {
  setLoading: PropTypes.func,
  projectId: PropTypes.string,
};

export default Sensor;



