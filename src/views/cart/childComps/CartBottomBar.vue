<!--
  作者：hcodeb
  时间：2022年07月11日 10:53:05
-->
<template>
  <div class="cart-bottom-bar">
    <div class="cart-check-content">
      <check-button
        :isChecked="isSelectAll"
        class="cart-check-button"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="total-price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter((item) => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      return !this.cartList.some((item) => !item.checked);
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    checkClick() {
      const isAll = this.isSelectAll;
      // if (this.isSelectAll) {
      //   this.cartList.forEach(item => item.checked = false);
      // } else {
      //   this.cartList.forEach(item => item.checked = true);
      // }
      this.cartList.forEach((item) => (item.checked = !isAll));
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show("请选择购买的商品", 1500);
      }
    },
  },
};
</script>

<style scoped>
.cart-bottom-bar {
  display: flex;
  position: relative;
  height: 40px;
  background-color: #eee;
  line-height: 40px;
  font-size: 14px;
}

.cart-check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.cart-check-button {
  height: 21px;
  width: 21px;
  line-height: 21px;
  margin-right: 5px;
}
.total-price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
