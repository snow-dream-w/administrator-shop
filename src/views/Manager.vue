<template>
  <div class="container">
    <div class="header">
      <div class="title">二号小店后台管理</div>
      <div class="login">
        <span v-if="$store.state.login_status" class="logout" @click="logout">注销</span>
        <span v-else class="logout" @click="$router.push('/login')">登录</span>
        <el-avatar class="avatar" :size="60" src="https://empty" @error="errorHandler">
          <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </el-avatar>
      </div>
    </div>
    <div class="body clearfix">
      <menu-sidebar />
      <router-view />
    </div>
  </div>
</template>

<script>
import MenuSidebar from "@/components/MenuSidebar";
export default {
  components: {
    MenuSidebar
  },
  methods: {
    errorHandler() {
      return false;
    },
    logout() {
      this.axios.get("/user/logout").then(result => {
        if (result.data.status === 1) {
          this.$store.dispatch("changeAnsyc_login_status", false);
          this.$router.push("/login");
        } else {
          this.$message.error(result.data.data);
        }
      });
    }
  },
  created() {
    this.axios.get("/user/check_login").then(result => {
      if (result.data.status === 1) {
        this.$store.dispatch("changeAnsyc_login_status", true);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .header {
    position: relative;
    width: 100%;
    height: 96px;
    background: #409EFF;
    border: 1px solid #ddd;
    .title {
      font-size: 28px;
      text-align: center;
      line-height: 96px;
    }
    .login {
      position: absolute;
      top: 0;
      right: 15px;
      float: right;
      .logout {
        display: inline-block;
        position: absolute;
        left: -40px;
        top: 42px;
        font-size: 14px;
        cursor: pointer;
      }
      .avatar {
        margin-top: 20px;
      }
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