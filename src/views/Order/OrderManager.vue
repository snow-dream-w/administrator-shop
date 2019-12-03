<template>
  <el-table :data="tableData" border style="width: 938px;">
    <el-table-column label="商品" width="540" align="center">
      <template slot-scope="scope">
        <el-table :data="scope.row.goodsInfo" border style="width: 100%">
          <el-table-column width="120">
            <template slot-scope="scope">
              <img
                :src="axios.defaults.baseURL + scope.row.goodsId.images[0]"
                style="width: 80px;height: 80px;"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="goodsId.name" width="146" align="center"></el-table-column>
          <el-table-column label="单价" width="90" align="center">
            <template slot-scope="scope">￥{{scope.row.goodsId.price.toFixed(2)}}</template>
          </el-table-column>
          <el-table-column label="数量" prop="num" width="80" align="center"></el-table-column>
          <el-table-column label="单位" prop="goodsId.unit" width="82" align="center"></el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label="订单编号" prop="_id" width="120" align="center"></el-table-column>
    <el-table-column label="实付款" width="110" align="center">
      <template slot-scope="scope">￥{{scope.row.total.toFixed(2)}}</template>
    </el-table-column>
    <el-table-column label="订单状态" width="110" align="center">
      <template slot-scope="scope">{{ statusEnum[scope.row.status] }}</template>
    </el-table-column>
    <el-table-column label="操作" width="144" align="center">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="handleClick(scope.row)">订单详情</el-button>
        <el-button
          v-if="scope.row.status === 2"
          type="primary"
          size="small"
          @click="confirmSendGoods(scope.row._id)"
        >确认发货</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      statusEnum: ["已取消", "", "待发货", "已发货", "已完成"]
    };
  },
  watch: {
    "$route.path"() {
      const orderStatus = this.$route.params.orderStatus;
      this.init(orderStatus);
    }
  },
  methods: {
    handleClick(row) {
      this.$message.error("订单详情，暂不可用！");
      // console.log(row);
    },
    confirmSendGoods(_id) {
      this.$confirm(`订单${_id}确认发货, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.sendGoods(_id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    sendGoods(orderId) {
      this.axios
        .put(`/order/sending`, {
          orderId
        })
        .then(result => {
          if (result.data.status === 1) {
            for(let index of this.tableData.keys()){
              if (this.tableData[index]._id === orderId){
                this.tableData.splice(index, 1)
                break;
              }
            }
            this.$message({
              type: 'success',
              message: '发货成功！'
            })
          } else {
            this.$message.error("未知错误，请刷新重试");
          }
        });
    },
    init(orderStatus) {
      this.axios.get(`/order/orderList/${orderStatus}`).then(result => {
        if (result.data.status === 1) {
          this.tableData = result.data.data;
        } else {
          this.$message.error("未知错误，请刷新重试");
        }
      });
    }
  },
  created() {
    const orderStatus = this.$route.params.orderStatus;
    this.init(orderStatus);
  }
};
</script>