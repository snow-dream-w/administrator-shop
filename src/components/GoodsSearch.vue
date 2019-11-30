<template>
  <div class="nav">
    <div class="right">
      <el-input class="search" placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyWords"></el-input>
      <el-button type="primary">查找</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        keyWords: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  padding: 10px 0px;
  height: 60px;
  .right {
    float: right;
    width: 370px;
    .search {
      width: 300px;
    }
  }
}
</style>