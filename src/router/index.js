import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () => import('@/views/login/index'),
        meta: {
            title: '登录'
        },
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        meta: {
            title: '404！'
        },
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/home',
        meta: {
            title: '首页',
            icon: 'fztb'
        },
        children: [{
            path: 'home',
            name: 'Home',
            component: () => import('@/views/home/index'),
            meta: {
                title: '首页'
            }
        }]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/dashboard',
        meta: {
            title: '用户管理',
            icon: 'yhgl'
        },
        children: [{
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/user/dashboard/index'),
                meta: {
                    title: '用户管理'
                }
            }, {
                path: 'outlets',
                name: 'outlets',
                component: () => import('@/views/user/outlets/index'),
                meta: {
                    title: '网点管理'
                }
            },
            {
                path: '/user/dashboard/details',
                component: () => import('@/views/user/dashboard/details'),
                meta: {
                    title: '用户详情'
                },
                hidden: true
            },
            {
                path: '/user/dashboard/xiangxi',
                name: 'detail',
                component: () => import('@/views/user/dashboard/yonghuxiangqing.vue'),
                meta: {
                    title: '用户详情'
                },
                hidden: true
            },
            {
                path: '/user/outlets/addAccount',
                component: () => import('@/views/user/outlets/addAccount'),
                meta: {
                    title: '添加网点账号'
                },
                hidden: true
            },
            {
                path: '/user/outlets/modifyAccount',
                component: () => import('@/views/user/outlets/modifyAccount'),
                meta: {
                    title: '修改网点账号'
                },
                hidden: true
            },
            {
                path: '/user/outlets/details',
                component: () => import('@/views/user/outlets/details'),
                meta: {
                    title: '网点详情'
                },
                hidden: true
            },
            {
                path: '/user/outlets/newDot',
                component: () => import('@/views/user/outlets/newDot'),
                meta: {
                    title: '新增网点'
                },
                hidden: true
            },

            {
                path: 'market',
                name: 'market',
                component: () => import('@/views/user/market/index'),
                meta: {
                    title: '市代管理'
                }
            },
            {
                path: '/user/market/AddAgent',
                name: 'market',
                component: () => import('@/views/user/market/AddAgent'),
                meta: {
                    title: '新增市级代理商'
                },
                hidden: true
            },
            {
                path: '/user/market/particulars',
                component: () => import('@/views/user/market/particulars'),
                meta: {
                    title: '市代详情'
                },
                hidden: true
            },
            {
                path: '/user/market/AddMunicipalAdmin',
                component: () => import('@/views/user/market/AddMunicipalAdmin'),
                meta: {
                    title: '新增市代管理商'
                },
                hidden: true
            },
            {
                path: '/user/market/modifyAccount',
                component: () => import('@/views/user/market/modifyAccount'),
                meta: {
                    title: '修改代理商管理账号'
                },
                hidden: true
            },
            {
                path: 'provincial',
                name: 'provincial',
                component: () => import('@/views/user/provincial/index'),
                meta: {
                    title: '省级管理'
                }
            }, {
                path: '/user/provincial/details',
                component: () => import('@/views/user/provincial/details'),
                meta: {
                    title: '省代理商详情'
                },
                hidden: true
            }, {
                path: '/user/provincial/addAccount',
                component: () => import('@/views/user/provincial/addAccount'),
                meta: {
                    title: '添加省代理管理员'
                },
                hidden: true
            }, {
                path: '/user/provincial/AddAgent',
                component: () => import('@/views/user/provincial/AddAgent'),
                meta: {
                    title: '添加省代理商'
                },
                hidden: true
            }, {
                path: '/user/provincial/modifyAccount',
                component: () => import('@/views/user/provincial/modifyAccount'),
                meta: {
                    title: '修改省代理管理员'
                },
                hidden: true
            },
            // {
            //     path:'/user/dashboard/yonghuxiangqing',
            //     component:()=> import('@vuews/user/dashboard/yonghuxiangqing'),
            //     meta:{
            //         title:"用户详情"
            //     },
            //     hidden:true
            // },

        ]
    },

    {
        path: '/review',
        component: Layout,
        redirect: '/review',
        meta: {
            title: '审核管理',
            icon: 'xqztb'
        },
        children: [{
                path: 'merchant',
                name: 'merchant',
                component: () => import('@/views/review/merchant/index'),
                meta: {
                    title: '网点审核'
                }
            },
            {
                path: 'practitioner',
                name: 'practitioner',
                component: () => import('@/views/review/practitioner/index'),
                meta: {
                    title: '代理商审核'
                }
            },
            {
                path: '/review/merchant/review',
                component: () => import('@/views/review/merchant/review'),
                meta: {
                    title: '网点审核'
                },
                hidden: true
            },
            {
                path: '/review/practitioner/review',
                component: () => import('@/views/review/practitioner/review'),
                meta: {
                    title: '代理商审核'
                },
                hidden: true
            }
        ]
    },
    {
        path: '/marketing',
        component: Layout,
        redirect: '/marketing',
        meta: {
            title: '营销管理',
            icon: 'xqztb'
        },
        children: [{
                path: 'survey',
                name: 'survey',
                component: () => import('@/views/marketing/survey/index'),
                meta: {
                    title: '会员卡管理'
                }
            },
            {
                path: '/survey/survey',
                component: () => import('@/views/marketing/survey/survey'),
                meta: {
                    title: '会员卡信息'
                },
                hidden: true
            },
            {
                path: '',
                name: 'coupon',
                component: () => import('@/views/marketing/coupon/index'),
                meta: {
                    title: '优惠券管理'
                }
            },
            {
                path: '/coupon/coupon',
                component: () => import('@/views/marketing/coupon/coupon'),
                meta: {
                    title: '优惠券信息'
                },
                hidden: true
            },
            {
                path: '/coupon/modifyCoupon',
                component: () => import('@/views/marketing/coupon/modifyCoupon'),
                meta: {
                    title: '修改优惠劵'
                },
                hidden: true
            }
            // {
            //   path: '/coupon/modifyCoupon',
            //   component: () => import('@/views/marketing/coupon/modifyCoupon'),
            //   meta: { title: '删除优惠劵记录' },
            //   hidden: true
            // }
        ]
    },
    {
        path: '/insurance',
        component: Layout,
        redirect: '/insurance',
        meta: {
            title: '设备管理',
            icon: 'xqztb'
        },
        children: [{
                path: 'insurance',
                name: 'insurance',
                component: () => import('@/views/insurance/insurance/index'),
                meta: {
                    title: '设备管理'
                }
            },
            {
                path: '/insurance/insurance/information',
                component: () => import('@/views/insurance/insurance/information'),
                meta: {
                    title: '设备管理信息'
                },
                hidden: true
            },
            {
                path: '/insurance/insurance/modifyInformation',
                component: () => import('@/views/insurance/insurance/modifyInformation'),
                meta: {
                    title: '修改服务'
                },
                hidden: true
            }
        ]
    },
    {
        path: '/system',
        component: Layout,
        redirect: '/system',
        meta: {
            title: '系统管理',
            icon: 'xqztb'
        },
        children: [{
                path: 'user',
                name: 'user',
                component: () => import('@/views/system/user/index'),
                meta: {
                    title: '角色管理'
                }
            },
            {
                path: 'accounts',
                name: 'accounts',
                component: () => import('@/views/system/accounts/index'),
                meta: {
                    title: '系统分账'
                }
            },
            {
                path: 'data',
                name: 'data',
                component: () => import('@/views/system/data/index'),
                meta: {
                    title: '资料管理'
                }
            },
            {
                path: 'bank',
                name: 'bank',
                component: () => import('@/views/system/bank/index'),
                meta: {
                    title: '银行管理'
                }
            },
            {
                path: '/bank/modifyBank',
                component: () => import('@/views/system/bank/modifyBank'),
                meta: {
                    title: '修改银行'
                },
                hidden: true
            },
            {
                path: 'feedback',
                name: 'feedback',
                component: () => import('@/views/system/feedback/feedback'),
                meta: {
                    title: '意见反馈'
                }
            },
            {
                path: '/feedback/feedbackDetails',
                component: () => import('@/views/system/feedback/feedbackDetails'),
                meta: {
                    title: '意见反馈详情'
                },
                hidden: true
            },
            {
                path: '/material/addCarousel',
                component: () => import('@/views/system/material/addCarousel'),
                meta: {
                    title: '添加轮播图'
                },
                hidden: true
            },
            {
                path: '/material/modifyCarouse',
                component: () => import('@/views/system/material/modifyCarouse'),
                meta: {
                    title: '修改轮播图'
                },
                hidden: true
            }
        ]
    },
    {
        path: '/order',
        component: Layout,
        redirect: '/order',
        meta: {
            title: '订单管理',
            icon: 'xqztb'
        },
        children: [{
                path: 'management',
                name: 'management',
                component: () => import('@/views/dingdan/dingdan.vue'),
                meta: {
                    title: '订单管理'
                }
            },
            {
                path: 'sh',
                name: 'sh',
                component: () => import('@/views/dingdan/shouhou.vue'),
                meta: {
                    title: '售后管理'
                }
            },
            {
                path: 'sh/detail',
                name: 'detail',
                component: () => import('@/views/dingdan/shouhouxq.vue'),
                meta: {
                    title: '售后详情'
                },
                hidden: true
            }
        ]
    },
    // 404 page must be placed at the end !!!
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

const createRouter = () => new Router({
    mode: 'hash', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRoutes
})
const router = createRouter()
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export default router
