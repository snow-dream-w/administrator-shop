<template>
  <Row>
    <Col span="8" class="tac">
      <Menu active-name="1-1" :open-names="['1']" @on-select="changeGoods">
        <Submenu name="1">
          <template slot="title">
            <Icon type="md-albums" />商品管理
          </template>
          <Submenu name="1-1">
            <template slot="title">
              <Icon type="md-list" />商品分类
            </template>
            <Submenu v-for="items in options" :name="items.value" :key="items.value">
              <template slot="title">
                <Icon type="md-code" />
                {{items.label}}
              </template>
              <MenuItem
                v-for="item in items.children"
                :name="item.value"
                :key="item.value"
              >{{item.label}}</MenuItem>
            </Submenu>
          </Submenu>
          <MenuItem name="shelf">
            <Icon type="ios-close-circle" />已下架商品
          </MenuItem>
          <MenuItem name="add">
            <Icon type="ios-add-circle-outline" />&nbsp;商品上架
          </MenuItem>
        </Submenu>
      </Menu>
      <Menu active-name="1" :open-names="['1']" @on-select="changeOrder">
        <Submenu name="1">
          <template slot="title">
            <Icon type="md-albums" />订单管理
          </template>
          <MenuItem name="2">
            <Icon type="logo-yen" />已支付
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-car-outline" />已发货
          </MenuItem>
          <MenuItem name="4">
            <Icon type="md-checkmark" />已完成
          </MenuItem>
        </Submenu>
      </Menu>
    </Col>
  </Row>
</template>
<script>
import options from '@/assets/menu'
export default {
  data() {
    return {
      options: options
    };
  },
  methods: {
    /**
     * 响应商品菜单
     */
    changeGoods(value) {
      if (value === "add") {
        this.$router.push("/manager/goodsAdd");
        return;
      }
      if (value === "shelf") {
        this.$router.push(`/manager/goodsView/${value}`);
      }
      this.$router.push(`/manager/goodsView/${value}`);
    },
    /**
     * 响应订单菜单
     */
    changeOrder(value) {
      this.$router.push(`/manager/orderManager/${value}`);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>