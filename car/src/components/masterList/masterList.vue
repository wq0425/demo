<template>
    <div ref="master" class="master">
        <div class="masterCon" v-for="(item, key) in masterList" :key="key" @touchmove.stop="touchMove" @touchstart.stop="touchStart" @touchend="touchEnd">
            <h3>{{item.GroupName}}</h3>
            <ul class="uls">
                <li v-for="(value, index) in item.GroupList" :key="index" @click="detil(value.SerialID)">
                    <img class="imgs" :data-src="value.Picture" alt="">
                    <div class="tit">
                        <p>{{value.AliasName}}</p>
                        <p>{{value.DealerPrice}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return{}
        },
        props: ["masterList"],
        methods: {
            touchStart(e){
                //console.log('e...', e);
                this.startTouch = e.touches[0];
            },
            touchMove(e){
                let touch = e.touches[0];
                let pageX = touch.pageX - this.startTouch.pageX;
                this.pageX = pageX;
                if (pageX<0){
                    //不做处理
                }else{
                    this.$refs.master.style = `transform:translate3d(${pageX}px,0,0)`;
                    if (pageX > 100) {
                        this.$el.className = "master";
                    } else {
                        this.$el.className = "active";
                    }
                    
                }   
            },
            touchEnd(e){
                this.$refs.master.style = ``;
                // if (this.pageX<100){
                //     // 不作处理
                // }else{
                //     this.hideMaster();
                // }
            },
            detil(id) {
                this.$router.push({
                    path: "/detil?id=" + id
                })
            }
        }
    }
</script>
<style lang="sass" scoped>
    @import "../../scss/master.scss";
</style>

