<template>
    <div>
        <label for="sel">
            <input id="sel" type="checkbox" :checked="All" @click="all">全选
        </label>
        <List/>
        <div class="NUM">
            <p>数量：{{num}}</p>
            <p>合计：{{price}}</p>
        </div>
    </div>
</template>
<script>
import List from "./list";
import {mapState, mapActions} from "vuex";
    export default {
        name: "index",
        data() {
            return {}
        },
        components: {
            List
        },
        computed: {
            ...mapState({
                num: state => state.index.num,
                price: state => state.index.price,
                All: state => state.index.isSelectAll
            })
        },
        mounted() {
            this.$store.dispatch("getdata")
        },
        methods: {
            ...mapActions({
                all: "all"
            })
            
        }
    }
</script>
<style>
    .NUM {
        height: 50px;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
</style>
