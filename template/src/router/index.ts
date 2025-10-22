import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import("@/layouts/Layout.vue"),
    children: [
      {
        path: "home",
        name: "foo-home",
        component: () => import("@/pages/Home.vue"),
        meta: { title: "首页" },
      },
      {
        path: "detail/:id",
        name: "foo-detail",
        component: () => import("@/pages/Detail.vue"),
        meta: { title: "详情", auth: true },
      },
      {
        path: "api-test",
        name: "api-test",
        component: () => import("@/pages/ApiTest.vue"),
        meta: { title: "API 测试" },
      },
      {
        path: "menu-demo",
        name: "menu-demo",
        component: () => import("@/pages/MenuDemo.vue"),
        meta: { title: "菜单演示" },
      },
      {
        path: "project/register/fill-project-info",
        name: "fill-project-info",
        component: () =>
          import("@/pages/project/registration/FillProjectInfo.vue"),
        meta: { title: "填写项目信息" },
      },
      {
        path: "project/registration/list",
        name: "project-registration-list",
        component: () => import("@/pages/project/registration/list.vue"),
        meta: { title: "项目登记列表" },
      },
      {
        path: "project/detail/:id",
        name: "project-detail",
        component: () => import("@/pages/project/registration/detail.vue"),
        meta: { title: "项目详情" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(qiankunWindow.__POWERED_BY_QIANKUN__ ? "/product-foo-prd/" : "/"),
  routes
});

export default router;
