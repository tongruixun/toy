import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Divider,
  message,
  Select,
  Radio
} from 'antd';
import { monitorItemPoint } from '../../../service';
import 'antd/dist/antd.css';
import ExcelInput from '@/page/record/components/ExcelInput';
import { debounce } from '@/util/util';

function MonitorPoint({
  projectId,
  setLoading
}) {

  const [form] = Form.useForm();
  const [pointNames, setPointNames] = useState([]);
  const [monitorType, setMonitorType] = useState('normal');
  const [monitorItems, setMonitorItems] = useState([]);
  const [groups, setGroups] = useState([]);

  function onFinish(values) {
    if (pointNames.length < 1) {
      message.error('请录入测点');
    } else {
      const {
        collectionType,
        groupName,
        monitorItemId
      } = values;
      const [name, id] = groupName;
      const params = {
        monitorItemId,
        groupName: name,
        groupId: id,
        collectionType,
      };
      addPoint(params);
    }
  }

  function overView() {
  }

  function reset() {
    getMonitorItemPoint(projectId);
  }

  function onExcelChange(data) {
    if (data[0]) {
      setPointNames(data[0]);
    }
  }

  function addPoint(values) {
    const {
      monitorItemId,
      groupId,
      groupName,
      collectionType
    } = values;
    setLoading(true);
    new Promise((resolve, reject) => {
      monitorItemPoint.getSensorByMonitorItem({
        projectId,
        monitorItemId
      })
        .then(({ data }) => {
          let promiseList = [];
          if (monitorType === 'deep') {
            const [pointName, ...rest] = pointNames;
            if (data.length < rest.length) return reject(new Error(`设备数少于测点数;设备数为${data.length};要添加的测点数为${pointNames.length};`));
            let deviceVOs = [];
            rest.forEach((depth, index) => {
              deviceVOs.push({
                'deviceId': data[index].sensorId,
                'depth': depth
              });
            });
            deviceVOs = JSON.stringify(deviceVOs);
            const formData = new FormData();
            formData.append('pointName', pointName);
            formData.append('groupId', groupId);
            formData.append('groupName', groupName);
            formData.append('monitorItem', monitorItemId);
            formData.append('collectionType', collectionType);
            formData.append('projectId', projectId);
            formData.append('deviceVOs', deviceVOs);

            promiseList = [monitorItemPoint.addPoint(formData)];
          } else {
            if (data.length < pointNames.length) return reject(new Error(`设备数少于测点数;设备数为${data.length};要添加的测点数为${pointNames.length};`));
            promiseList = pointNames.map((pointName, index) => {
              let deviceVOs = JSON.stringify([{ 'deviceId': data[index].sensorId }]);
              const formData = new FormData();
              formData.append('pointName', pointName);
              formData.append('groupId', groupId);
              formData.append('groupName', groupName);
              formData.append('monitorItem', monitorItemId);
              formData.append('collectionType', collectionType);
              formData.append('projectId', projectId);
              formData.append('deviceVOs', deviceVOs);

              // 添加地下水位时的附加参数
              if (monitorType === 'waterLevel') {
                let formulaParam = JSON.stringify([
                  {
                    paramName: '高度',
                    param: 'h',
                    paramValue: 10,
                    unit: 'mm',
                    isInput: true
                  },
                  {
                    paramName: '水压',
                    param: 'P',
                    paramValue: 0,
                    unit: 'Pa',
                    isInput: false
                  }
                ]);

                formData.append('formulaId', '-1');
                formData.append('formulaParam', formulaParam);
              }
              return monitorItemPoint.addPoint(formData);
            });
          }
          resolve(promiseList);
        })
        .catch(err => {
          reject(err);
        });
    }).then((promiseList) => {
      return Promise.all(promiseList)
        .then(() => {
          message.success('操作成功');
          setLoading(false);
        });
    })
      .catch(err => {
        message.error(err.message);
        setLoading(false);
      });
  }

  function getGroupName(itemId) {
    monitorItemPoint.getGroupNameByMonitorItem({
      projectId,
      itemId
    })
      .then(({ data }) => {
        setGroups(data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  function getMonitorItemPoint(id) {
    if (projectId) {
      monitorItemPoint.getMonitorItems(id)
        .then(({ data }) => {
          setMonitorItems(data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      message.error('请设置项目id');
    }
  }

  const pointNameChange = debounce((value) => {
    const list = value.split(',')
      .map(item => item.trim());
    setPointNames(list);
  }, 500);

  useEffect(() => {
    getMonitorItemPoint(projectId);
  }, [projectId]);

  const style = { width: 160 };
  return <div>
    <Radio.Group
      onChange={e => {
        setMonitorType(e.target.value);
      }}
      value={monitorType}
      options={[
        {
          label: '普通测项',
          value: 'normal'
        },
        {
          label: '地下水位',
          value: 'waterLevel'
        },
        {
          label: '深部位移（倾斜）',
          value: 'deep'
        },
      ]}
    />
    {
      monitorType === 'deep' && (<>
        <strong>当添加的测点为</strong> <strong
        style={{ color: 'red' }}>深部位移</strong>时,第一个值为测点名称，后续的值为要添加的深度&ensp;
      </>)
    }
    <Divider/>
    <div>
      <div>
        <strong>方式一:</strong> 读取<strong style={{ color: 'red' }}>Excel表格第一行</strong>的数据作为测点名称&ensp;
        <br/>
        <ExcelInput onChange={onExcelChange}/>
      </div>
      <Divider/>
      <strong>方式二:</strong> 手动输入,各测点名称用<strong style={{ color: 'red' }}>英文逗号</strong>分隔(例:
      测点名1,测点名2,测点名3)
      <Input onChange={e => pointNameChange(e.target.value)}/>
      <Divider/>
      <div>
        <strong style={{ color: 'red' }}>将添加的测点名称({pointNames.length}):</strong>
        <div>{pointNames.join(',')}</div>
      </div>
    </div>
    <Divider/>
    <Form form={form} onFinish={onFinish} layout="inline">
      <Form.Item
        label='监测测项'
        name='monitorItemId'
        rules={[{
          required: true,
          message: '请选择监测测项'
        }]}
      >
        <Select
          onSelect={id => getGroupName(id)}
          style={style}
          placeholder='请选择监测测项'
          options={monitorItems.map(({
            itemName,
            monitorItemId
          }) => ({
            label: itemName,
            value: monitorItemId
          }))}
        />
      </Form.Item>
      <Form.Item
        label='数据采集方式'
        name='collectionType'
        rules={[{
          required: true,
          message: '请选择数据采集方式'
        }]}
        initialValue="设备采集"
      >
        <Select
          style={style}
          placeholder='请选择数据采集方式'
          options={[{
            label: '设备采集',
            value: '设备采集'
          }]}
        />
      </Form.Item>
      <Form.Item
        label='分组名称'
        name='groupName'
        rules={[
          {
            required: true,
            message: '请选择分组'
          }]}
      >
        <Select
          style={style}
          placeholder='请选择分组'
          options={groups.map(({
            mgId,
            groupName
          }) => ({
            label: groupName,
            value: [groupName, mgId]
          }))}
        />
      </Form.Item>
      <Divider/>
      <Form.Item>
        <Button htmlType='submit' type="primary">添加测点</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={overView} type="primary">预览</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={reset} danger type="primary">重置</Button>
      </Form.Item>
    </Form>
  </div>;
}

MonitorPoint.propTypes = {
  setLoading: PropTypes.func,
  projectId: PropTypes.string,
};

export default MonitorPoint;

