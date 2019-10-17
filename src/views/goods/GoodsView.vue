<template>
  <div>
    <div class="nav">
        <div class="l">
          <div class="nav-search">
            <input type="text" placeholder="请输入要搜索的商品名称" class="searchInput" />
            <button class="searchBtn">搜索</button>
          </div>
        </div>
      </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      align="center"
    >
      <el-table-column label="图片" width="120" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="140" align="center"></el-table-column>
      <el-table-column prop="describe" label="描述" width="180" align="center"></el-table-column>
      <el-table-column prop="price" label="单价" width="140" align="center"></el-table-column>
      <el-table-column prop="count" label="库存" width="140" align="center"></el-table-column>
      <el-table-column prop="unit" label="单位" width="140" align="center"></el-table-column>

      <el-table-column label="操作" width="162" align="center">
        <template slot-scope="scope">
          <router-link to="/manger/goodsInfo">
            <el-button size="mini" type="text">编辑</el-button>
          </router-link>

          <br />
          <el-button size="mini" type="text" @click="dialogVisible = true">下架</el-button>

          <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" >
            <span>确定要下架吗？</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
          <br />

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            plain
            disabled
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          describe: "aaa",
          price: 15.2,
          count: 100,
          unit: "斤"
        },
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          describe: "aaa",
          price: 15.2,
          count: 100,
          unit: "斤"
        },
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          describe: "aaa",
          price: 15.2,
          count: 100,
          unit: "斤"
        },
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          describe: "aaa",
          price: 15.2,
          count: 100,
          unit: "斤"
        },
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          describe: "aaa",
          price: 15.2,
          count: 100,
          unit: "斤"
        }
      ],
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

    handleDelete(index, row) {
      console.log(index, row);
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>

    .nav {
      width: 100%;
      height: 50px;
      .l {
        width: 45%;
        height: 50px;
        float: right;
      }
      .nav-search {
        width: 384px;
        height: 45px;
        line-height: 38px;
        border: 2px solid #66a3ff;

        .searchInput {
          width: 300px;
          height: 42px;
          font-size: 14px;
          padding: 8px;
          border: 2px solid #66a3ff;
        }
        .searchBtn {
          width: 80px;
          height: 42px;
          font-size: 16px;
          color: #fff;
          border: 2px solid #66a3ff;
          background: #66a3ff;
        }
      }
    }
</style>


