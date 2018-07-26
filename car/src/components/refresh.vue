<template>
  <div>
       <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
       <ul>
         <li v-for="(item,index) in listdata">{{item.name}}</li>
         <li v-for="(item,index) in downdata">{{item.name}}</li>
       </ul>
    </v-scroll>
  </div>
</template>
<script>
import Scroll from "./iscroll";

export default {
  data() {
    return {
      counter: 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
      num: 15, // 一次显示多少条
      pageStart: 0, // 开始页数
      pageEnd: 0, // 结束页数
      listdata: [], // 下拉更新数据存放数组
      downdata: [] // 上拉更多的数据存放数组
    };
  },
  mounted: function() {
    this.getList();
  },
  methods: {
    getList() {
      let vm = this;
      console.log(this);
      fetch("https://api.github.com/repos/typecho-fans/plugins/contents/")
        .then(res => {
          return res.json();
        })
        .then(
          result => {
            vm.listdata = result.slice(0, 15);
          },
          result => {
            console.log("error");
          }
        );
    },
    onRefresh(done) {
      this.getList();

      done(); // call done
    },
    onInfinite(done) {
      let vm = this;
      fetch("https://api.github.com/repos/typecho-fans/plugins/contents/")
        .then(res => {
          return res.json();
        })
        .then(
          result => {
            vm.counter++;
            vm.pageEnd = vm.num * vm.counter;
            vm.pageStart = vm.pageEnd - vm.num;
            let arr = result;
            let i = vm.pageStart;
            let end = vm.pageEnd;
            for (; i < end; i++) {
              let obj = {};
              obj["name"] = arr[i].name;
              vm.downdata.push(obj);
              if (i + 1 >= result.length) {
                this.$el.querySelector(".load-more").style.display = "none";
                return;
              }
            }
            done(); // call done
          },
          result => {
            console.log("error");
          }
        );
    }
  },
  components: {
    "v-scroll": Scroll
  }
};
</script>