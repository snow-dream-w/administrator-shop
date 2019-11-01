<template>
  <div class="hello">
    <div class="productList">
      <ul>
        <li v-for="item in list" :key="item.id">
          <img :src="item.image" alt />
          <p>{{item.name}}</p>
          <div class="goodsPrice">
            <span class="money">{{item.price}}</span>
            <span class="num">{{item.num}}人付款</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          image: require("@/assets/logo.png"),
          name: "玉米",
          price: parseFloat(15.01),
          num: 12
        },
        {
          id: 2,
          image: require("@/assets/logo.png"),
          name: "紫薯",
          price: parseFloat(15.01),
          num: 12
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  width: 736px;
  margin: 10px;
}

ul {
  // position: absolute;
  width: 736px;
  border: 1px solid #d8d8d8;
  overflow: hidden;
}
li {
  // position: relative;
  margin: 5px 6px 12px;
  width: 220px;
  height: 320px;
  border: 1px solid #d8d8d8;
  list-style-type: none;
  float: left;
  background: #fff;
}
img {
  // position: relative;
  text-align: center;
}

p {
  font-size: 14px;
  color: #333;
  margin-left: 16px;
  line-height: 70px;
  margin-bottom: 5px;
}

.goodsPrice {
  padding: 5px;
  margin-bottom: 0;
  margin-top: 5px;
  color: #e42e2e;
  font-size: 12px;
}
.money {
  float: left;
  margin-left: 10px;
}
.num {
  float: right;
  color: #666666;
  margin-right: 3px;
}
</style>
