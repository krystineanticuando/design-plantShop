// import { Application } from "@nativescript/core";
// Application.setCssFileName("fonts/fontawesome.css");

const firebase = require('@nativescript/firebase').firebase
import store from '../store'
import Vue from 'nativescript-vue'
import Home from './components/Home'
import { ModalStack, overrideModalViewMethod, VueWindowedModal } from "nativescript-windowed-modal"

Vue.registerElement(
  'CardView',
  () => require('@nstudio/nativescript-cardview').CardView
);

overrideModalViewMethod()
Vue.registerElement("ModalStack", () => ModalStack)

Vue.use(VueWindowedModal)

Vue.prototype.$fb = firebase 
Vue.config.silent = true
new Vue({
  store,
  methods: {
    keepInSync(table,sync=true) {
      firebase.keepInSync(
        table, sync 
      ).then(()=>console.log(`in sync [ ${sync} ]`, table))
      .catch(console.log)
    }
  },
  created() {
    //na
    if(firebase)
    {
      firebase.enableLogging(true)
      firebase.init({
        showNotificationsWhenInForeground: true,
        iOSEmulatorFlush: true,
        persist: true,
        onMessageReceivedCallback: (message)=> {
        console.log(message)
        }
      }).then(()=>console.log('firebase initialization ok'))
      .then(()=>{
        this.keepInSync("/Plants")
      }).catch(console.log)
    }
  },
  render: (h) => h('frame', [h(Home)]),
}).$start()
