import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Index from './views/Index.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Application from './views/nav2/Application.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import SysLog from './views/nav3/SysLog.vue'
import AdminLog from './views/nav3/AdminLog.vue'
import UserLog from './views/nav3/UserLog.vue'
import GuidePageConfig from './views/nav4/GuidePageConfig.vue'
import IntegralConfig from './views/nav4/IntegralConfig.vue'
import SubscribeConfig from './views/nav4/SubscribeConfig.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'el-icon-menu',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/Index', component: Index, name: '首页' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-menu',//图标样式class
        leaf: true,//只有一个节点
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/studyRecode', component: Application, name: '学习成绩' },
        ]
    },{
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-menu',//图标样式class
        leaf: true,//只有一个节点
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/dailyRecode', component: Application, name: '日常成绩' },
        ]
    },{
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-menu',//图标样式class
        leaf: true,//只有一个节点
        children: [
            // { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/activeRecode', component: Application, name: '活动记录' },
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '权限管理',
    //     iconCls: 'el-icon-menu',
    //     children: [
    //         { path: '/page4', component: Page4, name: '权限组管理' },
    //         { path: '/Main', component: Main, name: '权限组权限管理' },
    //         { path: '/Form', component: Form, name: '权限组人员管理' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'el-icon-menu',
        leaf: true,//只有一个节点
        children: [
            { path: '/user', component: user, name: '账号管理' },
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;