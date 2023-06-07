<template>
  <div class="swiper-box">
    <el-carousel :type="type" height="225px" indicator-position="none"  ref="carousel">
      <el-carousel-item v-for="item in itemList"  class="swiper-item" :key="item.url">
        <img :src="item.imageSrc" style="width: 100%" alt="default" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>
import {ElCarousel, ElCarouselItem} from "element-plus";
defineProps<{
  itemList?: {
    url: string,
    imageSrc: string | ArrayBuffer
  }[],
  type: string
}>()
</script>

<style lang="less" scoped>
.swiper-box {

  .swiper-item {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d3dce6;
  }
}
</style>
