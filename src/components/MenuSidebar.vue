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
              <MenuItem v-for="item in items.children" :name="item.value" :key="item.value">{{item.label}}</MenuItem>
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
          <MenuItem name="1-1">
            <Icon type="logo-yen" />已支付
          </MenuItem>
          <MenuItem name="1-2">
            <Icon type="md-checkmark" />已完成
          </MenuItem>
        </Submenu>
      </Menu>
    </Col>
  </Row>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "pinzhishengxian",
          label: "品质生鲜",
          children: [
            {
              value: "shuiguo",
              label: "水果"
            },
            {
              value: "shuicai",
              label: "蔬菜"
            }
          ]
        },
        {
          value: "meizhuanghuli",
          label: "美妆护理",
          children: [
            {
              value: "caizhuangxiangshui",
              label: "彩妆香水"
            },
            {
              value: "mianmoyanghu",
              label: "面膜养护"
            },
            {
              value: "gerenqingjie",
              label: "个人清洁"
            }
          ]
        },
        {
          value: "jingzhishenghuo",
          label: "精致生活",
          children: [
            {
              value: "jiajujiadian",
              label: "家具家电"
            },
            {
              value: "yundonghuwai",
              label: "运动户外"
            },
            {
              value: "xiefuxiangbao",
              label: "鞋服箱包"
            }
          ]
        },
        {
          value: "chajiuyinliao",
          label: "茶酒饮料",
          children: [
            {
              value: "putaojiu",
              label: "葡萄酒"
            },
            {
              value: "baijiu",
              label: "白酒"
            },
            {
              value: "pijiu",
              label: "啤酒"
            },
            {
              value: "guozhiyinliao",
              label: "果汁饮料"
            }
          ]
        },
        {
          value: "nongditechan",
          label: "农地特产",
          children: [
            {
              value: "wuguzaliang",
              label: "五谷杂粮"
            },
            {
              value: "shanzhenganhuo",
              label: "山珍干货"
            },
            {
              value: "liangyoufushi",
              label: "粮油副食"
            }
          ]
        }
      ]
    };
  },
  methods: {
    changeGoods(value) {
      if(value === 'add'){
        this.$router.push('/manager/goodsAdd')
        return
      }
      this.$router.push(`/manager/goodsView/${value}`)
    },
    changeOrder(value) {
      alert(value + "order");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>