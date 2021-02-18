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

export default {
  name: "ValClipboard",
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    doCopyWord() {
      let clipboard = new this.clipboard(".cobyOrderSn");
      clipboard.on("success", () => {
        this.$message.destroy();
        this.$message.success("复制成功");
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
