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
  Table, Cascader
} from 'antd';
import { deviceApi } from '../../../service';
import { generateId, deviceObjToArr } from './utils';

const timeUnit = ['秒', '分', '时', '日'];

function Terminal({
  setLoading,
  projectId,
  baseTerminals
}) {

  const [form] = Form.useForm();
  const [terminalOptions, setTerminalOptions] = useState([]);
  const [batchTerminals, setBatchTerminals] = useState({
    params: [],
    overView: []
  });

  useEffect(() => {
    if (Object.keys(baseTerminals).length > 0) {
      setTerminalOptions(deviceObjToArr(baseTerminals)
        .filter(({ label }) => {
          return label === '山东有人' || label === '厦门四信';
        }));
    }
  }, [baseTerminals]);

  function resetTerminal() {
    form.resetFields();
    setBatchTerminals({
      params: [],
      overView: []
    });
  }

  // 拼接数据，批量添加终端
  function joinTerminal(values) {
    setLoading(true);
    const {
      collectInterval,
      number,
      frequencyUnit,
      customName,
      terminalMap
    } = values;

    let [factoryName, deviceName, baseTerminalId] = terminalMap;
    const params = [];
    const overView = [];

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
              factory: factoryName,
              device: deviceName,
              model: baseTerminalId,
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
      <Form.Item label='终端设备' name='terminalMap' rules={[{
        required: true,
        message: '请选择终端设备'
      }]}>
        <Cascader style={{ width: 360 }} options={terminalOptions} placeholder="厂家/设备/模型编号"/>
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
            <Select
              style={{ width: 60 }}
              options={timeUnit.map((item, index) => ({
                label: item,
                value: index
              }))}
            />
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





