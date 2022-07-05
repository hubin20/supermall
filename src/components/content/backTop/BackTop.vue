<!--
  作者：hubin
  时间：2022年07月01日 17:25:14
-->
<template>
  <div class="back-top">
    <img src="@/assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackTop',
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {
    scrollTo(x,y,time=300) {
      this.scroll.scrollTo(x,y,time)
    }
  }
}
</script>

<style scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 50px;
}

.back-top img {
  width: 43px;
  height: 43px;
}
</style>
