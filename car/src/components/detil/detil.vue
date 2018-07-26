<template>
    <div class="detil">
        <div class="img" @click="imgs(id)">
            <img :src="src" alt="">
            <span class="imgNum">{{imgNum}}张照片</span>
        </div>
        <div class="info">
            <div class="infoLeft">
                <p class="price">{{price}}</p>
                <p class="guidePrice">指导价 {{guidePrice}}</p>
            </div>
            <div class="infoRight">
                <button class="floorPrice">{{floorPrice}}</button>
            </div>
        </div>
        <div class="list">
            <div class="type">
                <span v-for="(item, index) in year" :key="index">{{item}}</span>
            </div>
        </div>
        <div class="floor">
            <p>询问底价</p>
            <p>本地经销商为你报价</p>
        </div>
    </div>
</template>
<script>
    export default {
        name: "detil",
        data() {
            return {
                src: null,
                price: null,
                guidePrice:null,
                floorPrice: null,
                imgNum: null,
                list: null,
                year: null,
                id: null
            }
        },
        mounted() {
            this.detilData();
        },
        methods: {
            detilData() {
                let id = this.$route.query.id;
                fetch("https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=" + id).then((res) => {
                    return res.json()
                }).then((result) => {
                    //console.log(id)
                    let listyear = ["全部"];
                    let listdata = {"全部": []}
                    if (result.code === 1) {
                        let list = result.data.list;
                        list.forEach((item, index) => {
                            let year = item.market_attribute.year;
                            if (listyear.indexOf(year) != -1) {
                                listdata[year].push(item);
                            } else {
                                listyear.push(year);
                                listdata[year] = [item];
                            }
                            listdata["全部"].push(item);
                        })
                        // let sortList = (data) => {
                        //     data.sort((a, b) => {
                        //         console.log(a);
                        //         console.log(b)
                        //     })
                        // }
                        // for (let i in listdata) {
                        //     sortList(listdata[i]);
                        // }
                        this.src = result.data.CoverPhoto;
                        this.price = result.data.market_attribute.dealer_price;
                        this.guidePrice = result.data.market_attribute.official_refer_price;
                        this.floorPrice = result.data.BottomEntranceTitle;
                        this.imgNum = result.data.pic_group_count;
                        this.list = listdata;
                        this.year = listyear;
                        this.id = id;
                        // (
                        //     () => {
                        //         var defining = {a: function() { },b: function(){},c:function(){}};
                        //         Object.keys(defining).forEach(key => {window[key] = defining[key];});
                        //     }
                        // )(); 
                        let obj = {};
                        let arr = [];
                        for (let i in listdata) {
                            // obj[i]
                            // arr.unshift(listdata[i]);
                        }
                        //console.log(obj);
                    } else {
                        alert(result.msg)
                    }
                })
            },
            imgs(id) {
                //console.log(id);
                this.$router.push({
                    path: "/imgclass?id=" + id
                })
                //console.log(this.$route.query.id);
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import "../../scss/detil.scss";
</style>
