<!--
  作者：hcodeb
  时间：2022年07月10日 18:07:02
-->
<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :item-info="item" />
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/common/scroll/Scroll.vue'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 133px);
}

.content {
  height: 100%;
  overflow: hidden;
}
</style>
