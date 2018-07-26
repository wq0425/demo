<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0;
  width: 100%;
  height: 100%;
}
html {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}

.loading{
    position: fixed;
    z-index: 101;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: transparent;
}
.loading div{
	position: relative;
	top: 50%;
	left: 2.65rem;
	transform: translate3d(0, -50%, 0);
	width: 2.2rem;
	height: 2.2rem;
	background: rgba(0,0,0,1);
	border-radius: .2rem;
}
.loading img{
	width: 1rem;
	margin-top: .35rem;
}
.loading p{
	font-size: .3rem;
	color: #c0c0c0;
	margin-top: .3rem;
}
</style>
