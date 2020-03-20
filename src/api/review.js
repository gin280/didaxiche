import request from '@/utils/request'

//测试服
const url = 'https://ddxc.xyyun.co'
// const url = 'https://ddxc.xyyunyw.com'
//正式服
// const url = 'https://www.didaxc.cn'

// 代理商审核列表
export function getAgentAuditList(data) {
    return request({
        url: url + '/agent/audit/list_agent',
        method: 'post',
        data
    })
}
// 代理商审核 详情
export function getAgentAuditDetailsList(data) {
    return request({
        url: url + '/agent/audit/details_agent',
        method: 'post',
        data
    })
}
// 代理商审核详情  审核
export function AgentAudit(data) {
    return request({
        url: url + '/agent/audit/agent_audit',
        method: 'post',
        data
    })
}

// 网点审核列表
export function getNetworkAuditList(data) {
    return request({
        url: url + '/branch/index/list_branch',
        method: 'post',
        data
    })
}
// 网点审核 详情
export function getOutletAuditDetails(data) {
    return request({
        url: url + '/branch/index/details_branch',
        method: 'post',
        data
    })
}
// 网点审核详情  审核
export function NetworkAudit(data) {
    return request({
        url: url + '/branch/index/trial',
        method: 'post',
        data
    })
}
