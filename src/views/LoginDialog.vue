<template>
  <div>
    <el-dialog class="dialog" title="管理员登录" :visible="!$store.state.login_status" width="410px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            type="password"
            v-model="ruleForm.name"
            autocomplete="off"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            v-on:input="changeValue"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-on:input="changeValue"
          ></el-input>
        </el-form-item>
        <span class="warning">{{point}}</span>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      point: "",
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "change" }],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },
  methods: {
    /**
     * 监听表单变化
     */
    changeValue() {
      this.point = "";
    },
    /**
     * 提交数据
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/user/login", {
              telephone: this.ruleForm.name,
              password: this.ruleForm.password
            })
            .then(res => {
              if (res.data.status === 0) {
                this.point = res.data.data;
              } else {
                console.log(res.data.data)
                if (res.data.data.role !== "666") {
                  this.axios.get("/user/logout");
                  this.point = "账号或密码输入错误";
                } else {
                  this.$store.dispatch("changeAnsyc_login_status", true);
                  this.$refs.ruleForm.resetFields();
                  this.$router.push("/manager");
                }
              }
            });
        } else {
          return false;
        }
      });
    },
    /**
     * 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.axios.get("/user/check_login").then(result => {
      if (result.data.status === 1) {
        this.$router.push("/");
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.dialog{
  height: 400px;
}
.demo-ruleForm {
  width: 85%;
}
.warning {
  display: inline-block;
  color: red;
  text-indent: 2em;
}
</style>