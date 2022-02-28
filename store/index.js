import Vue from 'nativescript-vue'

import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      orders:[]
  },
  mutations: {
      clearOrders(state){
        state.orders.length = 0
        state.orders=[]
      },
      addOrder(state,{key,item}){
        state.orders.push({
            [key]:item
        })
      },
      removeOrder(state,item){
        const index = state.orders.findIndex((x)=>JSON.stringify(item)==JSON.stringify(x))
        if(index !=-1){
            state.orders.splice(index,1)
        }
      }
  }
});