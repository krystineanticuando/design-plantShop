import Vue from 'nativescript-vue'

import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      orders:[],
      plants:[],
      cleared_affected:{},
      my_pin:""
  },
  mutations: {

    //pin
    storePin(state,data){
      state.my_pin = data
    },

    //plants
    plantsData(state,data){
      state.plants = data.slice()
    },
    updatePlantData(state,{key,code,value}){
      const index = state.plants.findIndex((x)=>x['Common_Name']==key)
      if(index!=-1){
        state.plants[index][code] = value
      }
    },



    //orders
    generatedOrders(state){
      state.orders.length = 0
      state.orders=[]
    },
      clearOrders(state){
        const code = 'Stock'
        state.cleared_affected = {}
        for(const item of state.orders){
          const key = Object.keys(item)[0]
          const index = state.plants.findIndex((x)=>x['Common_Name']==key)
          if(index!=-1){
            state.plants[index][code]++
            state.cleared_affected[key] = (state.cleared_affected[key]||0) +1
          }
        }
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
      },

      
  }
});