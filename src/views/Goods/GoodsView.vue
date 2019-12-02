<template>
  <div>
    <goods-search />
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
          <img :src="axios.defaults.baseURL + scope.row.images[0]" width="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="140" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" width="180" align="center"></el-table-column>
      <el-table-column prop="price" label="单价" width="140" align="center"></el-table-column>
      <el-table-column prop="inventoryNum" label="库存" width="140" align="center"></el-table-column>
      <el-table-column prop="unit" label="单位" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="182" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 1"
            size="mini"
            type="primary"
            @click="$message.error('编辑，暂不可用')"
          >编辑</el-button>
          <el-button
            v-if="scope.row.status === 1"
            size="mini"
            type="danger"
            @click="confirmShelfGoods(scope.row._id)"
          >下架</el-button>
          <el-button
            v-if="scope.row.status === 0"
            size="mini"
            type="primary"
            @click="$message.error('重新上架，暂不可用')"
          >重新上架</el-button>
          <el-button
            v-if="scope.row.status === 0"
            size="mini"
            type="danger"
            @click="confirmDeleteGoods(scope.row._id)"
            plain
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import GoodsSearch from "@/components/GoodsSearch";
export default {
  data() {
    return {
      tableData: [],
      controllerStatus: false,
      limit: 100
    };
  },
  methods: {
    confirmDeleteGoods(_id) {
      this.$confirm("此操作永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete(_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDelete(_id) {
      this.axios
        .post("/goods/delete", {
          _id: _id
        })
        .then(result => {
          if (result.data.status === 1) {
            for (let index = 0; index < this.tableData.length; index++) {
              if (this.tableData[index]._id === _id) {
                this.tableData.splice(index, 1);
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                break;
              }
            }
          } else {
            this.$message.error("删除失败，请重新尝试");
          }
        });
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
      this.axios
        .post("/goods/shelves", {
          _id: _id
        })
        .then(result => {
          if (result.data.status === 1) {
            for (let index = 0; index < this.tableData.length; index++) {
              if (this.tableData[index]._id === _id) {
                this.tableData.splice(index, 1);
                this.$message({
                  message: "下架成功",
                  type: "success"
                });
                break;
              }
            }
          } else {
            this.$message.error(result.data.data);
          }
        });
    },
    getShelfGoods(status) {
      this.axios.get(`/goods/shelf/${status}`).then(result => {
        if (result.data.status === 1) {
          this.tableData = result.data.data;
        } else {
          this.$message.error("数据加载失败，请重新尝试");
          this.tableData = [];
        }
      });
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
            this.$message.error("数据加载失败，请重新尝试");
            this.tableData = [];
          }
        });
    }
  },
  watch: {
    "$route.path": function() {
      const type = this.$route.params.type;
      if (type === "shelf") {
        // 此时的0为状态码，与后端约定0为已下架
        this.getShelfGoods(0);
      } else {
        this.init(type);
      }
    }
  },
  components: {
    GoodsSearch
  },
  created() {
    const type = this.$route.params.type;
    if (type === "shelf") {
      // 此时的0为状态码，与后端约定0为已下架
      this.getShelfGoods(0);
    } else {
      this.init(type);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


