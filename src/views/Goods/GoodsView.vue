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
      <el-table-column label="单价" width="140" align="center">
        <template slot-scope="scope">￥{{ scope.row.price.toFixed(2) }}</template>
      </el-table-column>
      <el-table-column prop="inventoryNum" label="库存" width="140" align="center"></el-table-column>
      <el-table-column prop="unit" label="单位" width="120" align="center"></el-table-column>
      <el-table-column label="操作" width="182" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 1"
            size="mini"
            type="primary"
            @click="editGoodsInfo(scope.row)"
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
            @click="confirmAddGoods(scope.row._id)"
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
    <UpdateDialog
      ref="update"
      @init="init"
      :ruleForm="goodsInfo"
      :type="type"
      :imagesList="imagesList"
    />
  </div>
</template>
<script>
import GoodsSearch from "@/components/GoodsSearch";
import UpdateDialog from "./UpdateDialog";
export default {
  data() {
    return {
      tableData: [],
      controllerStatus: false,
      limit: 100,
      goodsInfo: {},
      type: [],
      imagesList: []
    };
  },
  methods: {
    /**
     * 确认删除商品
     */
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
    /**
     * 删除商品
     */
    handleDelete(_id) {
      this.axios
        .put("/goods/delete_add", {
          _id: _id,
          status: 2
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
    /**
     * 确认下架商品
     */
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
    /**
     * 下架商品
     */
    shelfGoodsInfo(_id) {
      this.axios
        .put("/goods/shelves", {
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
    /**
     * 确认重新上架
     */
    confirmAddGoods(_id) {
      this.$confirm("此操作重新上架该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addGoodsInfo(_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    /**
     * 上架商品
     */
    addGoodsInfo(_id) {
      this.axios
        .put("/goods/delete_add", {
          _id: _id,
          status: 1
        })
        .then(result => {
          if (result.data.status === 1) {
            for (let index = 0; index < this.tableData.length; index++) {
              if (this.tableData[index]._id === _id) {
                this.tableData.splice(index, 1);
                this.$message({
                  message: "重新上架成功",
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
    /**
     * 获取下架商品
     */
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
    /**
     * 打开编辑窗口
     */
    editGoodsInfo(goodsInfo) {
      this.goodsInfo = goodsInfo;
      const type = [];
      type.push(goodsInfo.types);
      type.push(goodsInfo.type);
      this.type = type;
      this.imagesList = this.goodsInfo.images.reduce((result, value) => {
        const obj = {
          name: value,
          url: this.axios.defaults.baseURL + value
        };
        result.push(obj);
        return result;
      }, []);
      this.$refs.update.init();
    },
    /**
     * 初始化商品数据
     */
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
    /**
     * 监听路由变化
     */
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
    GoodsSearch,
    UpdateDialog
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


