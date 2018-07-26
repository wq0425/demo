import {getList} from "../../../static/mock/index";

const state = {
    list: [],
    num: [],
    price: [],
    isSelectAll: false
}

const mutations = {
    get: (state, {list}) => {
        state.list = list;
    },
    selectItem: (state, {ind}) => {
        let n = 0;
        state.list.map((item, index) => {
            index == ind && (item.checked = !item.checked);
            if (item.checked) {
                n += 1;
                if (state.list.length == n) {
                    state.isSelectAll = true;
                } else {
                    state.isSelectAll = false;
                }
            }
        })
        // state.list = state.list;
    },
    all: (state) => {
        state.isSelectAll = !state.isSelectAll;
        state.list.forEach((item) => {
            item.checked = state.isSelectAll;
        })
    },
    changeNum: (state, {ind, type}) => {
        state.list.map((item, index) => {
            if (index == ind) {
                if (type == "+") {
                    item.count ++;
                } else {
                    if (item.count == 0) {
                        return;
                    }
                    item.count --;
                }
            }
        })
    },
    pri: (state) =>{
        let num = 0;
        let price = 0;
        let list = state.list.filter(item=>{
            return item.checked && item.count>0
        });
        list.forEach(item=>{
            num += item.count;
            price += item.count * item.prices;
        })
        state.num = num;
        state.price = price;
    }
}

const actions = {
    getdata(store) {
        getList().then((res) => {
            return res.json()
        }).then((result) => {
            store.commit("get", {list: result})
            store.commit("pri");
        })
    },
    selectItem(store, payload) {
        store.commit("selectItem", payload);
        store.commit("pri");
    },
    changeNum(store, payload) {
        store.commit("changeNum", payload);
        store.commit("pri");
    },
    all(store) {
        store.commit("all");
        store.commit("pri");
    }
}


export default {
    state,
    mutations,
    actions
}