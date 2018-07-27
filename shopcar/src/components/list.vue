<template>
    <div>
        <ul class="list">
            <li v-for="(item, index) in list" :key="index">
                <input type="checkbox" :checked="item.checked" @change="selectItem({ind: index})">
                <div class="imgs">
                    <img :src="item.url" alt="">
                </div>
                <div class="right">
                    <p>{{item.tit}}</p>
                    <p>{{item.des}}</p>
                    <div class="pri">
                        <p>价格：{{item.prices}}</p>
                        <p class="num">
                            <button class="minus" @click="changeNum({ind: index, type: '-'})">-</button><span>{{item.count}}</span><button class="add" @click="changeNum({ind: index, type: '+'})">+</button>
                        </p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import {mapState, mapActions} from "vuex";
    export default {
        name: "list",
        data() {
            return {}
        },
        computed: {
            ...mapState({
                list: state => state.index.list
            })
            // list() {
            //     return this.$store.state.index.list
            // }
        },
        methods: {
            ...mapActions({
                selectItem: "selectItem",
                changeNum: "changeNum"
            })
        },
        mounted(){
            this.$store.dispatch('getdata');
        }
    }
</script>
<style lang="sass" scoped>
    @import "../scss/shoplist.scss";
</style>
