import BackTop from "@/components/content/backTop/BackTop.vue";
import { BACK_POSITION } from "./const";


export const BackTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      // console.log('backClick');
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      this.isShowBackTop = Math.abs(position.y) > BACK_POSITION
    }
  }
  
}