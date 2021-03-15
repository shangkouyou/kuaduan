<template>
  <a-tooltip placement="top">
    <template slot="title">
      <span>复制内容</span>
    </template>
    <a
      data-clipboard-action="copy"
      :data-clipboard-text="item.content"
      class="cobyOrderSn"
      @click="doCopyWord"
    >
      <i class="iconfont iconfuzhi1"></i>
    </a>
  </a-tooltip>
</template>

<script>
import Vue from "vue";
import clipboard from "clipboard";
Vue.prototype.clipboard = clipboard;
import { updateCopyNumByIdApi } from "@/api/contentList";

export default {
  name: "ValClipboard",
  props: {
    item: {
      type: Object,
    },
    invitation: {
      type: String,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    doCopyWord() {
      let clipboard = new this.clipboard(".cobyOrderSn");
      clipboard.on("success", (e) => {
        this.$message.destroy();
        this.$message.success("复制成功");
        updateCopyNumByIdApi({ _id: this.item._id, _csrf: this.invitation });
        e.clearSelection();
        clipboard.destroy();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cobyOrderSn {
  margin-right: 15px;
  color: var(--pf-gray-color);
}
</style>
