<!--
  作者：hcodeb
  时间：2022年07月10日 20:09:14
-->
<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() { },
  mounted() { },
  methods: {}
}
</script>

<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  background-color: red;
  border-color: red;
}
</style>
