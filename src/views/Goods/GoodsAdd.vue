<template>
  <div>
    <div class="content">
      <h2>上架商品</h2>
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
        <el-form-item label="上传图片限制四张">
          <el-upload
            ref="imagefile"
            :action="staticBaseUrl + '/goods/upload_goods_image'"
            list-type="picture-card"
            :limit="4"
            :on-exceed="handleExceed"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleImageSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisibleImage" size="tiny" class="avatar">
            <img width="100%" :src="staticBaseUrl + dialogImageUrl" class="avatar" />
          </el-dialog>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
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
      dialogVisibleImage: false,
      dialogImageUrl: "",
      ruleForm: {
        name: "",
        description: "",
        price: "",
        specification: "",
        unit: "",
        inventoryNum: "",
        types: "",
        type: "",
        images: []
      },
      rules: {
        name: [{ validator: checkName, required: true, trigger: "blur" }],
        price: [{ validator: checkPrice, required: true, trigger: "blur" }],
        unit: [{ required: true, message: "单位不能为空", trigger: "blur" }],
        inventoryNum: [
          { validator: checkInventoryNum, required: true, trigger: "blur" }
        ],
        types: [{ required: true, message: "请选择类型", trigger: "blur" }]
      },
      type: [],
      options: [
        {
          value: "pinzhishengxian",
          label: "品质生鲜",
          children: [
            {
              value: "shuiguo",
              label: "水果"
            },
            {
              value: "shuicai",
              label: "蔬菜"
            }
          ]
        },
        {
          value: "meizhuanghuli",
          label: "美妆护理",
          children: [
            {
              value: "caizhuangxiangshui",
              label: "彩妆香水"
            },
            {
              value: "mianmoyanghu",
              label: "面膜养护"
            },
            {
              value: "gerenqingjie",
              label: "个人清洁"
            }
          ]
        },
        {
          value: "jingzhishenghuo",
          label: "精致生活",
          children: [
            {
              value: "jiajujiadian",
              label: "家具家电"
            },
            {
              value: "yundonghuwai",
              label: "运动户外"
            },
            {
              value: "xiefuxiangbao",
              label: "鞋服箱包"
            }
          ]
        },
        {
          value: "chajiuyinliao",
          label: "茶酒饮料",
          children: [
            {
              value: "putaojiu",
              label: "葡萄酒"
            },
            {
              value: "baijiu",
              label: "白酒"
            },
            {
              value: "pijiu",
              label: "啤酒"
            },
            {
              value: "guozhiyinliao",
              label: "果汁饮料"
            }
          ]
        },
        {
          value: "nongditechan",
          label: "农地特产",
          children: [
            {
              value: "wuguzaliang",
              label: "五谷杂粮"
            },
            {
              value: "shanzhenganhuo",
              label: "山珍干货"
            },
            {
              value: "liangyoufushi",
              label: "粮油副食"
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.axios
        .post("/goods/dropImage", { filename: file.response.data })
        .then(result => {
          console.log(result);
        });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleImage = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 4 个图片，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleImageSuccess(res, file) {
      this.ruleForm.images.push(res.data);
    },
    handleChange(value) {
      this.ruleForm.types = value[0];
      this.ruleForm.type = value[1];
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.price = new Number(this.ruleForm.price);
          this.ruleForm.inventoryNum = new Number(this.ruleForm.inventoryNum);
          this.axios.post("/goods/add", this.ruleForm).then(result => {
            if(result.data.status === 1){
              this.$message({
                type: 'success',
                message: '添加商品成功'
              })
              this.$refs.ruleForm.resetFields()
              this.$refs.imagefile.clearFiles()
            } else {
              this.$message({
                type: 'warning',
                message: result.data.data
              })
            }
          });
        } else {
          this.$message.error("error submit!!")
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss">
.content {
  margin: 20px 0 0 50px;
}
</style>
          