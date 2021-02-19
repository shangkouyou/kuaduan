<template>
  <div v-if="showHcontent" class="header-content bottom-shadow">
    <span
      >所有新建内容有效期默认
      <strong>仅有1小时</strong>，超时后即删除无法找回</span
    >
    <div class="header-content-right box bottom-shadow">
      <div class="skew-box bottom-shadow"></div>
      <a @click="doDelHcontent" class="del-hconent">
        <i class="iconfont iconguanbi"></i>
      </a>
    </div>
  </div>
</template>

<script>

export default {
  name: "CAlert",
  data() {
    return {
      showHcontent: true,
    };
  },
  mounted() {},
  methods: {
    doDelHcontent() {
      this.showHcontent = false;
    },
  },
};
</script>

<style lang="less" scoped>
  .header-content {
    position: relative;
    font-size: 14px;
    text-align: center;
    padding: 12px 60px;
    position: relative;
    color: #fff;
    background: #0f69ff;
    background-image: linear-gradient(
      to bottom,
      transparent 80%,
      rgba(0, 0, 0, 0.15)
    );
    // background: rgb(199, 185, 255);
    .header-content-right {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100px;
      background: #188fff;
      background-image: linear-gradient(
        to bottom,
        transparent 80%,
        rgba(0, 0, 0, 0.15)
      );
      .skew-box {
        position: absolute;
        left: -18px;
        height: 100%;
        background: #188fff;
        background-image: linear-gradient(
          to bottom,
          transparent 80%,
          rgba(0, 0, 0, 0.15)
        );
        width: 36px;
        transform: skew(-22deg);
      }
    }
    .del-hconent {
      position: absolute;
      right: 36px;
      color: #fff;
    }
  }
</style>
