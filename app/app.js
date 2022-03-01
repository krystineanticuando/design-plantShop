// import { Application } from "@nativescript/core";
// Application.setCssFileName("fonts/fontawesome.css");

import store from '../store'
import Vue from 'nativescript-vue'
import Home from './components/Home'

const firebase = require('@nativescript/firebase').firebase
Vue.prototype.$fb = firebase // firebase
Vue.config.silent = false
new Vue({
  store,
  methods: {
    keepInSync(table,sync=true) {
      firebase.keepInSync(
        table, sync 
      ).then(()=>console.log(`in sync [ ${sync} ]`, table)
         
      ).catch(console.log)
    }
  },
  created () {
    firebase.enableLogging(true)
    firebase.init({
      iOSEmulatorFlush: true,
      persist: true
    }).then(()=>console.log('firebase initialization ok'))
    .then(()=>{
      this.keepInSync("/Plant_Inventory")
      this.keepInSync("/Transaction")
    }).catch(console.log)
  },
  render: (h) => h('frame', [h(Home)]),
}).$start()
