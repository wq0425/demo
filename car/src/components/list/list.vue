<template>
    <div class="list" >
        <div v-for="(item, key) in list" :key="key" :id="item.speeling">
            <h3>{{item.speeling}}</h3>
            <ul class="listuls">
                <li v-for="(ite, ind) in item.list" :key="ind" @click="getMasterList(ite.MasterID)">
                    <img class="imgs" :data-src="ite.CoverPhoto" alt=""><span class="name">{{ite.Name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        data() {
            return {}
        },
        props: ["list", "getMasterList"],
    }
</script>

<style lang="sass" scoped>
    @import "../../scss/list.scss";
</style>
