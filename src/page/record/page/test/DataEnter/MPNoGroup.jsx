import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Button,
  Divider,
  message,
  Select,
  Radio, InputNumber
} from 'antd';
import { monitorItemPoint } from '../../../service';
import ExcelInput from '@/page/record/components/ExcelInput';
import {
  RedoOutlined
} from '@ant-design/icons';
import { debounce, throttle } from '@/util/util';

function MPNoGroup({
  projectId
}) {

  const [form] = Form.useForm();
  const [pointNames, setPointNames] = useState([]);
  const [monitorType, setMonitorType] = useState('normal');
  const [monitorItems, setMonitorItems] = useState([]);

  const onFinish = throttle(function (values) {
    message.warn('请求已发送。。。，正在等待返回结果');
    if (pointNames.length < 1) {
      message.error('请录入测点');
    } else {
      const {
        collectionType,
        groupName,
        monitorItemId,
        gap
      } = values;
      const params = {
        monitorItemId,
        groupName,
        collectionType,
        gap
      };
      toAddPointAndBlock(params);
    }
  }, 5000);

  function reset() {
    getMonitorItemPoint(projectId);
  }

  function onExcelChange(data) {

    if (data[0]) {
      setPointNames(data[0]);
    }
  }

  function getGroupName(itemId) {
    return monitorItemPoint.getGroupNameByMonitorItem({
      projectId,
      itemId
    });
  }

  // 按指定长度将一维数组拆分成二维数组
  function spiltArray(list, gap = 10) {
    const listLength = list.length;
    let lineNum = listLength % gap === 0 ? listLength / gap : Math.floor((listLength / gap) + 1);
    const origin = [...list];
    const result = [];
    while (lineNum > 0) {
      const spliceList = origin.splice(0, gap);

      result.push(spliceList);
      lineNum -= 1;
    }

    return result;
  }

  // 分组测点名称和传感器
  function toAddPointAndBlock(values) {
    const {
      monitorItemId,
      groupName,
      collectionType,
      gap = 10
    } = values;
    monitorItemPoint.getSensorByMonitorItem({
      projectId,
      monitorItemId
    })
      .then(sensorListRes => {
        const originSensorIds = sensorListRes.data.map(({ sensorId }) => sensorId);

        if (monitorType === 'deep') {

          if (originSensorIds.length < pointNames.length - 1) {
            message.error(`设备数少于测点数，设备(${originSensorIds.length})测点(${pointNames.length})`);
            return;
          }
          autoBlockAddDeep({
            groupName,
            monitorItemId,
            collectionType,
            sensorIds: originSensorIds,
            points: pointNames
          });
        } else {

          if (originSensorIds.length < pointNames.length) {
            message.error(`设备数少于测点数，设备(${originSensorIds.length})测点(${pointNames.length})`);
            return;
          }

          const pointsBySplit = spiltArray(pointNames, gap);
          const sensorIdsBySplit = spiltArray(originSensorIds, gap);
          pointsBySplit.forEach((item, index) => {
            autoBlockAddNormal({
              groupName: `${groupName}-${index + 1}`,
              monitorItemId,
              collectionType,
              sensorIds: sensorIdsBySplit[index],
              points: item
            });
          });
        }
      });
  }

  // 分组添加除深部位移外的测点
  function autoBlockAddNormal(values) {
    const {
      groupName,
      monitorItemId,
      collectionType,
      sensorIds,
      points
    } = values;

    const [firstSensorId, ...restSensorId] = sensorIds;
    const [firstPointName, ...restPointName] = points;

    let promiseList = [];

    getGroupName(monitorItemId)
      .then(groupRes => {

        const { data: groupList } = groupRes;

        let groupIsExist = groupList.find(function (elem) {
          return elem.groupName === groupName;
        });

        if (groupIsExist) {
          message.error('该分组已经存在不支持自动分组');
          return;
        }

        if (!groupIsExist) {
          // 添加第一个测点， 同时创建分组
          let deviceVOs = JSON.stringify([{ 'deviceId': firstSensorId }]);
          const formData = new FormData();
          formData.append('pointName', firstPointName);
          formData.append('groupName', groupName);
          formData.append('monitorItem', monitorItemId);
          formData.append('collectionType', collectionType);
          formData.append('projectId', projectId);
          formData.append('deviceVOs', deviceVOs);

          // {"paramName":"高度","param":"h","paramValue":10,"unit":"mm","isInput":true},{"paramName":"角度","param":"α","paramValue":0,"unit":"°","isInput":false}
          // 添加地下水位时的附加参数
          if (monitorType === 'tilt') {
            let formulaParam = JSON.stringify([
              {
                paramName: '高度',
                param: 'h',
                paramValue: 10,
                unit: 'mm',
                isInput: true
              },
              {
                paramName: '角度',
                param: 'α',
                paramValue: 0,
                unit: '°',
                isInput: false
              }
            ]);

            formData.append('formulaId', '1');
            formData.append('formulaParam', formulaParam);
          }

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

          monitorItemPoint.addPoint(formData)
            .then(() => {
              // 第一个测点添加成功后，添加剩余测点
              getGroupName(monitorItemId)
                .then(groupListResRest => {
                  let groupIsExist = groupListResRest.data.find(function (elem) {
                    return elem.groupName === groupName;
                  });

                  if (groupIsExist) {
                    promiseList = restPointName.map((pointName, index) => {
                      let deviceVOs = JSON.stringify([{ 'deviceId': restSensorId[index] }]);
                      const formData = new FormData();
                      formData.append('pointName', pointName);
                      formData.append('groupId', groupIsExist.mgId);
                      formData.append('groupName', groupIsExist.groupName);
                      formData.append('monitorItem', monitorItemId);
                      formData.append('collectionType', collectionType);
                      formData.append('projectId', projectId);
                      formData.append('deviceVOs', deviceVOs);

                      // {"paramName":"高度","param":"h","paramValue":10,"unit":"mm","isInput":true},{"paramName":"角度","param":"α","paramValue":0,"unit":"°","isInput":false}
                      // 添加地下水位时的附加参数
                      if (monitorType === 'tilt') {
                        let formulaParam = JSON.stringify([
                          {
                            paramName: '高度',
                            param: 'h',
                            paramValue: 10,
                            unit: 'mm',
                            isInput: true
                          },
                          {
                            paramName: '角度',
                            param: 'α',
                            paramValue: 0,
                            unit: '°',
                            isInput: false
                          }
                        ]);

                        formData.append('formulaId', '1');
                        formData.append('formulaParam', formulaParam);
                      }

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

                    Promise.all(promiseList)
                      .then(() => {
                        message.success(`分组${groupName}添加成功`);
                      })
                      .catch(() => {
                        message.error('发生了错误');
                      });
                  }

                })
                .catch(() => {
                  message.error('发生了错误');
                });
            });
        }
      });
  }

  // 添加深部位移
  function autoBlockAddDeep(values) {
    const {
      groupName,
      monitorItemId,
      collectionType,
      sensorIds,
      points
    } = values;
    const [pointName, ...restDepth] = points;

    getGroupName(monitorItemId)
      .then(groupRes => {

        const { data: groupList } = groupRes;

        let groupIsExist = groupList.find(function (elem) {
          return elem.groupName === groupName;
        });

        let deviceVOs = [];
        restDepth.forEach((depth, index) => {
          deviceVOs.push({
            'deviceId': sensorIds[index],
            'depth': depth
          });
        });
        deviceVOs = JSON.stringify(deviceVOs);

        const formData = new FormData();
        formData.append('pointName', pointName);
        formData.append('groupName', groupName);
        formData.append('monitorItem', monitorItemId);
        formData.append('collectionType', collectionType);
        formData.append('projectId', projectId);
        formData.append('deviceVOs', deviceVOs);

        if (groupIsExist) {
          formData.append('groupId', groupIsExist.mgId);
        }

        monitorItemPoint.addPoint(formData)
          .then(() => {
            message.success('深部位移测点添加成功');
          })
          .catch(() => {
            message.error('发生了错误');
          });
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
    <div>
      导入所有测点自动分组
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
    <Radio.Group
      onChange={e => {
        setMonitorType(e.target.value);
      }}
      value={monitorType}
      options={[
        {
          label: '普通测项',
          value: 'normal'
        }, {
          label: '地下水位',
          value: 'waterLevel'
        }, {
          label: '倾斜',
          value: 'tilt'
        }, {
          label: '深部位移',
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
    <Form form={form} onFinish={onFinish} layout="inline">
      <Form.Item>
        <Button
          icon={<RedoOutlined/>}
          onClick={() => getMonitorItemPoint(projectId)}
          type="link"
        >重新拉取测项</Button>
      </Form.Item>
      <Form.Item
        label='监测测项'
        name='monitorItemId'
        rules={[{
          required: true,
          message: '请选择监测测项'
        }]}
      >
        <Select
          // onSelect={id => getGroupName(id)}
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
            message: '请输入分组名称'
          }]}
      >
        <Input placeholder='输入分组名称'/>
      </Form.Item>
      {
        monitorType !== 'deep' && (
          <Form.Item label='分组数量(默认10)' name="gap" initialValue={10}>
            <InputNumber style={style} min={1} max={200}/>
          </Form.Item>
        )
      }
      <Divider/>
      <Form.Item>
        <Button htmlType='submit' type="primary">添加测点</Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={reset} danger type="primary">重置</Button>
      </Form.Item>
    </Form>
  </div>;
}

MPNoGroup.propTypes = {
  projectId: PropTypes.string,
};

export default MPNoGroup;

