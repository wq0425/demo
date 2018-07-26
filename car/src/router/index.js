import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import Index from "@/components/index";
//import Detil from "../../src/components/detil/detil";
const Detil = () => import("../../src/components/detil/detil");
const Imgclass = () => import("../../src/components/imgClass/imgClass");
const More = () => import("../../src/components/imgClass/more");
const Refresh = () => import('../../src/components/refresh');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/detil',
      name: "Detil",
      component: Detil
    },
    {
      path: '/imgclass',
      name: "Imgclass",
      component: Imgclass
    },
    {
      path: '/more',
      name: 'More',
      component: More
    },
    {
      path: '/refresh',
      name: 'Refresh',
      component: Refresh
    }
  ]
})
