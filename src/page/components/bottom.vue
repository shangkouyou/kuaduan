<template>
  <div class="bottom">
    <a href="https://beian.miit.gov.cn/" target="_blank" class="bottom-body">
      粤ICP备2021072368号</a
    >
  </div>
</template>
<style lang="less" scoped>
.bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 12px;
  text-align: center;
  z-index: 9999;
  height: 39px;
  padding-top: 1px;
  overflow: hidden;
  zoom: 1;
  margin: 0;
  line-height: 39px;
  background-color: var(--pf-body-background-color);
  a {
    color: #888;
    &:hover {
      color: #333;
    }
  }
}
</style>
