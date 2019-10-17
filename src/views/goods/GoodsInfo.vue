<template>
  <div>
    <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
      <el-form
        :model="form"
        status-icon
        :rules="rules"
        ref="form"
        label-width="formLabelWidth"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="describe" :label-width="formLabelWidth">
          <el-input v-model="form.describe" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="http://localhost:3000/user/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item label="种类" prop="region" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择商品类别">
            <el-option label="品质生鲜" value="shengxian">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                  品质生鲜
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">黄金糕</el-dropdown-item>
                  <el-dropdown-item command="b">狮子头</el-dropdown-item>
                  <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-option>
            <el-option label="节气水果" value="friut"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价" prop="price" :label-width="formLabelWidth">
          <el-input v-model="form.price" placeholder="请输入单价，以元为单位"></el-input>
        </el-form-item>

        <el-form-item label="规格" prop="guige" :label-width="formLabelWidth">
          <el-input v-model="form.guige"></el-input>
        </el-form-item>

        <el-form-item label="单位" prop="unit" :label-width="formLabelWidth">
          <el-input v-model="form.unit"></el-input>
        </el-form-item>

        <el-form-item label="折扣" prop="discount" :label-width="formLabelWidth">
          <el-input v-model="form.discount"></el-input>
        </el-form-item>

        <el-form-item label="库存" prop="num" :label-width="formLabelWidth">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        describe: "",
        img: "",
        region: "",
        price: "",
        guige: "",
        unit: "",
        discount: "",
        num: ""
      },
      dialogFormVisible: true,
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 50, message: "长度在1-50个字符", trigger: blur }
        ],
        describe: [
          { required: true, message: "请输入商品描述", trigger: "blur" },
          { min: 1, max: 300, message: "长度在1-300个字符", trigger: blur }
        ],
        img: [{ required: true, message: "请上传商品图片", trigger: "blur" }],
        region: [
          { required: true, message: "请选择商品类型", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        guige: [
          { required: true, message: "请输入商品规格", trigger: "blur" },
          { min: 1, max: 300, message: "长度在1-300个字符", trigger: blur }
        ],
        unit: [
          { required: true, message: "请输入商品单位", trigger: "blur" },
          { min: 1, max: 2, message: "长度在1-2个字符", trigger: blur }
        ],
        discount: [],
        num: [{ required: true, message: "请输入商品数量", trigger: "blur" }]
      }
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleRemove(file, fileList) {
      fetch("http://localhost:3000/goods/dropImage", {
        method: "POST",
        body: JSON.stringify({ filename: file.response }),
        headers: new Headers({
          "Content-Type": "application/json"
        })
      }).then(res => {
        console.log(res);
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
     handleCommand(command) {
        this.$message('click on item ' + command);
      }
  }
};
</script>

<style lang="scss" scoped>
</style>
          