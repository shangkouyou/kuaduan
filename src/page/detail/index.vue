<template>
  <div class="detail-page">
    <cAlert></cAlert>
    <div class="detail-top">
      <logo class="detail"></logo>
      <modeSwitcher></modeSwitcher>
    </div>
    <div v-if="detailData" class="count-down">
      <a-statistic-countdown v-show="gStartTime" :value="gStartTime" @finish="onDeleted" />
      <span class="cd-text">后过期</span>
    </div>
    <div class="viewer">
      <div v-if="detailData.content" class="box tools">
        <div class="box">
          <clipboard
            ref="rCBoard"
            :item="detailData"
            @onUpdateItemCopyNum="onUpdateItemCopyNum"
          ></clipboard>
          <qrcode :item="detailData"></qrcode>
          <deleter
            v-if="visitorId === detailData.visitorId"
            :id="detailData._id"
            @deleted="onDeleted"
          ></deleter>
        </div>
        <div class="one-line">
          <timeBoard v-if="detailData" :item="detailData"></timeBoard>
        </div>
      </div>
      <div v-if="detailData.content" class="detail-content">
        {{ detailData.content }}
        <div class="bottom-line">
          <timeBoard v-if="detailData" :item="detailData"></timeBoard>
        </div>
      </div>
      <div v-if="!detailData" class="no-data box">
        <div><i class="iconfont iconku"></i></div>
        <div>
          该文本已过期，您可以先前往首页
          <a class="to-index-new" @click="gotoIndex">新建文本</a>
        </div>
      </div>
    </div>
    <cBottom></cBottom>
  </div>
</template>

<script>
import { getItemByIdApi } from "@/api/contentList";
import cAlert from "../components/alert.vue";
import timeBoard from "../components/timeBoard.vue";
import qrcode from "../components/qrcode.vue";
import clipboard from "../components/clipboard.vue";
import logo from "../components/logo.vue";
import deleter from "../components/deleter.vue";
import cBottom from "../components/bottom.vue";
import { getCookie } from "@/commons/utils";
import modeSwitcher from "../components/modeSwitcher.vue";

export default {
  name: "detailPage",
  data() {
    return {
      detailData: {
        content: "加载中...",
        copyNum: 0,
      },
      visitorId: getCookie("csrfToken"),
    };
  },
  components: {
    cAlert,
    timeBoard,
    qrcode,
    clipboard,
    logo,
    deleter,
    cBottom,
    modeSwitcher,
  },
  computed: {
    gStartTime() {
      let time = new Date(this.detailData.createTime);
      time.setHours(time.getHours()+this.detailData.indate)
      return time.getTime() || '';
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      getItemByIdApi({ _id: this.$route.params.id }).then((res) => {
        this.detailData = res[0] || "";
      });
    },
    gotoIndex() {
      this.$router.replace("/index");
    },
    onDeleted() {
      this.$router.back();
    },
    onUpdateItemCopyNum() {
      this.detailData.copyNum += 1;
    },
  },
};
</script>

<style lang="less" scoped>
.detail-page {
  min-width: 600px;
  .detail-content {
    padding: 10px 0;
    word-break: break-word;
    margin-bottom: 50px;
    color: var(--pf-content-item-color);
  }
  .bottom-line{
    display: none;
  }
  .detail-top {
    width: 100%;
    padding: var(--pf-page-padding);
  }
  .count-down {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .cd-text {
      margin-left: 10px;
    }
  }
  .box {
    justify-content: flex-start;
  }
  .tools {
    justify-content: space-between;
    .box > * {
      margin-right: 20px;
    }
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
    border-radius: 12px;
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
