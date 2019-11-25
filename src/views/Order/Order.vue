<template>
  <el-table :data="tableData" border style="width: 938px">
    <el-table-column label="商品" width="586" align="center">
      <template slot-scope="scope">
        <el-table :data="scope.row.goods" border style="width: 100%">
          <el-table-column width="108">
            <template slot-scope="scope">
              <img :src="staticBaseUrl + scope.row.image" style="width: 80px;height: 80px;" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="name" width="186" align="center"></el-table-column>
          <el-table-column label="单价" prop="price" width="90" align="center"></el-table-column>
          <el-table-column label="数量" prop="num" width="90" align="center"></el-table-column>
          <el-table-column label="单位" prop="danwei" width="90" align="center"></el-table-column>
        </el-table>
      </template>
    </el-table-column>
    <el-table-column prop="money" label="实付款" width="100" align="center"></el-table-column>
    <el-table-column prop="status" label="订单状态" width="120" align="center"></el-table-column>
    <el-table-column label="操作" width="140" align="center">
      <template slot-scope="scope">
        <el-button
          @click="handleClick(scope.row)"
          type="text"
          size="small"
        >&emsp;&nbsp;&nbsp;&nbsp;订单详情</el-button>
        <el-button type="primary" size="small">确认发货</el-button>
        <el-button type="text" size="small">&emsp;取消订单</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 1,
          goods: [
            {
              id: 1,
              image: require("@/assets/logo.png"),
              name: "紫薯",
              price: "12.09",
              num: "3",
              danwei: "斤"
            }
          ],
          money: "36",
          status: "待发货"
        },
        {
          id: 1,
          goods: [
            {
              id: 1,
              image: require("@/assets/logo.png"),
              name: "紫薯",
              price: "12.09",
              num: "3",
              danwei: "斤"
            },
            {
              id: 1,
              image: require("@/assets/logo.png"),
              name: "紫薯",
              price: "12.09",
              num: "3",
              danwei: "斤"
            }
          ],
          money: "36",
          status: "已发货"
        }
      ]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(row) {
      console.log(row);
    }
  }
};
</script>