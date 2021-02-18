<template>
  <div class="detail-page">
    <div class="viewer">
      {{ detailData.content }}
    </div>
  </div>
</template>

<script>
import { getItemByIdApi } from "@/api/contentList";

export default {
  name: "detailPage",
  data() {
    return {
      detailData: {},
    };
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
  },
};
</script>

<style lang="less" scoped>
.detail-page {
  .viewer {
    position: relative;
    height: 300px;
    width: 80%;
    margin: 30px auto;
    padding: 20px 40px;
    min-width: 320px;
    box-shadow: 0 5px 12px 3px rgba(0, 9, 30, 0.2);
  }
}
</style>
