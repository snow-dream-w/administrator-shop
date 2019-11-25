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
          <img :src="staticBaseUrl + scope.row.images[0]" width="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="140" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" width="180" align="center"></el-table-column>
      <el-table-column prop="price" label="单价" width="140" align="center"></el-table-column>
      <el-table-column prop="inventoryNum" label="库存" width="140" align="center"></el-table-column>
      <el-table-column prop="unit" label="单位" width="140" align="center"></el-table-column>
      <el-table-column label="操作" width="162" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text">编辑</el-button>
          <br />
          <el-button size="mini" type="text" @click="confirmShelfGoods(scope.row._id)">下架</el-button>
          <br />
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
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
      tableData: [],
      controllerStatus: false,
      limit: 100
    };
  },
  methods: {
    handleDelete(goodsId) {
      // alert(goodsId)
    },
    confirmShelfGoods(_id) {
      this.$confirm("此操作将下架该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.shelfGoodsInfo(_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    shelfGoodsInfo(_id) {
      alert(_id)
      // this.axios
      //   .post("/goods/shelves", {
      //     _id: _id
      //   })
      //   .then(result => {
      //     if (result.data.status === 1) {
      //       for (let index = 0; index < this.tableData.length; index++) {
      //         if (this.tableData[index]._id === _id) {
      //           this.tableData.splice(index, 1);
      //           this.$message({
      //             message: "下架成功",
      //             type: "success"
      //           });
      //           break;
      //         }
      //       }
      //     } else {
      //       alert("404");
      //     }
      //   });
    },
    init(type) {
      this.axios
        .get("/goods/query", {
          params: {
            type,
            limit: this.limit,
            status: 1
          }
        })
        .then(result => {
          if (result.data.status === 1) {
            this.tableData = result.data.data;
            // this.total = result.data.count;
          } else {
            alert(404);
          }
        });
    }
  },
  watch: {
    "$route.path": function() {
      const type = this.$route.params.type;
      this.init(type);
    }
  },
  created() {
    const type = this.$route.params.type;
    this.init(type);
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


