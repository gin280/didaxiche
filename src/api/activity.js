import request from '@/utils/request'

//测试服
const url = 'https://ddxc.xyyun.co'
// const url = 'https://ddxc.xyyunyw.com'
//正式服
// const url = 'https://www.didaxc.cn'

//会员卡查询网点接口
export function inquireOutlets(data) {
    return request({
        url: url + '/card/index/branch',
        method: 'post',
        data
    })
}

//新增会员卡
export function addCard(data) {
    return request({
        url: url + '/card/index/add_card',
        method: 'post',
        data
    })
}

//新增会员卡
export function modifyCard(data) {
    return request({
        url: url + '/card/index/update_card',
        method: 'post',
        data
    })
}

//新增会员卡
export function detailsCard(data) {
    return request({
        url: url + '/card/index/details_card',
        method: 'post',
        data
    })
}
// 获取会员卡列表
export function getMemberInList(data) {
    return request({
        url: url + '/card/index/list_card',
        method: 'post',
        data
    })
}
// 获取会员卡开卡记录
export function getActivateCard(data) {
    return request({
        url: url + '/card/index/cardrecording',
        method: 'post',
        data
    })
}
// 获取会员卡删除列表
export function getDeleteMemberList(data) {
    return request({
        url: url + '/card/index/carddel',
        method: 'post',
        data
    })
}
// 删除会员卡
export function getOutletsIsCardDelete(data) {
    return request({
        url: url + '/card/index/delete_card',
        method: 'post',
        data
    })
}
// 删除会员卡  撤回
export function getRecoveryCard(data) {
    return request({
        url: url + '/card/index/carddel_withdraw',
        method: 'post',
        data
    })
}
// 获取优惠券列表(进行中)
export function getCouponInList(data) {
    return request({
        url: url + '/coupon/index/list_coupon',
        method: 'post',
        data
    })
}
// 获取优惠卷列表
export function getCouponList(data) {
    return request({
        url: url + '/coupon/index/list_coupon',
        method: 'post',
        data
    })
}
// 优惠卷领取记录（获取优惠卷领取列表）
export function getCouponreceive(data) {
    return request({
        url: url + '/coupon/index/couponreceive',
        method: 'post',
        data
    })
}

// 删除优惠劵记录列表
export function getCouponDeleteList(data) {
    return request({
        url: url + '/coupon/index/coupondel',
        method: 'post',
        data
    })
}
// 删除优惠劵完成
export function getOutletsDelete(data) {
    return request({
        url: url + 'coupon/index/coupondel',
        method: 'post',
        data
    })
}
// 删除优惠劵
export function getOutletsIsDelete(data) {
    return request({
        url: url + '/coupon/index/delete_coupon',
        method: 'post',
        data
    })
}
// 删除优惠劵恢复
export function getrecoveryCoupon(data) {
    return request({
        url: url + '/coupon/index/coupondel_withdraw',
        method: 'post',
        data
    })
}
// 优惠劵分类列表
export function getClassificationCoupon(data) {
    return request({
        url: url + '/coupon/index/list_coupon_category',
        method: 'post',
        data
    })
}
// 优惠劵分类 添加
export function getClassificationCouponAdd(data) {
    return request({
        url: url + '/coupon/index/add_coupon_category',
        method: 'post',
        data
    })
}
// 优惠卷的删除分类
export function getClassificationCoupondel(data) {
    return request({
        url: url + '/coupon/index/delete_coupon_category',
        method: 'post',
        data
    })
}
// 优惠卷的删除分类进行中
export function getClassificationIsdel(data) {
    return request({
        url: url + '/coupon/index/delete_coupon_category',
        method: 'post',
        data
    })
}
// 新增优惠劵
export function addCoupon(data) {
    return request({
        url: url + '/coupon/index/add_coupon',
        method: 'post',
        data
    })
}

// 获取优惠劵详情
export function getCoupon(data) {
    return request({
        url: url + '/coupon/index/details_coupon',
        method: 'post',
        data
    })
}
// 网点列表类型
export function getDotList(data) {
    return request({
        url: url + '/card/index/branch',
        method: 'post',
        data
    })
}

// 修改优惠劵
export function EditCoupon(data) {
    return request({
        url: url + '/coupon/index/update_coupon',
        method: 'post',
        data
    })
}
// 修改优惠劵推送
export function PreferentialPush(data) {
    return request({
        url: url + '/coupon/index/update_push',
        method: 'post',
        data
    })
}
// 修改优惠劵 使用说明
export function couponInstructions(data) {
    return request({
        url: url + '/coupon/index/update_instructions',
        method: 'post',
        data
    })
}

// // 修改活动
// export function modifyEvent(data) {
//   return request({
//     url: url + '/activity/activity/activityupdata',
//     method: 'post',
//     data
//   })
// }

// // 获取服务列表（出售中）
// export function serviceList(data) {
//   return request({
//     url: url + '/member/member/insuranceliston',
//     method: 'post',
//     data
//   })
// }
// 获取服务列表（下架）
export function serviceOutList(data) {
    return request({
        url: url + '/member/member/insurancelist',
        method: 'post',
        data
    })
}
// 添加服务
export function addService(data) {
    return request({
        url: url + '/member/member/insertinsurance',
        method: 'post',
        data
    })
}
// 修改服务
export function modifyService(data) {
    return request({
        url: url + '/member/member/updateinsurance',
        method: 'post',
        data
    })
}
// // 获取服务信息
// export function getServiceData(data) {
//   return request({
//     url: url + '/member/member/insurancedetail',
//     method: 'post',
//     data
//   })
// }
// 删除服务
export function deleteService(data) {
    return request({
        url: url + '/member/member/delactivity',
        method: 'post',
        data
    })
}
// 设备管理列表
export function equipmentList(data) {
    return request({
        url: url + '/command/index/command',
        method: 'post',
        data
    })
}
// // 设备管理基本信息列表
// export function essentialInformation(data) {
//   return request({
//     url: url + '/command/index/list_command',
//     method: 'post',
//     data
//   })
// }
// 获取设备列表 详情
export function getDeviceDetails(data) {
    return request({
        url: url + '/command/index/list_command',
        method: 'post',
        data
    })
}
// 设备管理基本信息列表修改
export function editEssentialInformation(data) {
    return request({
        url: url + '/command/index/commandupdata',
        method: 'post',
        data
    })
}
// 新增设备
export function addEquipment(data) {
    return request({
        url: url + '/command/index/add_command',
        method: 'post',
        data
    })
}
// 设备删除
export function equipmentListDel(data) {
    return request({
        url: url + '/command/index/command_del',
        method: 'post',
        data
    })
}
// 设备管理  获取机器监控
export function Monitor(data) {
    return request({
        url: url + '/command/index/monitor',
        method: 'post',
        data
    })
}
// 设备管理  获取机器状态
export function MachineState(data) {
    return request({
        url: url + '/command/index/control_details',
        method: 'post',
        data
    })
}
// 设备管理  机器控制命令
export function controlCommand(data) {
    return request({
        url: url + '/command/index/control_command',
        method: 'post',
        data
    })
}
