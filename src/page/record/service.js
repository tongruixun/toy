import request, {login} from "@/util/request";

export function accountLogin(params) {
    return login.post('/monitor/oauth/oauth/token', null, {params});
}

function getBaseTerminals() {
    return request({
        url: "/monitor/project/terminal/baseTerminals",
        method: "get"
    });
}

function addTerminals(data) {
    return request({
        url: "/monitor/project/terminal/addTerminals",
        method: "post",
        data
    });
}

function getTerminalDetail(terminalId) {
    return request({
        url: "/monitor/project/terminal/detail",
        method: "get",
        params: {
            terminalId
        }
    });
}

function getBaseSensor(baseTerminalId) {
    return request({
        url: "/monitor/project/sensor/baseSensors",
        method: "get",
        params: {
            baseTerminalId
        }
    });
}

function addSensors(data) {
    return request({
        url: "/monitor/project/sensor/addSensors",
        method: "post",
        data
    });
}

/**
 * 获得自动生成的终端或传感器编号
 * @param deviceType  'terminal' 'sensor'
 * @returns {AxiosPromise}
 */
function getGenerateId(deviceType) {
    return request({
        url: "/monitor/project/terminal/generate/usableNumber",
        method: "get",
        params: {
            deviceType
        }
    });
}

export const deviceApi = {
    getBaseTerminals,
    getGenerateId,
    addTerminals,
    getTerminalDetail,
    getBaseSensor,
    addSensors
}


function getMonitorItems(projectId) {
    return request({
        url: `/monitor/project/v2/pointManage/item/${projectId}`,
        method: "get"
    });
}

function getSensorByMonitorItem(params) {
    return request({
        url: "/monitor/project/formula/sensorInfo",
        method: "get",
        params
    });
}

function getGroupNameByMonitorItem(params) {
    return request({
        url: "/monitor/project/v2/pointManage/groupName",
        method: "get",
        params
    });
}

function addPoint(data) {
    return request({
        url: "/monitor/project/v2/pointManage/point",
        method: "post",
        data
    });
}

export const monitorItemPoint = {
    getMonitorItems,
    getGroupNameByMonitorItem,
    getSensorByMonitorItem,
    addPoint
}