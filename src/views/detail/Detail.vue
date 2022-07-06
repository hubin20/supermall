<!--
  作者：hubin
  时间：2022年07月04日 19:24:21
-->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detai-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detial-param-info :paramInfo="paramInfo" />
      <detail-comment-info :commentInfo="commentInfo"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetaiBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetialParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'

import scroll from '@/components/common/scroll/Scroll.vue'

import { getDetail, Goods, Shop, GoodsParam } from '@/network/detail'


export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetaiBaseInfo,
    DetailShopInfo,
    scroll,
    DetailGoodsInfo,
    DetialParamInfo,
    DetailCommentInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}
    }
  },
  computed: {},
  watch: {},
  created() {
    // 保存传入的IID
    this.iid = this.$route.params.iid
    // 根据iid发送请求
    getDetail(this.iid).then(res => {
      console.log(res);
      // 获取顶部轮播图数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 创建店铺信息
      this.shop = new Shop(data.shopInfo)
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo
      //获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
  },
  mounted() { },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh()
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 44px);
  overflow: hidden;
}

/* .detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
} */
</style>
