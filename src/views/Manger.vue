<template>
  <div class="container">
    <div class="header">
      <div class="title">后台管理</div>
    </div>
    <div class="body clearfix">
      <menu-sidebar />
      <router-view />
    </div>
  </div>
</template>

<script>
import MenuSidebar from '@/components/MenuSidebar'
export default {
  components: {
    MenuSidebar
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    height: 96px;
    background: #66adff;
    border: 1px solid #ddd;
    .title {
      font-size: 28px;
      text-align: center;
      line-height: 96px;
    }
  }
  .body {
    display: flex;
    width: 100%;
    margin: 1px;
    .tac {
      width: 238px;
    }
  }
}
</style>