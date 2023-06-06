<template>
  <div class="image-wrapper">
    <div class="image-picker" v-for="(p, k) in imgList" :key="k">
      <el-image  class="image-box" fit="cover" :src="require('@/assets/image/banner-1.jpg')"></el-image>
      <div class="right-box">
        <el-input v-model="link" @change="handleInput($event, k)" placeholder="跳转链接，非必填" />
        <div class="button-box">
          <el-upload
              style="width: 100%"
              action="23424"
              :limit="1"
              @change="handleFile($event, k)"
          >
            <el-button type="primary">选择</el-button>
          </el-upload>
          <el-button type="danger" @click="handleDelete(k)" v-if="k !== 0" style="margin-left: 10px">删除</el-button>
<!--          <trash-can-outline :size="24" fill-color="#409EFC" />-->
        </div>
      </div>
    </div>
    <el-button type="primary" @click="handleAdd" plain>添加图片</el-button>
  </div>
</template>

<script lang="ts" setup generic="ModelValue = unknown">
import {reactive, ref, watch} from 'vue';
import { ElMessage} from "element-plus";
// import TrashCanOutline from 'vue-material-design-icons/TrashCanOutline.vue'
// import FileImageRemoveOutline from 'vue-material-design-icons/FileImageRemoveOutline.vue'

let modelValue = defineModel<ModelValue>();
const link = ref('');
const imgList = reactive([ { url: '', imageSrc: require('@/assets/image/banner-1.jpg') }]);

watch(imgList, (value, newValue) => {
  modelValue.value = newValue.map(p => p);
});

function handleInput(value, k) {
  imgList[k] = { ...imgList[k], url: value };
}

function handleFile(file, key) {
  const f = file.raw;
  const filereader = new FileReader();
  filereader.onload = (event) => {
    const size = Math.round(file.size / 1024);
    if (size > 300) {
      ElMessage.error('请上传小于300KB的图片');
    } else {
       const srcpath = event.target.result;
       imgList.splice(key, 1, { url: link.value, imageSrc: srcpath });
    }
  };
  filereader.readAsDataURL(f);
}

function handleAdd() {
  imgList.push({ url: link.value, imageSrc: require('@/assets/image/banner-1.jpg') });
}

function handleDelete(k) {
  imgList.splice(k, 1);
}

</script>

<style lang="less" scoped>
.image-wrapper {
  .image-picker {
    position: relative;
    display: flex;
    flex-direction: row;
    height: 80px;
    margin-bottom: 10px;

    .image-box {
      width: 40%;
      margin-right: 10px;
    }

    .right-box {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;

      ::v-deep .el-upload-list {
        margin: 0;
      }

      .button-box {
        display: flex;
        align-items: center;
      }
    }

    .close-icon {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

</style>
