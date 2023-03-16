<template>
    <div class="center">
        <div class="ring"></div>
    </div>
</template>

<script></script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.ring{
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    animation: ring 2s linear infinite;
}

@keyframes ring {
    0%{
        transform: rotate(0deg);
        box-shadow: 1px 5px 2px #e65c00;
    }
    33%{
        transform: rotate(120deg);
        box-shadow: 1px 5px 2px #18b201;
    }
    67%{
        transform: rotate(240deg);
        box-shadow: 1px 5px 2px #0456c8;
    }
    100%{
        transform: rotate(360deg);
        box-shadow: 1px 5px 2px #e65c00;
    }

}

.ring:before{
    position: absolute;
    content: '';
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(255, 255, 255, .3);
}
</style>