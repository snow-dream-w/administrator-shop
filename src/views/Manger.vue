<template>
  <div class="container">
    <div class="header">
      <div class="title">后台管理</div>
    </div>
    <div class="body clearfix">
      <Row>
        <Col span="8" class="tac">
          <Menu active-name="1-2" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-paper" />商品管理
              </template>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-people" />全部商品
                </template>
                <MenuItem name="2-1">
                  <!-- <router-link to="/manger/goodsview"></router-link> -->
                  <Dropdown trigger="click" placement= "right-start">
                    <a href="javascript:void(0)">
                     品质生鲜
                      <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                    <template>
                     <Breadcrumb>
        <BreadcrumbItem to="/manger/goodsview">
         <Icon type="logo-buffer"></Icon>炸酱面</BreadcrumbItem>
        <BreadcrumbItem to="/manger/goodsview">
         <Icon type="logo-buffer"></Icon>豆汁儿</BreadcrumbItem>
        <BreadcrumbItem > 
         <Icon type="logo-buffer"></Icon>北京烤鸭</BreadcrumbItem>
    </Breadcrumb>
</template>
</DropdownMenu>
                   
                  </Dropdown>
                </MenuItem>
                <MenuItem name="2-2">
                  <router-link to="/manger/goodsview">节气水果</router-link>
                  
                </MenuItem>
              </Submenu>
              <MenuItem name="1-2">
                <router-link to="/manger/goodsInfo">商品上架</router-link>
              </MenuItem>
              <MenuItem name="1-3">已下架商品</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-people" />订单管理
              </template>
              <MenuItem name="3-1">
                <router-link to="/manger/orderManger">已支付</router-link>
              </MenuItem>
              <MenuItem name="3-2">
                <router-link to="/manger/orderManger">已完成</router-link>
              </MenuItem>
            </Submenu>
          </Menu>
        </Col>
      </Row>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    height: 96px;
    background: #66adff;
    border: 1px solid #ddd;
    .title {
      font-size: 28px;
      text-align: center;
    }
  }
  .body {
    display: flex;
    width: 100%;
    margin: 1px;
    .tac {
      width: 238px;
    }
  }
}
</style>