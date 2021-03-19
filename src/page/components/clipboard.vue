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
import keys from "@/commons/keys";

export default {
  name: "ValClipboard",
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      timer: null,
      isSubmit: false,
    };
  },
  mounted() {},
  methods: {
    doCopyWord() {
      
      if (this.isSubmit) {
        this.$message.destroy();
        this.$message.warning("您操作的太快了哦");
        return;
      }

      let clipboard = new this.clipboard(".cobyOrderSn");
      clipboard.on("success", (e) => {
        this.$message.destroy();
        this.$message.success("复制成功");
        updateCopyNumByIdApi({
          _id: this.item._id,
          _csrf: sessionStorage.getItem(keys.cache.INVITATION_VALLUE) || '',
        }).then((res) => {
          if (res.success) {
            this.preventSubmits();
            this.$emit("onUpdateItemCopyNum", this.index);
          }
        });
        e.clearSelection();
        clipboard.destroy();
      });
    },
    preventSubmits() {
      this.isSubmit = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isSubmit = false;
      }, 2000);
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
