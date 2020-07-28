import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const r = new Router({
  mode: "history",
  routes: [
    {
      path: "/index",
      component: () => import("@/components/pages/index"),
      children: [
        {
          path: "/content",
          component: () => import("@/components/views/content")
        },
        {
          path: "/my",
          component: () => import("@/components/views/my")
        },
        {
          path: "/shopCar",
          component: () => import("@/components/views/shopCar")
        },
        {
          path: "/queryList",
          component: () => import("@/components/views/queryList")
        },
        {
          path: "/shopCar_end",
          component: () => import("@/components/views/shopCar_end")
        },
        {
          //重定向
          path: "",
          redirect: "/content"
        }
      ]
    },
    {
      path: "/sort",
      component: () => import("@/components/pages/sort")
    },
    {
      path: "/nav",
      component: () => import("@/components/pages/nav")
    },
    {
      path: "/comMsg",
      component: () => import("@/components/views/comMsg")
    },
    {
      path: "/register",
      component: () => import("@/components/pages/register")
    },
    {
      path: "/login",
      component: () => import("@/components/pages/login")
    },
    {
      //重定向
      path: "*",
      redirect: "/index"
    }
  ]
});

//设置路由首位
// r.beforeEach((to,from,next)=>{
//   if(to.path=="/login"){
//     next();
//     return
//   }

//   if(!sessionStorage.getItem("userInfo") && to.path=="/shopCar"){
//     next("/login");
//   }

//   if(!sessionStorage.getItem("userInfo") && to.path=="/my"){
//     next("/login");
//   }
//   next();
// })
export default r;
