<!--
  作者：hubin
  时间：2022年07月04日 19:24:21
-->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages" />
      <detai-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detial-param-info ref="params" :paramInfo="paramInfo" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetaiBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetialParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";


import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";
import { debounce } from "@/common/utils";
import { BackTopMixin } from "@/common/mixin";
import {mapActions} from 'vuex'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetaiBaseInfo,
    DetailShopInfo,
    scroll,
    DetailGoodsInfo,
    DetialParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
  },
  mixins: [BackTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    };
  },
  computed: {},
  watch: {},
  created() {
    // 保存传入的IID
    this.iid = this.$route.params.iid;
    // 根据iid发送请求，请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 获取顶部轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 创建店铺信息
      this.shop = new Shop(data.shopInfo);
      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;
      //获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // this.$nextTick(() => {

      // })
    });
    //请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
    // 给getThemeTopY赋值,给赋值操作进行防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() { },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // console.log(position);
      const positionY = -position.y;
      // console.log(pos);
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          i < length - 1 &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          // console.log(i);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.listenShowBackTop(position);
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice
      product.iid = this.iid;

      // 将商品添加到购物车里
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
      this.addCart(product).then(res => {
        // console.log(res);
        // this.$toast.show(res,1500)
        console.log(this.$toast);
      })
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.content {
  height: calc(100% - 93px);
  overflow: hidden;
}

/* .detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
} */
</style>
