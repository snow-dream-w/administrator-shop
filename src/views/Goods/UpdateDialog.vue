<template>
  <el-dialog title="编辑商品" :visible.sync="dialogVisible" :before-close="closeDialog" width="625px">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="80px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input
          v-model="ruleForm.name"
          maxlength="50"
          show-word-limit
          placeholder="请输入内容"
          style="width:500px"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="types">
        <el-cascader
          v-model="type"
          :options="options"
          :props="{ expandTrigger: 'hover' }"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2}"
          placeholder="请输入内容"
          v-model="ruleForm.description"
          maxlength="300"
          show-word-limit
          style="width:500px"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model.Number="ruleForm.price" placeholder="请输入数字，保留两位小数" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="specification">
        <el-input
          v-model="ruleForm.specification"
          placeholder="请输入规格"
          maxlength="100"
          show-word-limit
          style="width:400px"
        ></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="inventoryNum">
        <el-input v-model.Number="ruleForm.inventoryNum" placeholder="请输入库存" style="width:200px"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input
          v-model="ruleForm.unit"
          placeholder="请输入单位"
          minlength="1"
          maxlength="2"
          show-word-limit
          style="width:150px"
        ></el-input>
      </el-form-item>
      <el-form-item label="上传图片限制十张">
        <!-- :action="axios.defaults.baseURL + '/goods/upload_goods_image'" -->
        <el-upload
          ref="imagefile"
          :action="axios.defaults.baseURL + '/goods/upload_goods_image'"
          list-type="picture-card"
          :limit="10"
          :on-exceed="handleExceed"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleImageSuccess"
          :file-list="imagesList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisibleImage" size="tiny" class="avatar">
          <img width="100%" :src="dialogImageUrl" class="avatar" />
        </el-dialog>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </div>
  </el-dialog>
</template>

<script>
import options from "@/assets/menu";
export default {
  props: {
    ruleForm: {
      type: Object,
      default: () => ({})
    },
    type: {
      type: Array,
      default: () => ([])
    },
    imagesList: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    const checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("名称不能为空"));
      }
      setTimeout(() => {
        if (value.length > 50) {
          callback(new Error("名称不能超过五十字"));
        } else {
          callback();
        }
      }, 500);
    };
    const checkPrice = (rule, value, callback) => {
      value = new String(value);
      if (!value) {
        return callback(new Error("价格不能为空"));
      }
      setTimeout(() => {
        if (!value.match(/^\d+\.{0,1}?[0-9]{0,2}$/)) {
          callback(new Error("请输入数字，保留两位小数"));
        } else {
          callback();
        }
      }, 500);
    };
    const checkInventoryNum = (rule, value, callback) => {
      value = new String(value);
      if (!value) {
        return callback(new Error("库存不能为空"));
      }
      setTimeout(() => {
        if (!value.match(/^\d+$/)) {
          callback(new Error("请输入整数"));
        } else {
          callback();
        }
      }, 500);
    };
    return {
      dialogVisible: false,
      dialogVisibleImage: false,
      dialogImageUrl: "",
      rules: {
        name: [{ validator: checkName, required: true, trigger: "blur" }],
        price: [{ validator: checkPrice, required: true, trigger: "blur" }],
        unit: [{ required: true, message: "单位不能为空", trigger: "blur" }],
        inventoryNum: [
          { validator: checkInventoryNum, required: true, trigger: "blur" }
        ],
        types: [{ required: true, message: "请选择类型", trigger: "blur" }]
      },
      options: options
    };
  },
  methods: {
    /**
     * 初始化商品信息
     */
    init() {
      this.dialogVisible = true;
    },
    /**
     * 关闭窗口之前的回调
     */
    closeDialog() {
      const type = this.$route.params.type;
      this.$emit('init', type)
      this.dialogVisible = false
    },
    /**
     * 移除图片
     */
    handleRemove(file, fileList) {
      this.axios
        .post("/goods/dropImage", {
          filename: file.response ? file.response.data : file.name
        })
        .then(result => {
          this.ruleForm.images.splice(
            this.ruleForm.images.indexOf(
              file.response ? file.response.data : file.name
            ),
            1
          );
        });
    },
    /**
     * 显示图片
     */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImage = true;
    },
    /**
     * 监听图片数量
     */
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 10 个图片，本次选择了 ${files.length} 个文件，共选择了 ${fileList.length} 个文件`
      );
    },
    /**
     * 响应上传成功
     */
    handleImageSuccess(res, file) {
      this.ruleForm.images.push(res.data);
    },
    /**
     * 响应类型改变
     */
    handleChange(value) {
      this.ruleForm.types = value[0];
      this.ruleForm.type = value[1];
    },
    /**
     * 提交信息
     */
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios.put("/goods/update", this.ruleForm).then(result => {
            if (result.data.status === 1) {
              this.$message({
                type: "success",
                message: "修改商品成功"
              });
              const type = this.$route.params.type;
              this.$emit('init', type)
              this.dialogVisible = false;
            } else {
              this.$message({
                type: "warning",
                message: result.data.data
              });
            }
          });
        } else {
          this.$message.error("error submit!!");
          return false;
        }
      });
    },
    /**
     * 重置信息
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
</style>
          