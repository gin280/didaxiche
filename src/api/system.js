import request from '@/utils/request'

//测试服
const url = 'https://ddxc.xyyun.co'
// const url = 'https://ddxc.xyyunyw.com'
//正式服
// const url = 'https://www.didaxc.cn'

// 获取银行列表
export function getBankList(data) {
    return request({
        url: url + '/member/separater/list_bank',
        method: 'post',
        data
    })
}
// 删除银行卡
export function getBankDel(data) {
    return request({
        url: url + '/member/separater/del_bank',
        method: 'post',
        data
    })
}
// 添加银行卡
export function getBankAdd(data) {
    return request({
        url: url + '/member/separater/add_bank',
        method: 'post',
        data
    })
}
// 银行卡 详情
export function getBank(data) {
    return request({
        url: url + '/member/separater/bank',
        method: 'post',
        data
    })
}

// 修改银行卡
export function getBankEdit(data) {
    return request({
        url: url + '/member/separater/update_bank',
        method: 'post',
        data
    })
}
// 获取系统分账详情
export function getSystemAccounting(data) {
    return request({
        url: url + '/member/separater/detail_separater',
        method: 'post',
        data
    })
}
// 更改系统分账
export function setSystemAccounting(data) {
    return request({
        url: url + '/member/separater/update_separater',
        method: 'post',
        data
    })
}
// 系统分账 添加
export function AddSystemAccounting(data) {
    return request({
        url: url + '/member/separater/add_separater',
        method: 'post',
        data
    })
}
// 获取轮播图列表
export function getCarouselList(data) {
    return request({
        url: url + '/activity/data/banner',
        method: 'post',
        data
    })
}
// 删除轮播图
export function CarouselListDel(data) {
    return request({
        url: url + '/activity/data/bannerdel',
        method: 'post',
        data
    })
}
// 修改轮播图
export function modifyCarousel(data) {
    return request({
        url: url + '/activity/data/updataadd',
        method: 'post',
        data
    })
}
// 新增轮播图
export function addCarousel(data) {
    return request({
        url: url + '/activity/data/banneradd',
        method: 'post',
        data
    })
}
// 获取轮播图
export function getCarousel(data) {
    return request({
        url: url + '/activity/data/updata',
        method: 'post',
        data
    })
}
// 获取捐款协议
export function getDonationAgreement(data) {
    return request({
        url: url + '/activity/data/donationagreement',
        method: 'post',
        data
    })
}
// 修改捐款协议
export function donationAgreement(data) {
    return request({
        url: url + '/activity/data/donationadd',
        method: 'post',
        data
    })
}
// 获取车主协议
export function getOwnerAgreement(data) {
    return request({
        url: url + '/activity/data/owneragreement',
        method: 'post',
        data
    })
}
// 修改车主协议
export function ownerAgreement(data) {
    return request({
        url: url + '/activity/data/owneradd',
        method: 'post',
        data
    })
}
// 获取商家协议
export function getBusinessAgreement(data) {
    return request({
        url: url + '/activity/data/merchantagreement',
        method: 'post',
        data
    })
}
// 修改商家协议
export function businessAgreement(data) {
    return request({
        url: url + '/activity/data/merchantadd',
        method: 'post',
        data
    })
}
// 获取从业者协议
export function getPractitionerAgreement(data) {
    return request({
        url: url + '/activity/data/practitioneragreement',
        method: 'post',
        data
    })
}
// 修改从业者协议
export function practitionerAgreement(data) {
    return request({
        url: url + '/activity/data/practitioneradd',
        method: 'post',
        data
    })
}
// 获取救助协议
export function getHelpAgreement(data) {
    return request({
        url: url + '/activity/data/salvageagreement',
        method: 'post',
        data
    })
}
// 修改救助协议
export function helpAgreement(data) {
    return request({
        url: url + '/activity/data/salvageadd',
        method: 'post',
        data
    })
}
// 获取关于我们
export function getAboutAgreement(data) {
    return request({
        url: url + '/activity/data/aboutus',
        method: 'post',
        data
    })
}
// 修改关于我们
export function aboutAgreement(data) {
    return request({
        url: url + '/activity/data/aboutusadd',
        method: 'post',
        data
    })
}
// 首页资料图展示
export function getHomeInfoMap(data) {
    return request({
        url: url + '/activity/data/homepage',
        method: 'post',
        data
    })
}
// 首页资料图修改
export function homeInfoMapX(data) {
    return request({
        url: url + '/activity/data/homepageadd',
        method: 'post',
        data
    })
}
// 轮播图状态修改
export function carouselStatus(data) {
    return request({
        url: url + '/activity/data/statusupdata',
        method: 'post',
        data
    })
}
// 获取捐款设置
export function getDonateS(data) {
    return request({
        url: url + '/activity/data/contribution',
        method: 'post',
        data
    })
}
// 修改捐款设置
export function setDonateS(data) {
    return request({
        url: url + '/activity/data/contributionadd',
        method: 'post',
        data
    })
}
// 获取联系电话
export function getPhone(data) {
    return request({
        url: url + '/activity/data/phone',
        method: 'post',
        data
    })
}
// 联系电话修改
export function setPhone(data) {
    return request({
        url: url + '/activity/data/phoneadd',
        method: 'post',
        data
    })
}
//意见反馈
export function getFeedback(data) {
    return request({
        url: url + '/member/separater/feed',
        method: 'post',
        data
    })
}
// 意见反馈详情
export function getFeedbackDetails(data) {
    return request({
        url: url + '/member/separater/feedback',
        method: 'post',
        data
    })
}
//订单管理
export function dingdanguanli1(data) {
    return request({
        url: url + '/order/index/cardorder',
        method: 'post',
        data
    })
}
export function xianjinxiche1(data) {
    return request({
        url:url +'/order/index/orderdetial',
        method:'post',
        data
    })
}

export function myCommand(data) {
    return request({
        url:url +'/command/index/over',
        method:'post',
        data
    })
}
//订单管理-售后管理
export function shouhouguanli(data){
    return request({
        url:url+''

    })
}
