import React, {useEffect, useRef, useState} from 'react';
import {Form, Input, Button, Divider, message, Select, InputNumber, Tabs, Table, Spin} from "antd";
import TokenUtils from "@/util/token";
import {deviceApi, monitorItemPoint} from '../service'
import 'antd/dist/antd.css';
import styles from '../index.less'
import ExcelInput from "@/page/about/components/ExcelInput";
import {debounce} from "@/util/util";

const {Option} = Select;
const {TabPane} = Tabs;

const loginCode = {
    0: '请先先进行登录',
    1: '已登录',
    2: '登录态过期'
}

const timeUnit = ['秒', '分', '时', '日']

const renderOption = (list) => list.map((item, index) => <Option key={index} value={item}>{item}</Option>)

// 生成设备id
function generateId(type, number) {
    const generateIdPromise = [];
    for (let i = 0; i < number; i++) {
        generateIdPromise.push(deviceApi.getGenerateId(type));
    }

    return new Promise((resolve) => {
        Promise.all(generateIdPromise).then(res => {
            resolve(res.map(item => item.data))
        })
    })
}

function DataEnter() {

    const [loginForm] = Form.useForm();
    const [projectId, setProjectId] = useState('');
    const [baseTerminals, setBaseTerminals] = useState({});
    const [loginStatus, setLoginStatus] = useState(0);
    const [loading, setLoading] = useState(false);

    function getBaseTerminals() {
        deviceApi.getBaseTerminals().then(({data}) => {
            setBaseTerminals(data);
        }).catch(err => {
            setLoginStatus(0);
            message.error(err.message);
        })
    }

    function handleLogin(values) {
        TokenUtils.setToken(values.token);
        setLoginStatus(1);
        setProjectId(values.projectId)
        if (TokenUtils.getToken()) {
            getBaseTerminals();
        }
    }

    useEffect(() => {
        if (TokenUtils.getToken()) {
            setLoginStatus(1);
            getBaseTerminals();
        }
    }, [])

    return <Spin spinning={loading}>
        <div className={styles.wrap}>
            <Form form={loginForm} onFinish={handleLogin} layout="inline">
                <Form.Item label="token" name="token" rules={[{required: true, message: 'token'}]}>
                    <Input style={{width: 300}} placeholder="token"/>
                </Form.Item>
                <Form.Item
                    label="项目ID"
                    name="projectId"
                    rules={[{required: true, message: '请输入projectId'}]}
                >
                    <Input placeholder="项目ID"/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">设置配置项</Button>
                </Form.Item>
                <Form.Item>
                    当前登录状态: <strong
                    style={{color: loginStatus === 1 ? 'black' : 'red'}}>{loginCode[loginStatus]}</strong>
                </Form.Item>
                <Form.Item>
                    当前项目ID: <strong
                    style={{color: projectId ? 'black' : 'red'}}>{projectId ? projectId : '需设置项目id'}</strong>
                </Form.Item>
            </Form>
            <Divider/>
            <Tabs defaultActiveKey="1">
                <TabPane tab="添加终端" key="1">
                    <Terminal
                        setLoading={setLoading}
                        projectId={projectId}
                        baseTerminals={baseTerminals}
                    />
                </TabPane>
                <TabPane tab="添加传感器" key="2">
                    <Sensor
                        setLoading={setLoading}
                        projectId={projectId}
                    />
                </TabPane>
                <TabPane tab="添加测点" key="3">
                    <MonitorPoint
                        setLoading={setLoading}
                        projectId={projectId}
                    />
                </TabPane>
            </Tabs>
        </div>
    </Spin>
}

export default DataEnter;

function numberToHex(value) {
    let result = value;

    result = Number(result).toString(16).toLocaleUpperCase();

    if (result.length % 2 === 1) {
        result = `0${result}`;
    }

    return result;
};

function Terminal({setLoading, projectId, baseTerminals}) {

    const [form] = Form.useForm();
    const [terminalList, setTerminalList] = useState({factory: [], device: [], model: []});
    const [batchTerminals, setBatchTerminals] = useState({params: [], overView: []});

    useEffect(() => {
        if (Object.keys(baseTerminals).length > 0) {
            setTerminalList(origin => ({...origin, factory: Object.keys(baseTerminals)}))
        }
    }, [baseTerminals])

    function resetTerminal() {
        form.resetFields();
        setTerminalList(origin => ({...origin, device: [], model: []}));
        setBatchTerminals({params: [], overView: []});
    }

    function handleFactorySelect(type, value) {
        if (type === "factory") {
            form.resetFields(['device', 'model'])
            setTerminalList(origin => {
                return {...origin, device: Object.keys(baseTerminals[value])}
            });
        }

        if (type === "device") {
            form.resetFields(['model'])
            const factory = form.getFieldValue('factory')
            setTerminalList(origin => {
                return {...origin, model: Object.keys(baseTerminals[factory][value])}
            });
        }
    }

    // 拼接数据，批量添加终端
    function joinTerminal(values) {
        setLoading(true);
        const {factory, device, model, collectInterval, number, frequencyUnit} = values;
        const baseTerminalId = baseTerminals[factory][device][model];
        const params = [];
        const overView = [];

        return new Promise((resolve) => {
            generateId('terminal', number).then(res => {
                res.forEach(item => {
                    params.push({
                        baseTerminalId,
                        collectInterval,
                        customName: device,
                        frequencyUnit,
                        projectId,
                        terminalId: item
                    })
                    overView.push({
                        factory, device, model, terminalId: item, collectInterval, frequencyUnit
                    })
                })
                setLoading(false);
                resolve({params, overView});
            })
        })
    }

    function overView() {
        form.validateFields().then(values => {
            joinTerminal(values).then(res => {
                setBatchTerminals(res);
            }).catch(err => {
                setLoading(false);
            })
        })
    }

    function addTerminal(values) {
        setLoading(true);
        new Promise((resolve, reject) => {
            if (batchTerminals.params.length > 0) {
                resolve(batchTerminals.params);
            } else {
                joinTerminal(values).then(res => {
                    resolve(res.params);
                })
            }
        }).then(params => {
            return deviceApi.addTerminals(params).then(function () {
                setLoading(false);
                message.success('操作成功');
            })
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        })
    }

    const style = {width: 160}
    return <div>
        <Form form={form} onFinish={addTerminal} layout="inline">
            <Form.Item label='设备厂家' name='factory' rules={[{required: true, message: '请选择设备厂家'}]}>
                <Select style={style} onSelect={(value) => handleFactorySelect('factory', value)}
                        placeholder='请选择设备厂家'>
                    {
                        renderOption(terminalList.factory)
                    }
                </Select>
            </Form.Item>
            <Form.Item label='设备名称' name='device' rules={[{required: true, message: '请选择设备名称'}]}>
                <Select style={style} onSelect={(value) => handleFactorySelect('device', value)}
                        placeholder='请选择设备名称'>
                    {
                        renderOption(terminalList.device)
                    }
                </Select>
            </Form.Item>
            <Form.Item label='设备型号' name='model' rules={[{required: true, message: '请选择设备型号'}]}>
                <Select style={style} placeholder='请选择设备型号'>
                    {
                        renderOption(terminalList.model)
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label='采集间隔'
                name='collectInterval'
                initialValue={10}
                rules={[
                    {pattern: /^\d*$/g, message: '请输入整数'},
                    {required: true, message: '请输入采集间隔!'},
                ]}
            >
                <Input addonAfter={(
                    <Form.Item name='frequencyUnit' initialValue={1} noStyle>
                        <Select style={{width: 60}}>
                            {
                                timeUnit.map((item, index) => <Option key={index}
                                                                      value={index}>{item}</Option>)
                            }
                        </Select>
                    </Form.Item>
                )} style={style}/>
            </Form.Item>
            <Form.Item label='数量' name="number">
                <InputNumber style={style} min={1} max={20}/>
            </Form.Item>
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
                    render: (text, {collectInterval, frequencyUnit}) => {
                        return `${collectInterval} ${timeUnit[frequencyUnit]}`
                    }
                }]
            }
            dataSource={batchTerminals.overView}
        />
    </div>
}

function Sensor({projectId, setLoading}) {

    const [form] = Form.useForm();
    const [configForm] = Form.useForm();
    const [terminalId, setTerminalId] = useState('');
    const [baseSensors, setBaseSensors] = useState({});
    const [sensorList, setSensorList] = useState({factory: [], device: [], model: []});
    const [batchSensors, setBatchSensors] = useState({params: [], overView: []});

    function reset() {
        form.resetFields();
        setBatchSensors({params: [], overView: []});
        setSensorList(origin => ({...origin, device: [], model: []}));
    }

    function joinSensor(values) {
        const {factory, device, model, number, terminalChannel, sensorAddr, timingFactor} = values;
        const baseSensorId = baseSensors[factory][device][model];
        const params = [];
        const overView = [];

        return new Promise((resolve) => {
            generateId('sensor', number).then(res => {
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
                    })
                    overView.push({
                        factory, device, model, sensorId: item, terminalChannel, sensorAddr, timingFactor
                    })
                })
                resolve({params, overView});
            })
        })
    }

    function overView() {
        form.validateFields().then(values => {
            setLoading(true);
            joinSensor(values).then(res => {
                setBatchSensors(res);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            })
        })
    }

    function addSensor(values) {
        setLoading(true);
        new Promise((resolve, reject) => {
            if (batchSensors.params.length > 0) {
                resolve(batchSensors.params);
            } else {
                joinSensor(values).then(res => {
                    resolve(res.params);
                })
            }
        }).then(params => {
            return deviceApi.addSensors(params).then(function () {
                setLoading(false);
                message.success('操作成功');
            })
        }).catch(err => {
            setLoading(false);
            message.error(err.message);
        })
    }

    function handleFactorySelect(type, value) {
        if (type === "factory") {
            form.resetFields(['device', 'model'])
            setSensorList(origin => {
                return {...origin, device: Object.keys(baseSensors[value])}
            });
        }

        if (type === "device") {
            form.resetFields(['model'])
            const factory = form.getFieldValue('factory')
            setSensorList(origin => {
                return {...origin, model: Object.keys(baseSensors[factory][value])}
            });
        }
    }

    function getBaseSensor(baseId) {
        deviceApi.getBaseSensor(baseId).then(({data}) => {
            setSensorList(origin => ({...origin, factory: Object.keys(data)}))
            setBaseSensors(data);
        }).catch(err => console.log(err))
    }

    function getTerminalDetail(id) {
        deviceApi.getTerminalDetail(id).then(({data}) => {
            getBaseSensor(data.baseTerminalId);
        }).catch(err => console.log(err))
    }

    function handleConfig({terminalId}) {
        setTerminalId(terminalId);
        getTerminalDetail(terminalId);
    }

    const style = {width: 160}

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
    ]

    return <div>
        <Form form={configForm} onFinish={handleConfig} layout="inline">
            <Form.Item label="终端编号" name="terminalId" rules={[{required: true, message: '请输入projectId'}]}>
                <Input placeholder="终端编号"/>
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" type="primary">设置配置项</Button>
            </Form.Item>
            <Form.Item>
                当前终端编号:
                <strong style={{color: terminalId ? 'black' : 'red'}}>{terminalId ? terminalId : '需设置终端编号'}</strong>
            </Form.Item>
        </Form>
        <Divider/>
        <Form form={form} onFinish={addSensor} layout="inline">
            <Form.Item label='设备厂家' name='factory' rules={[{required: true, message: '请选择设备厂家'}]}>
                <Select style={style} onSelect={(value) => handleFactorySelect('factory', value)}
                        placeholder='请选择设备厂家'>
                    {
                        renderOption(sensorList.factory)
                    }
                </Select>
            </Form.Item>
            <Form.Item label='设备名称' name='device' rules={[{required: true, message: '请选择设备名称'}]}>
                <Select style={style} onSelect={(value) => handleFactorySelect('device', value)}
                        placeholder='请选择设备名称'>
                    {
                        renderOption(sensorList.device)
                    }
                </Select>
            </Form.Item>
            <Form.Item label='设备型号' name='model' rules={[{required: true, message: '请选择设备型号'}]}>
                <Select style={style} placeholder='请选择设备型号'>
                    {
                        renderOption(sensorList.model)
                    }
                </Select>
            </Form.Item>
            <Divider/>
            <Form.Item
                label='通道号'
                name='terminalChannel'
                rules={[
                    {required: true, message: '请输入通道号'},
                    {
                        pattern: /^[0-9]{1,2}$/g,
                        message: "请输入长度小于2的整数"
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
                        message: "请输入长度小于2的整数"
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
                    {required: true, message: "请输入标定系数"},
                    {
                        pattern: /^([0-9]$)|(^[0-9]\.[0-9]{1,8})$/g,
                        message: "请输入小于10的数字"
                    }
                ]}
                initialValue={1}
            >
                <Input style={style} placeholder="请输入标定系数"/>
            </Form.Item>
            <Form.Item label='数量' name="number">
                <InputNumber style={style} min={1} max={20}/>
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
        <Table rowKey="sensorId" size="small" pagination={false} columns={columns} dataSource={batchSensors.overView}
        />
    </div>
}

function MonitorPoint({projectId, setLoading}) {

    const [form] = Form.useForm();
    const [pointNames, setPointNames] = useState([]);
    const [monitorItems, setMonitorItems] = useState([]);
    const [groups, setGroups] = useState([]);

    function onFinish(values) {
        if (pointNames.length < 1) {
            message.error('请录入测点');
        } else {
            const {collectionType, groupName, monitorItemId} = values;
            const [name, id] = groupName;
            const params = {
                monitorItemId,
                groupName: name,
                groupId: id,
                collectionType,
            }
            addPoint(params);
        }
    }

    function overView() {
    }

    function reset() {
    }

    function onExcelChange(data) {
        if (data[0]) {
            setPointNames(data[0]);
        }
    }

    function addPoint(values) {
        const {monitorItemId, groupId, groupName, collectionType} = values;
        setLoading(true);
        new Promise((resolve, reject) => {
            monitorItemPoint.getSensorByMonitorItem({projectId, monitorItemId}).then(({data}) => {
                if (data.length < pointNames.length) {
                    reject(new Error(`设备数少于测点数;设备数为${data.length};要添加的测点数为${pointNames.length};`))
                }
                const promiseList = [];

                pointNames.forEach((pointName, index) => {
                    let deviceVOs = JSON.stringify([{"deviceId": data[index].sensorId}]);
                    const formData = new FormData();

                    formData.append('pointName', pointName);
                    formData.append('groupId', groupId);
                    formData.append('groupName', groupName);
                    formData.append('monitorItem', monitorItemId);
                    formData.append('collectionType', collectionType);
                    formData.append('projectId', projectId);
                    formData.append('deviceVOs', deviceVOs);

                    promiseList.push(monitorItemPoint.addPoint(formData));
                })

                resolve(promiseList);
            }).catch(err => {
                reject(err);
            })
        }).then((promiseList) => {
            return Promise.all(promiseList).then(() => {
                message.success('操作成功')
                setLoading(false);
            })
        }).catch(err => {
            message.error(err.message)
            setLoading(false);
        })
    }

    function getGroupName(itemId) {
        monitorItemPoint.getGroupNameByMonitorItem({projectId, itemId}).then(({data}) => {
            setGroups(data)
        }).catch(err => {
            console.log(err)
        })

    }

    const pointNameChange = debounce((value) => {
        const list = value.split(',');
        setPointNames(list);
    }, 500)


    useEffect(() => {

        if (projectId) {
            monitorItemPoint.getMonitorItems(projectId).then(({data}) => {
                setMonitorItems(data);
            }).catch(err => {
                console.log(err)
            })
        } else {
            message.error('请设置项目id');
        }
    }, [projectId])

    const style = {width: 160}
    return <div>
        <div>
            <div>
                <strong>方式一:</strong> 读取<strong style={{color: 'red'}}>Excel表格第一行</strong>的数据作为测点名称&ensp;<br/>
                <ExcelInput onChange={onExcelChange}/>
            </div>
            <Divider/>
            <strong>方式二:</strong> 手动输入,各测点名称用逗号分隔(例: 测点名1,测点名2,测点名3)
            <Input onChange={e => pointNameChange(e.target.value)}/>
            <Divider/>
            <div style={{padding: 24, backgroundColor: '#fff'}}>
                <strong style={{color: 'red'}}>将添加的测点名称:</strong> {pointNames.join(',')}
            </div>
        </div>
        <Divider/>
        <Form form={form} onFinish={onFinish} layout="inline">
            <Form.Item
                label='监测测项'
                name='monitorItemId'
                rules={[{required: true, message: '请选择监测测项'}]}
            >
                <Select onSelect={id => getGroupName(id)} style={style} placeholder='请选择监测测项'>
                    {
                        monitorItems.map(({itemName, monitorItemId}) => (
                            <Option key={monitorItemId} value={monitorItemId}>{itemName}</Option>))
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label='数据采集方式'
                name='collectionType'
                rules={[{required: true, message: '请选择数据采集方式'}]}
                initialValue="设备采集"
            >
                <Select style={style} placeholder='请选择数据采集方式'>
                    <Option value="设备采集">设备采集</Option>))
                </Select>
            </Form.Item>
            <Form.Item
                label='分组名称'
                name='groupName'
                rules={[
                    {required: true, message: '请选择分组'}]}
            >
                <Select style={style} placeholder='请选择分组'>
                    {
                        groups.map(({mgId, groupName}) => (
                            <Option key={mgId} value={[groupName, mgId]}>{groupName}</Option>))
                    }
                </Select>
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
    </div>
}

