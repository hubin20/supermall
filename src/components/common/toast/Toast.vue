<!--
  作者：hcodeb
  时间：2022年07月11日 17:47:05
-->
<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
  },
  data() {
    return {
      message: '',
      isShow: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    show(message,duration) {
      console.log('--------------');
      this.show = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      },duration)

    }
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%,-50%);
  padding: 8px 10px;
  color: #fff;
  background-color: rgba(0,0,0,.75);
}
</style>
