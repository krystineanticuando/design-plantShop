// import { Application } from "@nativescript/core";
// Application.setCssFileName("fonts/fontawesome.css");

import store from '../store'

import Vue from 'nativescript-vue'
import Home from './components/Home'

Vue.config.silent = false

new Vue({
  store,
  render: (h) => h('frame', [h(Home)]),
}).$start()
