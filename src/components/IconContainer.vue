<template>
    <section class="main-container" v-if="data">
        <div class="tab-nav-bar">
            <div class="tab-navigation">
                <ul class="tab-menu" ref="tabMenu" @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp">
                    <li v-for="(char, index) in data"
                        :key="index"
                        :class="{'tab-btn': true, 'active': index === activeTabIndex}"
                        @click="activeTab(char, index)">
                        <img :src="characters.filter(c => c.name === char.name)[0].image" :alt="char.name">
                    </li>
                </ul>
                <!-- <div class="content-container" >
                    <div class="content"  v-for="(char, index) in data" :key="index" :class="{ 'hide': index !== hoveredIndex }" >
                        <h2>{{ char.name }}</h2>
                        <h5>{{ char.nickname }}</h5>
                        <p>Lv. {{ char.level }}</p>
                        <p>{{ char.promotion }}</p>
                        <p>{{ char.combat.toLocaleString() }}</p>
                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script lang="js">
export default {
  name: 'IconContainer',
  props: ['accountData'],
  watch: {
    accountData: {
        immediate: true,
        handler () {
            
        }
    }
  },
  data () {
    return {
      activeTabIndex : 0,
      hoveredIndex : -1,
      activeDrag: false,
      data : [],
      characters: [
      { name: '이세하', image: require('../assets/icon/seha.png') },
      { name: '이슬비', image: require('../assets/icon/seulbi.png') },
      { name: '서유리', image: require('../assets/icon/yuri.png') },
      { name: '제이', image: require('../assets/icon/j.png') },
      { name: '미스틸테인', image: require('../assets/icon/mis.png') },
      { name: '나타', image: require('../assets/icon/nata.png') },
      { name: '레비아', image: require('../assets/icon/revia.png') },
      { name: '하피', image: require('../assets/icon/harpy.png') },
      { name: '티나', image: require('../assets/icon/tina.png') },
      { name: '바이올렛', image: require('../assets/icon/violet.png' )},
      { name: '볼프강', image: require('../assets/icon/wolf.png') },
      { name: '루나', image: require('../assets/icon/runa.png') },
      { name: '소마', image: require('../assets/icon/soma.png') },
      { name: '파이', image: require('../assets/icon/bai.png') },
      { name: '세트', image: require('../assets/icon/set.png') },
      { name: '김철수', image: require('../assets/icon/chulsu.png') },
      { name: '미래', image: require('../assets/icon/mirae.png') },
      { name: '은하', image: require('../assets/icon/eunha.png') },
      { name: '루시', image: require('../assets/icon/lucy.png') },
      { name: '애리', image: require('../assets/icon/aeri.png') },
      // 다른 캐릭터 정보도 추가
      ]
    }
  },
  mounted () {
    this.$axios.post('/', { accountName : "HETX"} )
        .then(response => {
            this.$emit('data-received', response.data);
            this.data = response.data;
            this.$axios.post('/db', { name : this.data[0]?.nickname })
                .then(response => {
                    this.$emit('char-info', response.data)
                })
                .catch(error => {throw error})
        })
        .catch(error => {
            throw error
        })
  },
  methods: {
    onMouseDown() {
      this.activeDrag = true;
    },
    onMouseMove(drag) {
      if (!this.activeDrag) return;
      this.$refs.tabMenu.scrollLeft -= drag.movementX;
      this.$refs.tabMenu.classList.add('dragging');
    },
    onMouseUp() {
      this.activeDrag = false;
      this.$refs.tabMenu.classList.remove('dragging');
    },
    activeTab(char, index) {
        if (this.activeTabIndex !== index) {
            this.activeTabIndex = index;
            this.$axios.post('/db', { name : char.nickname })
            .then(response => {
                this.$emit('char-info', response.data)
            })
            .catch(error => {throw error})
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

section{
    position: relative;
    margin: 0 80px;
    transition: .5s ease;
}

.main-container{
    position: relative;
}

.tab-nav-bar{
    position: relative;
    margin: 65px 10px 40px 10px;
}

.tab-navigation{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: fit-content;
    margin: 0 auto;
}

.tab-menu{
    color: white;
    list-style: none;
    background: #434354;
    max-width: 800px;
    padding: 10px;
    white-space: nowrap;
    border-bottom: 1px solid #434354;
    border-radius: 50px;
    box-shadow: 0 5px 25px rgba(2, 2, 2, .1);
    overflow-x: auto;
    user-select: none;
    scroll-behavior: smooth;
}

.tab-menu.dragging{
    scroll-behavior: unset;
    cursor: grab;
}

.tab-menu::-webkit-scrollbar{
    display: none;
}

.tab-btn{
    color: white;
    display: inline-block;
    font-size: 1em;
    font-weight: 400;
    margin: 0 2px;
    padding: 10px 20px;
    border-radius: 30px;
    /* background: #5b85ff; */
    cursor: pointer;
    user-select: none;
    transition: .3s ease;
}

.tab-menu.dragging .tab-btn{
    pointer-events: none;
}

.tab-btn:hover{
    background: #2e2e41;
}

.tab-btn.active{
    background: #5b85ff;
}


.left-btn, .right-btn{
    position: absolute;
    color: white;
    font-size: 1.8em;
    padding: 10px;
    cursor: pointer;
}

.left-btn{
    left: 0;
    background: linear-gradient(to left, transparent, #2e2e41 80%);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
}
.right-btn{
    right: 0;
    background: linear-gradient(to right, transparent, #2e2e41 80%);
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
}


.content {
    position: absolute;
    top: 55px;
    background: white;
    color: black;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    transition: .5s;
    white-space: nowrap;
}


.hide {
  opacity: 0;
}
</style>
