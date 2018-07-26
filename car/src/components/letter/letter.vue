<template>
    <div class="letter" @touchstart="touchStart" @touchmove="touchMove" >
        <p v-for="(item,key) in letter" :key="key" @click="changeLetter(item)">{{item}}</p>
    </div>
</template>


<script>
export default {
  props: ["letter", "changeLetter"],
  methods: {
    touchStart() {
      this.height = window.innerWidth / 750 * 100 * 0.5;
      //console.log(this.letter);
      this.offsetTop =
        (window.innerHeight - this.height * this.letter.length) / 2;
    },
    touchMove(e) {
      let touch = e.touches[0];
      let index = parseInt((touch.pageY - this.offsetTop) / 22);
      if (index < 0) {
        index = 0;
      } else if (index > this.letter.length - 1) {
        index = this.letter.length - 1;
      }
      //console.log(this.letter[index]);
      this.changeLetter(this.letter[index]);
    }
  }
};
</script>

<style lang="sass" scoped>
    @import "../../scss/letter.scss";
</style>
