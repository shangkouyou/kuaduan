<template>
  <div class="detail-page">
    <cAlert></cAlert>
    <div class="detail-top">
      <logo class="detail"></logo>
    </div>
    <div class="viewer">
      <div v-if="detailData.content" class="box tools">
        <div class="box">
          <clipboard ref="rCBoard" :item="detailData"></clipboard>
          <qrcode :item="detailData"></qrcode>
        </div>
        <div>
          <timeBoard :item="detailData"></timeBoard>
        </div>
      </div>
      <div v-if="detailData.content" class="detail-content">
        {{ detailData.content }}
      </div>
      <div v-if="!detailData.content" class="no-data box">
        <div><i class="iconfont iconku"></i></div>
        <div>
          该文本已过期，您可以先前往首页
          <a class="to-index-new" @click="gotoIndex">新建文本</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getItemByIdApi } from "@/api/contentList";
import cAlert from "../components/alert.vue";
import timeBoard from "../components/timeBoard.vue";
import qrcode from "../components/qrcode.vue";
import clipboard from "../components/clipboard.vue";
import logo from "../components/logo.vue";

export default {
  name: "detailPage",
  data() {
    return {
      detailData: {},
    };
  },
  components: {
    cAlert,
    timeBoard,
    qrcode,
    clipboard,
    logo,
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getItemByIdApi({ _id: this.$route.params.id }).then((res) => {
        this.detailData = res[0];
      });
    },
    gotoIndex() {
      this.$router.replace("/index");
    },
  },
};
</script>

<style lang="less" scoped>
.detail-page {
  .detail-content {
    padding: 10px 0;
  }
  .detail-top {
    width: 100%;
    padding: var(--pf-page-padding);
  }
  .box {
    justify-content: flex-start;
  }
  .tools {
    justify-content: space-between;
  }
  .viewer {
    position: relative;
    min-height: 300px;
    width: 80%;
    margin: 30px auto;
    margin-top: 30px;
    padding: 20px 40px;
    min-width: 320px;
    box-shadow: 0 5px 12px 3px rgba(0, 9, 30, 0.2);
    .to-index-new {
      color: var(--pf-theme-sub-color);
    }
  }
  .no-data {
    flex-flow: column;
    justify-content: center;
    i {
      font-size: 38px;
      color: #ccc;
    }
  }
}
</style>
