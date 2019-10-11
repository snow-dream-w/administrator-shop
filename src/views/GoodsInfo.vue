<template>
  <div>
    <el-dialog title="商品信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
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
        <el-form-item label="种类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择商品类别">
            <el-option label="品质生鲜" value="shengxian"></el-option>
            <el-option label="节气水果" value="friut"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价" :label-width="formLabelWidth">
          <el-input v-model="form.price" placeholder="请输入单价，以元为单位"></el-input>
        </el-form-item>

        <el-form-item label="规格" :label-width="formLabelWidth">
          <el-input v-model="form.guige" clearable></el-input>
        </el-form-item>

        <el-form-item label="单位" :label-width="formLabelWidth">
          <el-input v-model="form.unit" clearable></el-input>
        </el-form-item>

        <el-form-item label="折扣" :label-width="formLabelWidth">
          <el-input v-model="form.discount" clearable></el-input>
        </el-form-item>

        <el-form-item label="库存" :label-width="formLabelWidth">
          <el-input v-model="form.num" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
        <el-button @click="dialogFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: [
        {
          name: "",
          describe: "",
          img: "",
          region: "",
          price: "",
          guige: "",
          unit: "",
          discount: "",
          num: ""
        }
      ],
      dialogFormVisible: true,
      formLabelWidth: "120px",
      dialogImageUrl: "",
      dialogVisible: false
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
          