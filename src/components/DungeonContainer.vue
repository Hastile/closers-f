<template>
    <div class="wrapper">
      <div class="container">
        <label class="option_item" v-for="(char, index) in dungeon" :key="index" :for="'dungeon-' + (index+1)">
          <input type="checkbox" :name="char.name" :id="'dungeon-' + (index+1)" class="checkbox" @click="Did(char.name)" :disabled="([3, 4, 8, 9, 14, 15, 16].includes(index) && info.story < 1) || ([5, 17].includes(index) && info.story < 2) || ([6, 7].includes(index) && info.story < 3) || ([10, 11].includes(index) && info.story < 4)  || (index == 18 && info.raid < 1)  || (index == 19 && info.raid < 2) || (index == 20 && ((info.promotion < 2 && info.level < 83) || info.promotion > 1)) || (index == 21 && ((info.promotion < 3 && info.level < 90) || info.promotion > 2))">
          <div class="option_inner">
            <div class="tickmark">
                <img :src="char.image" alt=""
                :class="{
                    icon: true,
                    disabled: ([3, 4, 8, 9, 14, 15, 16].includes(index) && info.story < 1) || ([5, 17].includes(index) && info.story < 2) || ([6, 7].includes(index) && info.story < 3) || ([10, 11].includes(index) && info.story < 4)  || (index == 18 && info.raid < 1)  || (index == 19 && info.raid < 2) || (index == 20 && ((info.promotion < 2 && info.level < 83) || info.promotion > 1)) || (index == 21 && ((info.promotion < 3 && info.level < 90) || info.promotion > 2))  }">
                <div class="name">{{ char.name }}</div>
            </div>
          </div>
        </label>
      </div>
    </div>
  </template>

<script>
export default {
    watch: {
    info: function(newValue) {
            // info의 값이 변경되면 실행됩니다.
            const inputs = document.querySelectorAll('input[type="checkbox"]');
            inputs.forEach(input => {
            input.checked = false;
            input.disabled = false;
            });
            inputs.forEach((checkbox) => {
                checkbox.addEventListener('change', (event) => {
                    if (event.target.checked) {
                    checkbox.disabled = true;
                    }
                });
            });
            this.$axios.post('/db/check', { name : newValue.nickname })
            .then(response => {
                const data = response.data
                if (data) {
                    data.forEach(d => {
                        const index = this.dungeon.findIndex(n => n.name === d.dungeon)
                        if (index >= 0) {
                            document.getElementById(`dungeon-${index+1}`).checked = true;
                            document.getElementById(`dungeon-${index+1}`).disabled = true;
                        }
                    })
                }
            })
            .catch(error => {throw error})
            this.$axios.get('/db/check/daily')
            .then(response => {
                const data = response.data
                // console.log(data)
                data.forEach((d, index) => {
                    if (d.length > 0){
                        document.getElementById(`dungeon-${index+13}`).checked = true;
                        document.getElementById(`dungeon-${index+13}`).disabled = true;
                    }
                })
            })
            .catch(error => {throw error})
            this.$axios.post('/db/check/raid', { name : newValue.nickname })
            .then(response => {
                const { data, time } = response.data
                data.forEach((d, index) => {
                    if (d.length > 0) {
                        const filteredList = d.filter(obj => obj.time > time && obj.time < this.formatDateTime(time));
                        const hasRecordToday = filteredList.length > 0;
                        if (hasRecordToday){
                            document.getElementById(`dungeon-${index+19}`).checked = true;
                            document.getElementById(`dungeon-${index+19}`).disabled = true;
                        }
                        else
                        {switch (d.length){
                            case 1:
                            case 2:
                                document.getElementById(`dungeon-${index+19}`).checked = false;
                                document.getElementById(`dungeon-${index+19}`).disabled = false;
                                break;
                            case 3:
                                document.getElementById(`dungeon-${index+19}`).checked = true;
                                document.getElementById(`dungeon-${index+19}`).disabled = true;
                                break;
                        }}
                    }
                })
            })
            .catch(error => {throw error})
        }
    },
    props: {
        myinfo: {
            type: Object,
            default: () => ({
                story: -1,
                raid: -1,
                level : -1,
                promotion : -1
            })
        }
    },
    computed: {
        info: function() {
            return { ...this.myinfo };
        }
    },
    data () {
        return {
            dungeon : [
                { name: '결전 프로그램 : 볼프강 <오버클럭>', image: require('../assets/img/wolf.jpg') },
                { name: '결전 프로그램 : 호프만 <오버클럭>', image: require('../assets/img/hoffmann.png') },
                { name: 'IF : 누구도 맞이하지 못한 세계', image: require('../assets/img/if.png') },
                { name: '결전 프로그램 : 장미숙', image: require('../assets/img/jang.webp') },
                { name: '결전 프로그램 : 언터처블', image: require('../assets/img/untouch.webp') },
                { name: '결전 프로그램 : 오메가 나이트', image: require('../assets/img/omega.webp') },
                { name: '결전 프로그램 : 열풍 더스트 (하드)', image: require('../assets/img/dust.jpg') },
                { name: '결전 프로그램 : 어나더 루시펠 (하드)', image: require('../assets/img/ash.webp') },
                { name: '(흉몽) 맹독의 모래폭풍', image: require('../assets/img/mushussu.webp') },
                { name: '(흉몽) 위압의 모래폭풍', image: require('../assets/img/ugallu.webp' )},
                { name: '오퍼레이션 : 게이트 웨이브 (1인)', image: require('../assets/img/gw.webp') },
                { name: '오퍼레이션 : 게이트 웨이브 (파티)', image: require('../assets/img/gw4.png') },
                { name: '형상 복제자 저지 작전', image: require('../assets/img/daily.jpg') },
                { name: '무한 엘리베이터', image: require('../assets/img/kalbac.jpeg') },
                { name: '(흉몽) 고룡의 악몽 : 최심부', image: require('../assets/img/tiamat.webp') },
                { name: '(흉몽) 고룡의 감옥성', image: require('../assets/img/tiamat2.webp') },
                { name: '용의 형장', image: require('../assets/img/astaroth.jpeg') },
                { name: '그레모리 과학시설', image: require('../assets/img/gremory.webp') },
                { name: '기계왕 벨페고르', image: require('../assets/img/belphegor.webp') },
                { name: '야수왕 베히모스', image: require('../assets/img/behemoth.webp') },
                { name: '태스크포스 승급', image: require('../assets/img/taskfr.jpg') },
                { name: '결전요원 승급', image: require('../assets/img/final.jpg') },
                { name: '악몽의 미저리', image: require('../assets/img/misery.webp') },
            ]
        }
    },
    methods: {
        Did (name) {
            this.$emit('loading')
            this.$axios.post('/db/check/write', { name : this.info.nickname, dungeon: name })
            .then(() => {
                this.$emit('loaded')
            })
            .catch(error => {
                throw error
            })
        },
        formatDateTime(_date) {
            const date = new Date(_date);
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + (date.getDate() + 1)).slice(-2);
            const hours = ('0' + date.getHours()).slice(-2);
            const minutes = ('0' + date.getMinutes()).slice(-2);
            const seconds = ('0' + date.getSeconds()).slice(-2);
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
    }
}
</script>

<style>
.wrapper {
    color: white;
    margin: 0 auto;
    overflow-y: auto;
}

.container {
    display: grid;
    overflow-y: auto;
    grid-template-columns: repeat(auto-fit, minmax(100px, auto));
}

.container .option_item{
    display: block;
    position: relative;
    word-break: keep-all;
}
.icon {
  display: block;
  width: 100%;
  height: 100%;
  border: 10px solid rgba(0, 128, 0, 0);
  transition: .5s;
  box-sizing: border-box;
}

.name {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: .5s ease;
}

.option_item input[type="checkbox"]{
    display: none;
}

.option_item input[type="checkbox"]:checked + .option_inner .icon {
    border: 10px solid green;
}
.tickmark:hover .name {
    opacity: 1;
}
.tickmark:hover img, img.disabled {
    filter: brightness(.3);
}

.option_inner {
    position: relative;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

@media screen and (min-width: 320px) {

    .container{
        grid-template-columns: repeat(1, 1fr);
    }
    .container .option_item{
        width: 200px;
        height: 200px;
    }

    .icon{
        max-width: 150px;
        max-height: 150px;
    }
}

@media screen and (min-width: 375px) {

    .container{
        grid-template-columns: repeat(2, 1fr);
    }
    .container .option_item{
        width: 150px;
        height: 150px;
    }

    .icon{
        max-width: 100px;
        max-height: 100px;
    }
}

@media screen and (min-width: 425px) {

    .container{
        grid-template-columns: repeat(2, 1fr);
    }
    .container .option_item{
        width: 200px;
        height: 200px;
    }

    .icon{
        max-width: 150px;
        max-height: 150px;
    }
}

@media screen and (min-width: 768px) {

    .container{
        grid-template-columns: repeat(4, 1fr);
    }
    .container .option_item{
        width: 200px;
        height: 200px;
    }

    .icon{
        max-width: 150px;
        max-height: 150px;
    }
}

@media screen and (min-width: 1024px) {

    .container{
        grid-template-columns: repeat(5, 1fr);
    }
    .container .option_item{
        width: 200px;
        height: 200px;
    }

    .icon{
        max-width: 150px;
        max-height: 150px;
    }
}
@media screen and (min-width: 1440px) {
    .container{
        grid-template-columns: repeat(6, 1fr);
    }
    .container .option_item{
        width: 200px;
        height: 200px;
    }

    .icon{
        max-width: 150px;
        max-height: 150px;
    }
}
@media screen and (min-width: 2560px) {
    .container{
        grid-template-columns: repeat(6, 1fr);
    }
    .container .option_item{
        width: 300px;
        height: 300px;
    }

    .icon{
        max-width: 250px;
        max-height: 250px;
    }
}
</style>