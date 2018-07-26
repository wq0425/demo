<template>
    <div class="moreimg" @scroll="scrollAll">
        <div class="Img" ref="Img">
            <div>
              <p v-for="(item, key) in data " :key="key" :style="{backgroundImage:`url(${item.Url.replace('{0}', item.LowSize)})`,width:'100',height:'100'}" @click="swiper()"></p>
            </div>
            <div class="loader">加载中....</div>
        </div>



        <div class="swipperBox" :style="{display: this.isShow? 'block' : 'none'}" @click="hide">
          <swiper class="swipper" :options="swiperOption" ref="mySwiper" someSwiperEvent="callback">
            <!-- slides -->
            <swiper-slide v-if="(item, index) in data">
              <img :src="item.Url.replace('{0}', item.LowSize)" alt="">
            </swiper-slide>
            
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
          </swiper>
        </div>
    </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      data: [],
      page: 1,
      newData: [],
      isShow: false,
      swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          // ...
        }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  mounted() {
    this.more(this.page);
  },
  methods: {
    more(page) {
      let id = this.$route.query.id;
      let imgId = this.$route.query.ImageID;
      fetch(
        `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${id}&ImageID=${imgId}&Page=${page}&PageSize=30`
      )
        .then(res => {
          return res.json();
        })
        .then(result => {
          if (result.code == 1) {
            this.data = result.data.List;
          }
        });
    },
    scrollAll(e) {
      let vm = this;
      let id = vm.$route.query.id;
      let imgId = vm.$route.query.ImageID;
      let scrollHeight =
        vm.$refs.Img.getBoundingClientRect().height - window.innerHeight;
      let moreimgTop = vm.$el.scrollTop;
      //console.log(moreimgTop);
      if (moreimgTop >= scrollHeight) {
        vm.page++;
        fetch(
          `https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID=${id}&ImageID=${imgId}&Page=${
            vm.page
          }&PageSize=30`
        )
          .then(res => {
            return res.json();
          })
          .then(result => {
            if (result.code == 1) {
              vm.newData = result.data.List;
              vm.data = vm.data.concat(vm.newData);
            }
          });
      }
    },
    swiper() {
      let vm = this;
      vm.isShow = true;
      console.log(vm.isShow);
    },
    hide() {
      let vm = this;
      vm.isShow = false;
    }
  }
};
</script>
<style lang="sass" scoped>
    @import "../../scss/moreimg.scss"
</style>
