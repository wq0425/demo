<template>
    <div class="imgclass">
        <div class="select">
            <span class="color">颜色</span><span class="style">车款</span>
        </div>
        <div class="allImg">
            <ul v-for="(list, index) in data " :key="index">
                <li v-for="(item, key) in list.List" :key="key" :style="{backgroundImage:`url(${item.Url.replace('{0}', item.LowSize)})`,width:'100',height:'100'}">
                    <div class="mark" v-if="!key" @click="more(id, list.Id)">
                        <p>{{list.Name}}</p>
                        <p>{{list.Count}}张▷</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: "imgClass",
        data() {
            return {
                data: null,
                id: null
            }
        },
        mounted() {
            this.imgclass()
        },
        methods: {
            imgclass() {
                let id = this.$route.query.id;
                fetch("https://baojia.chelun.com/v2-car-getImageList.html?SerialID=" + id).then((res) => {
                    return res.json();
                }).then((result) => {
                    if (result.code == 1) {
                        this.data = result.data;
                    }
                    console.log(this.data);
                })
                this.id = id;
            },
            more(id, imgId) {
                this.$router.push({
                    path: "/more?id=" + id + "&ImageID=" + imgId
                })
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import "../../scss/imgclass.scss"
</style>
