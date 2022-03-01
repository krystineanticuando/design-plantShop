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
      removeSimilarOrder(state,item){
        const ids = []
        state.orders.forEach((order,i)=>{
          if(order[item]){
            ids.push(i)
          }
        })
        while(ids.length){
          const id = ids.pop()
          state.orders.splice(id,1)
        }
      }
  }
});