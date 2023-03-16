<template>
  <div class="main">
    <loading-bar v-show="loading"/>
    <icon-container @data-received="handleData" @char-info="handleInfo"/>
    <h1>{{ now?.name }}</h1>
    <h5>{{ now?.nickname }}</h5>
    <p>Lv. {{ now?.level }}</p>
    <p>{{ now?.promotion }}</p>
    <p>{{ now?.combat.toLocaleString() }}</p>
    <dungeon-container @loading="loading=true" @loaded="loading=false" :myinfo="info"/>
  </div>
</template>

<script>
import IconContainer from './components/IconContainer.vue'
import LoadingBar from './components/LoadingBar.vue'
import DungeonContainer from './components/DungeonContainer.vue'

export default {
  name: 'App',
  components: {
    IconContainer,
    LoadingBar,
    DungeonContainer
  },
  data () {
    return {
      loading: false,
      data: null,
      info: null,
      now: null
    }
  },
  methods: {
    handleData(data) {
      this.data = data
      this.loading = false
    },
    handleInfo(data) {
      this.info = data[0]
      this.now = Object.assign({}, this.info);
      switch (this.info.promotion) {
        case "결전요원":
        case "결사대원":
        case "그림자요원":
          this.info.promotion = 3;
          break;
        case "태스크포스":
          this.info.promotion = 2;
          break;
        case "특수요원":
        case "특수대원":
        case "해결사":
          this.info.promotion = 1;
          break;
      }
    },
    getId(data){
      this.account = data
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'Poppins', sans-serif;
}
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color: white;
  background: #2e2e41;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
}
</style>
