<template>
  <div class="order">
    <div class="title">订单详情</div>
    <div class="content">
      <div class="left">
        <div class="address">
          <span>收货信息：</span><br>
          <span class="telephone">手机号：{{data.addresses.telephone}}</span>
          <br />
          <span class="name">姓名：{{data.addresses.name}}</span>
          <br />
          <span class="addressArea">详细地址：{{data.addresses.address.area}}</span>
          <span class="addressDetail">{{data.addresses.address.details}}</span>
        </div>
        <div class="pay">
          <span>订单金额：</span>
          <span class="moeny" style="color:red;">￥{{data.orders.total}}</span>
          <br />
          <span>订单编号：</span>
          <span class="orderId">{{data.orders.orderId}}</span>
          <br />
          <span>下单时间：</span>
          <span class="payDate">{{data.orders.payAt}}</span>
        </div>
      </div>
      <div class="right">
        <span>订单状态：买家已经提交订单，等待付款~</span>
        <br />
        <span>您可以：</span>
        <el-button type="primary" size="small">去付款</el-button>&emsp;
        <el-link type="primary">取消订单</el-link>
      </div>
    </div>
    <div class="title" style="marginTop: 15px;">商品信息</div>
    <div class="address">
      <el-table :data="data.tableData" border style="width: 100%" id="table" >
        <el-table-column label="商品" width="879" align="center">
          <template slot-scope="scope">
            <el-table :data="scope.row.goods" border style="width: 100%">
              <el-table-column width="120" align="center">
                <template slot-scope="scope">
                  <img :src="axios.defaults.baseURL + scope.row.image" style="width: 100px;height: 100px;" />
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="name" width="255" align="center"></el-table-column>
              <el-table-column label="单价" prop="price" width="160" align="center"></el-table-column>
              <el-table-column label="数量" prop="num" width="160" align="center"></el-table-column>
              <el-table-column label="单位" prop="unit" width="162" align="center"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="total" label="实付款" width="120" align="center"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="120" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: {
        addresses: {
          telephone: 17116513491,
          name: " 小二",
          address: {
            area: "山东烟台",
            details: "山东工商学院"
          }
        },
        orders: {
          total: 2.3,
          orderId: 111764379537,
          payAt: "2019-9-6"
        },
        tableData: [
          {
            id: 1,
            goods: [
              {
                id: 1,
                image: require("@/assets/logo.png"),
                name: "酸奶plus",
                price: 10.6,
                num: 1,
                unit: "件"
              },
              {
                id: 2,
                image: require("@/assets/logo.png"),
                name: "酸奶plus",
                price: 10.7,
                num: 1,
                unit: "件"
              }
            ],
            total: "￥100.00",
            status: "待付款"
          }
        ]
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.order {
  width: 1140px;
  .title {
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-weight: 50px;
    border: 1px, solid;
    line-height: 50px;
    text-indent: 1em;
    background: #ddd;
  }
  .content {
    width: 1139px;
    height: 240px;
    font-size: 14px;
    border: 1px solid #ddd;
    .left {
      float: left;
      width: 500px;
      height: 240px;
      border: 1px solid #ddd;
      .address {
        width: 480px;
        height: 100px;
        padding: 10px;
        border: 1px solid #ddd;
      }
      .pay {
        width: 480px;
        height: 96px;
        padding: 10px;
        border: 1px solid #ddd;
      }
    }
    .right {
      float: left;
      width: 575px;
      height: 180px;
      padding: 30px;
      border: 1px solid #ddd;
    }
  }
  span {
    line-height: 25px;
    font-weight: 1000;
  }
}
</style>