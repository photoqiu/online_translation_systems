<style lang="less" scoped>
    .showResults {
        height: 50px;
        line-height: 50px;
        padding: 0;
        margin: 0;
    }
</style>
<template>
  <div class="block">
    <el-slider
      v-model="value8"
      @change="handleChange"
      :min="300"
      :max="1500">
    </el-slider>
    <div class="showResults">
        <span>单词数量：</span>
        <el-input-number v-model="value8" controls-position="right" @change="handleChange" :min="300" :max="1500"></el-input-number>
    </div>
  </div>
</template>

<script type="text/babel">

  export default {
    name: "ServiceSetTextBar",
    data() {
      return {
        value8: 300
      }
    },
    methods: {
        handleChange(value) {
            this.$emit("wordNumbers", value)
        }
    }
  }
</script>