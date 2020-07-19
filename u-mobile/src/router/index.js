import Vue from 'vue'
import Router from 'vue-router'
//一级路由组件
// import Index from '@/components/pages/index'
// import Nav from '@/components/pages/nav'
// import Sort from '@/components/pages/sort'
//二级路由组件
// import Content from '@/components/views/content'
// import My from '@/components/views/my'
// import ShopCar from '@/components/views/shopCar'
// import QueryList from '@/components/views/queryList'

Vue.use(Router)

const r =  new Router({
  // mode:"history",
  routes: [{
      path: '/index',
      component: ()=>import('@/components/pages/index'),
      children: [{
          path: '/content',
          component: ()=>import('@/components/views/content')
        },
        {
          path: '/my',
          component: ()=>import('@/components/views/my')
        },
        {
          path: '/shopCar',
          component: ()=>import('@/components/views/shopCar')
        },
        {
          path: '/queryList',
          component: ()=>import('@/components/views/queryList')
        },
        { //重定向
          path: '',
          redirect: '/content'
        }
      ]
    },
    {
      path: '/sort',
      component: ()=>import('@/components/pages/sort')
    },
    {
      path: '/nav',
      component: ()=>import('@/components/pages/nav')
    },
    {//重定向
      path:'*',
      redirect:'/index'
    }
  ]
})


export default r