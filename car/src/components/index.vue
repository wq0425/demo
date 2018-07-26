<template>
    <div class="index">
        <div class="wrap" ref="wrap">
            <List :list = "brandList" :getMasterList="getMasterList"/>
        </div>
        <Letter :letter = "letter" :changeLetter="changeLetter"/>
        <MasterList :masterList="masterList"/>
    </div>
</template>


<script>
import axios from "axios";
import Letter from "./letter/letter";
import List from "./list/list";
import MasterList from "./masterList/masterList";
import {shake, throttle, lazyload} from "./lazy/lazy";
export default {
  name: "car",
  data() {
    return {
      letter: [],
      brandList: [],
      masterList: []
    };
  },
  components: {
    Letter,
    List,
    MasterList
  },
 methods: {
   getBrandList() {
     axios.get("https://baojia.chelun.com/v2-car-getMasterBrandList.html").then(result => {
      let data = result.data;
      if (data.code === 1) {
        let letter = [];
        let brandList = [];
        let len = -1;
        data.data.forEach(item => {
          let speeling = item.Spelling[0];
          if (letter[len] == speeling) {
            brandList[len].list.push(item);
          } else {
            len++;
            letter.push(speeling);
            brandList.push({
              speeling,
              list: [item]
            });
          }
        });
        letter.unshift('#');
        this.letter = letter;
        this.brandList = brandList;
        setTimeout(() => {
          lazyload.init();
        }, 10)
      } else {
        alert(data.msg);
      }

      //console.log(result.data.data);
    //   result.data.data.forEach((item, index) => {
    //     //if (this.letter)
    //     //console.log(item.Spelling[0]);
    //   });
      // res.data.data.forEach((item,key)=>{
      //     this.letter.push(item.Spelling.slice(0,1));
      //     this.list.push(item);
      // })
      // this.newLetter = [...new Set(this.letter)]
      // console.log(res.data.data);
    });
   },
   getMasterList(id) {
     console.log();
     //console.log(id);
     fetch("https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID=" + id).then((res) => {
        res.json().then((result) => {
          if (result.code === 1) {
            this.masterList = result.data;
            this.$children[2].$el.className = "active";
            setTimeout(() => {
              lazyload.init();
            }, 10)
          } else {
            alert(result.msg);
          }
        
      })
     })
   },
    changeLetter(letter){
        if (letter == '#'){
            return;
        }
        //console.log(letter)
        let ele= document.querySelector(`#${letter}`);
        let offsetTops = ele.offsetTop;
        let list = document.querySelector('.list')
        list.scrollTop = offsetTops;
        
    }
  },
  mounted() {
    this.getBrandList();
    let list = document.querySelector('.list');
    let scroll = throttle(() => {
        lazyload.loadImg();
      }, 500)
    list.onscroll = () => {
      scroll()
    };
    document.querySelector(".master").onscroll = () => {
      scroll();
    }
    //console.log(document.querySelector(".master"));
  },
};
</script>


<style>
html {
  width: 100%;
  height: 100%;
}
.wrap{
    width: 100%;
    height: 100%;
    overflow-y: scroll;
}
.index {
  width: 100%;
  height: 100%;
}
*{
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-decoration: none;
  font-size: 0.32rem;
  overflow-x: hidden;
}
body {
  width: 100%;
  height: 100%;
}
</style>
