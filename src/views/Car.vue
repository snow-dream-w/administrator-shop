<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="图片" width="140">
        <template slot-scope="scope">
          <img :src="scope.row.image" width="50px" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="150"></el-table-column>
      <el-table-column prop="price" label="单价" width="130"></el-table-column>
      <el-table-column label="数量" width="240">
        <template slot-scope="scope">
          <el-input-number
            v-model="scope.row.num"
            @change="handleChange"
            :min="1"
            :max="scope.row.count"
            label="描述文字"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column prop="count" label="库存" width="100"></el-table-column>
      <el-table-column prop="unit" label="单位" width="90"></el-table-column>
      <el-table-column label="小计" width="90">
        <template slot-scope="scope">
          <span>￥{{ scope.row.num*scope.row.price | filterSum }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px;">
      <el-button>清空购物车</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
      <div style="float: right;width:200px;">
        总计
        <span style="color: red;">￥{{ tatal | filterSum }}</span>&emsp;
        <el-button type="primary">结算</el-button>
      </div>
    </div>
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
          price: 15.2,
          num: 2,
          count: 100,
          unit: "斤",
          money: 0
        },
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          price: 15.2,
          num: 2,
          count: 100,
          unit: "斤",
          money: 0
        },
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          price: 15.2,
          num: 2,
          count: 100,
          unit: "斤",
          money: 0
        },
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          price: 15.2,
          num: 2,
          count: 100,
          unit: "斤",
          money: 0
        },
        {
          image: require("@/assets/logo.png"),
          name: "紫薯",
          price: 15.2,
          num: 2,
          count: 100,
          unit: "斤",
          money: 0
        }
      ],

      tatal: 0
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.tatal = 0;
      for (let item in val) {
        this.tatal += val[item].price * val[item].num;
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleChange(index) {
      // console.log(value);
      var id = new number(index)
      this.$refs.multipleTable.toggleRowSelection( tableData[id-1]);
      this.$refs.multipleTable.toggleRowSelection(tableData[id-1]);
    }
  },
  filters :{
    filterSum(sum){
      return sum.toFixed(2);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>


