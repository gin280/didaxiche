import request from '@/utils/request'

//测试服
const url = 'https://ddxc.xyyun.co'
// const url = 'https://ddxc.xyyunyw.com'
//正式服
// const url = 'https://www.didaxc.cn'

// 登录
export function login(username, password) {
    return request({
        url: url + '/user/user/login',
        method: 'get',
        params: { username: username, password: password }
    })
}
//获取头像和昵称
export function getInfo(data) {
    return request({
        url: url + '/member/separater/admin',
        method: 'post',
        data
    })
}
// 网点选择市代
export function DotMarket(data) {
    return request({
        url: url + '/branch/index/agent',
        method: 'post',
        data
    })
}

// 获取用户列表
export function getUserList(data) {
    return request({
        url: url + '/member/index/list_member',
        method: 'post',
        data
    })
}
// 删除用户
export function deleteUser(data) {
    return request({
        url: url + '/member/index/memberdel',
        method: 'post',
        data
    })
}
// 用户管理详情
export function getUserDetails(data) {
    return request({
        url: url + '/member/index/details_member',
        method: 'post',
        data
    })
}
// 用户管理详情  修改
export function setUserDetails(data) {
    return request({
        url: url + '/member/index/member_update',
        method: 'post',
        data
    })
}
// 用户管理详情  提现管理
export function getUserCashWithdrawal(data) {
    return request({
        url: url + '/member/index/withdrawals_log',
        method: 'post',
        data
    })
}

// 用户 消费记录
export function getConsumption(data) {
    return request({
        url: url + '/member/index/consumer',
        method: 'post',
        data
    })
}
// 会员卡信息
export function getMembershipCard(data) {
    return request({
        url: url + '/member/index/card_list',
        method: 'post',
        data
    })
}
// 用户的提现账户
export function getWithdrawalsAccount(data) {
    return request({
        url: url + '/member/index/account',
        method: 'post',
        data
    })
}

// 获取网点列表
export function getOutletsList(data) {
    return request({
        url: url + '/branch/index/list',
        method: 'post',
        data
    })
}
// 网点管理删除
export function deleteOutlets(data) {
    return request({
        url: url + '/branch/index/delete_branch',
        method: 'post',
        data
    })
}
// 网点管理状态更改
export function setOutletsStatus(data) {
    return request({
        url: url + '/branch/index/enable',
        method: 'post',
        data
    })
}
// 新增网点
export function AddOutlets(data) {
    return request({
        url: url + '/branch/index/add_branch',
        method: 'post',
        data
    })
}
// 获取网点详情资料
export function getOutletsBasic(data) {
    return request({
        url: url + '/branch/index/detail',
        method: 'post',
        data
    })
}
// 修改网点基本资料
export function saveOutletsData(data) {
    return request({
        url: url + '/branch/index/update_branch',
        method: 'post',
        data
    })
}
// 获取网点分账详情
export function getOutletsSplit(data) {
    return request({
        url: url + '/branch/index/detail_branch_separater',
        method: 'post',
        data
    })
}
// 修改网点分账详情
export function setOutletsSplit(data) {
    return request({
        url: url + '/branch/index/add_branch_separater',
        method: 'post',
        data
    })
}
// 获取网点 下属设备
export function getSubordinateEquipment(data) {
    return request({
        url: url + '/branch/index/command',
        method: 'post',
        data
    })
}
// 获取网点 下属设备  洗车价格详情
export function CarWashPrice(data) {
    return request({
        url: url + '/branch/index/money',
        method: 'post',
        data
    })
}
// 获取网点 下属设备  修改洗车价格
export function ModifyPrice(data) {
    return request({
        url: url + '/branch/index/upmoney',
        method: 'post',
        data
    })
}
// 获取网点消费记录
export function getOutletsConsumption(data) {
    return request({
        url: url + '/branch/index/branch_consumer',
        method: 'post',
        data
    })
}
// 获取网点会员记录
export function getOutletsMember(data) {
    return request({
        url: url + '/branch/index/branch_card',
        method: 'post',
        data
    })
}
// 获取网点结算记录
export function getOutletsSettlement(data) {
    return request({
        url: url + '/branch/index/branch_settlement',
        method: 'post',
        data
    })
}
// 获取网点账户管理
export function getOutletsAccount(data) {
    return request({
        url: url + '/branch/index/list_branch_user',
        method: 'post',
        data
    })
}
// 新增网点账户管理
export function addOutletsAccount(data) {
    return request({
        url: url + '/branch/index/add_branch_user',
        method: 'post',
        data
    })
}
// 删除网点账户管理
export function deleteOutletsAccount(data) {
    return request({
        url: url + '/branch/index/delete_branch_user',
        method: 'post',
        data
    })
}
// 获取网点账户管理详情
export function getOutletsAccountDetails(data) {
    return request({
        url: url + '/branch/index/details_branch_user',
        method: 'post',
        data
    })
}
// 修改网点账户管理详情
export function modifyOutletsAccountDetails(data) {
    return request({
        url: url + '/branch/index/update_branch_user',
        method: 'post',
        data
    })
}

// 获取市级级代理管理
export function getMunicipalAgent(data) {
    return request({
        url: url + '/agent/index/list_admin',
        method: 'post',
        data
    })
}
// 获取市级代理商管理  删除
export function getMunicipalAgentDel(data) {
    return request({
        url: url + '/agent/index/agentdel',
        method: 'post',
        data
    })
}
// 市代理选择省代理
export function getChoiceProvince(data) {
    return request({
        url: url + '/agent/province/agentpro',
        method: 'post',
        data
    })
}

// 获取市级级代理管理 状态
export function setMunicipalStatus(data) {
    return request({
        url: url + '/agent/index/enable',
        method: 'post',
        data
    })
}
// 新增市级代理商
export function getAddAgent(data) {
    return request({
        url: url + '/agent/index/agentadd',
        method: 'post',
        data
    })
}

// 获取市级代理的商的详情
export function getCityAgentDetailsList(data) {
    return request({
        url: url + '/agent/index/agent_list',
        method: 'post',
        data
    })
}
// 修改市代理的管理员资料
export function setCityAgentDetailsList(data) {
    return request({
        url: url + '/agent/index/agentupdate',
        method: 'post',
        data
    })
}
// 获取市级代理商分账详情
export function getAccountDetails(data) {
    return request({
        url: url + '/agent/index/detail_agent_separater',
        method: 'post',
        data
    })
}
// 修改（添加）市级代理商分账详情
export function setAccountDetails(data) {
    return request({
        url: url + '/agent/index/add_agent_separater',
        method: 'post',
        data
    })
}
// 获取市代消费记录
export function getGenerationConsumption(data) {
    return request({
        url: url + '/agent/index/agent_consumer',
        method: 'post',
        data
    })
}
// 获取市代会员记录
export function getCityMemberRecord(data) {
    return request({
        url: url + '/agent/index/agent_card',
        method: 'post',
        data
    })
}
// 获取市代 下属网点
export function getMunicipalSubBranch(data) {
    return request({
        url: url + '/agent/index/agent_branch',
        method: 'post',
        data
    })
}
// 获取市代 下属网点删除
export function getMunicipalSubBranchDel(data) {
    return request({
        url: url + '/agent/index/agent_branchdel',
        method: 'post',
        data
    })
}
// 获取市代 结算记录
export function getCitySettlementRecord(data) {
    return request({
        url: url + '/agent/index/settlementrecord',
        method: 'post',
        data
    })
}
// 获取省代 账号管理
export function getaccountManagement(data) {
    return request({
        url: url + '/agent/province/details_agentuser',
        method: 'post',
        data
    })
}
// 获取市代 账号管理
export function getCityAgentAdministrator(data) {
    return request({
        url: url + '/agent/index/agentcity_list',
        method: 'post',
        data
    })
}
// 获取市代 账号删除
export function getaccountManagementDel(data) {
    return request({
        url: url + '/agent/index/agentuserdel',
        method: 'post',
        data
    })
}
// 获取市代 账号详情
export function getCityAccountDetails(data) {
    return request({
        url: url + '/agent/index/agentciyu_details',
        method: 'post',
        data
    })
}
// 获取市代 账号修改
export function getaccountManagementEdit(data) {
    return request({
        url: url + '/agent/index/agentcityupdate',
        method: 'post',
        data
    })
}
// 新增市代管理员
export function getaccountManagementAdd(data) {
    return request({
        url: url + '/agent/index/agentcityadd',
        method: 'post',
        data
    })
}

// 获取市代 下属设备
export function getMunicipalDevice(data) {
    return request({
        url: url + '/agent/index/agent_command',
        method: 'post',
        data
    })
}
// 获取市代 下属设备 价钱修改
export function getPriceRevision(data) {
    return request({
        url: url + '/agent/index/update_money',
        method: 'post',
        data
    })
}

// 获取省级代理管理
export function getProvincialAgent(data) {
    return request({
        url: url + '/agent/province/list_agentf',
        method: 'post',
        data
    })
}
// 新增 省代理商
export function getProvincialAgentAdd(data) {
    return request({
        url: url + '/agent/province/add_agentf',
        method: 'post',
        data
    })
}

// 省代理商删除
export function deleteProvince(data) {
    return request({
        url: url + '/agent/province/del_agentf',
        method: 'post',
        data
    })
}
// 省代管理状态更改
export function setProvinceStatus(data) {
    return request({
        url: url + '/agent/province/enable',
        method: 'post',
        data
    })
}
// 添加省代管理员
export function AddAccout(data) {
    return request({
        url: url + '/agent/province/add_agentuser',
        method: 'post',
        data
    })
}

// 获取省级代理详情 基本信息
export function getProvincialAgentDetails(data) {
    return request({
        url: url + '/agent/province/details_agentf',
        method: 'post',
        data
    })
}
// 获取省级代理详情 基本信息修改
export function getInformationModification(data) {
    return request({
        url: url + '/agent/province/update_agentf',
        method: 'post',
        data
    })
}

// 获取省级代理 分账管理
export function getSplitAccount(data) {
    return request({
        url: url + '/agent/province/detail_procince_separater',
        method: 'post',
        data
    })
}
// （添加）修改省级分账详情
export function setSplitAccount(data) {
    return request({
        url: url + '/agent/province/add_procince_separater',
        method: 'post',
        data
    })
}
// 省代理消费记录
export function getProvincialConsumption(data) {
    return request({
        url: url + '/agent/province/province_consumer',
        method: 'post',
        data
    })
}
// 省代理会员记录
export function getMembershipRecord(data) {
    return request({
        url: url + '/agent/province/pro_card',
        method: 'post',
        data
    })
}
// 获取省级代理详情 下属市代
export function getMarketgeneration(data) {
    return request({
        url: url + '/agent/province/agent_shidai',
        method: 'post',
        data
    })
}
// // 获取省级代理详情 下属市代删除
// export function getMarketgeneration(data) {
//   return request({
//     url: url + '/agent/province/agent_shidai',
//     method: 'post',
//     data
//   })
// }

// 获取省级代理详情 下属网点
export function getSubordinateOutlets(data) {
    return request({
        url: url + '/agent/province/agent_wanghdian',
        method: 'post',
        data
    })
}
// 获取省级代理详情 下属网点删除
export function getSubordinateOutletsDel(data) {
    return request({
        url: url + '/agent/province/del_wangdianagent',
        method: 'post',
        data
    })
}

// 获取省级代理详情 结算记录
export function getSettlementRecord(data) {
    return request({
        url: url + '/agent/province/pro_settlement',
        method: 'post',
        data
    })
}
// 获取省级代理详情 代理商账号列表
export function getAgentAccount(data) {
    return request({
        url: url + '/agent/province/list_agentuser',
        method: 'post',
        data
    })
}
// 获取省级代理详情 代理商账号 修改
export function getAgentAccountEdit(data) {
    return request({
        url: url + '/agent/province/update_agentf',
        method: 'post',
        data
    })
}
// 获取省级代理详情 代理商账号 删除
export function getAgentAccountDelete(data) {
    return request({
        url: url + '/agent/province/del_agentuser',
        method: 'post',
        data
    })
}
// 省代理商列表 删除
export function getAgentAccountDel(data) {
    return request({
        url: url + '/agent/province/list_agentuser',
        method: 'post',
        data
    })
}
// 添加省代理商账户
export function getAgentAccountAdd(data) {
    return request({
        url: url + '/agent/province/add_agentuser',
        method: 'post',
        data
    })
}
// 省代理下属设备
export function getProvincialEquipment(data) {
    return request({
        url: url + '/agent/province/agent_command',
        method: 'post',
        data
    })
}
// 获取省级代理详情 下属市代删除
export function getMarketgenerationDel(data) {
    return request({
        url: url + '/agent/province/agent_delete',
        method: 'post',
        data
    })
}

// 获取会员卡协议
export function getMemberProtocol() {
    return request({
        url: url + '/member/separater/memberagreement',
        method: 'post'
    })
}

// 修改会员卡协议
export function setMemberProtocol(data) {
    return request({
        url: url + '/member/separater/memberupdate',
        method: 'post',
        data
    })
}

// 获取洗车说明
export function getWashDescription(data) {
    return request({
        url: url + '/member/separater/carwash',
        method: 'post',
        data
    })
}

// 修改洗车说明
export function setWashDescription(data) {
    return request({
        url: url + '/member/separater/carupdate',
        method: 'post',
        data
    })
}

// 获取意见反馈设置列表
export function getOpinionList(data) {
    return request({
        url: url + '/member/separater/listfeed',
        method: 'post',
        data
    })
}

// 获取意见反馈设置列表
export function setOpinionList(data) {
    return request({
        url: url + '/member/separater/feedupdate',
        method: 'post',
        data
    })
}

// 添加意见反馈设置
export function addOpinion(data) {
    return request({
        url: url + '/member/separater/feedadd',
        method: 'post',
        data
    })
}

// 删除意见反馈设置
export function delOpinion(data) {
    return request({
        url: url + '/member/separater/feeddel',
        method: 'post',
        data
    })
}

//获取统一洗车价格
export function getWashPrice(data) {
    return request({
        url: url + '/member/separater/price',
        method: 'post',
        data
    })
}

//修改统一洗车价格
export function setWashPrice(data) {
    return request({
        url: url + '/member/separater/priceup',
        method: 'post',
        data
    })
}

//获取客服电话
export function getPhone(data) {
    return request({
        url: url + '/member/separater/contact',
        method: 'post',
        data
    })
}

//修改客服电话
export function setPhone(data) {
    return request({
        url: url + '/member/separater/contactup',
        method: 'post',
        data
    })
}

//获取各个banner图片
export function getBanner(data) {
    return request({
        url: url + '/member/separater/image',
        method: 'post',
        data
    })
}

//修改各个banner图片
export function setBanner(data) {
    return request({
        url: url + '/member/separater/imageup',
        method: 'post',
        data
    })
}

