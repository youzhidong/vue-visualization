import Vue from 'vue'
import Vuex from 'vuex'
import { getChildComponent } from '../utils/index'
import { Object } from 'core-js';

Vue.use(Vuex)

const store =  new Vuex.Store({
	state: {
		colWidth: 160,
		sheetData: {
			header: [],
			rows: [],
        },
        editUuid: '',
        tempUuid: '',
        componentsList: [],
        editSettng: {} // 每个组件的可设置属性
	},
    mutations: {
        updateUuid(state, {id, prefix}) {
            console.log(state.componentsList)
            state[prefix+'Uuid'] = id
        },
        removeItem(vm, item){
            event.cancelBubble = true;
            let index = vm.componentsList.findIndex(itx => JSON.stringify(itx) === JSON.stringify(item))
            vm.componentsList.splice(index, 1);
        },
        addItem(state) {
            // console.log(state.componentsList);
        },
        editItem(state, {uuid, itemData, componentSetting}) {
            state.editUuid = uuid
            let set = Object.assign({}, JSON.parse(JSON.stringify(componentSetting)))
            console.log(set)
            Object.keys(set.appearance || {}).forEach(key => {
                set.appearance[key].componentData.value = itemData.appearance[key] || set.appearance[key].componentData.value
            })
            Object.keys(set.content || {}).forEach(key => {
                set.content[key].componentData.value = itemData.content[key] || set.content[key].componentData.value
            })
            state.editSettng = set
        },
        updateSetting(state, data = {}) {
            let appearance = {}
            let content = {}
            let item = getChildComponent(state.componentsList, state.editUuid)
            Object.keys(data.appearance || {}).forEach(key => {
                appearance[key] = data.appearance[key].componentData.value
            })
            Object.keys(data.content || {}).forEach(key => {
                content[key] = data.content[key].componentData.value
            })
            item.appearance = appearance
            item.content = content
        }
    },
    actions: {
    },
    getters: {
    }
})
Vue.$Store = Vue.prototype.$Store = store

export default store