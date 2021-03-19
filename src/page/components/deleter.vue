<template>
  <a-tooltip placement="top">
    <template slot="title">
      <span>删除</span>
    </template>
    <a-popconfirm
      title="确认删除？"
      ok-text="Yes"
      placement="right"
      @confirm="doDelContentItem"
      cancel-text="No"
    >
      <a class="del-item">
        <i class="iconfont iconshanchu"></i>
      </a>
    </a-popconfirm>
  </a-tooltip>
</template>

<script>
import { deleteListItemByIdApi } from "@/api/contentList";
import keys from "@/commons/keys";

export default {
  name: "Deleter",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {};
  },
  methods: {
    doDelContentItem() {
      deleteListItemByIdApi({
        _id: this.id,
        _csrf: sessionStorage.getItem(keys.cache.INVITATION_VALLUE) || "",
      }).then(() => {
        this.$message.destroy();
        this.$message.success("删除成功");
        this.$emit("deleted");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.del-item {
  color: var(--pf-gray-color);
}
</style>
