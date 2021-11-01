<template>
  <div class="logo">
    <a href="/">
      <!-- <div><span>power</span><span class="ful">Ful</span> <sup>Beta</sup></div> -->
      <div>在线粘贴板<sup>Beta</sup></div>
    </a>
  </div>
</template>
<style lang="less" scoped>
.logo {
  position: absolute;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 10px;
  a {
    position: relative;
    display: block;
    div{
      color: var(--pf-logo-color);
      text-shadow: var(--pf-logo-shadow)
    }
    sup {
      font-size: 12px;
      font-weight: 400;
      color: var(--pf-logo-color);
      letter-spacing: 1px;
      margin-left: 2px;
    }
  }
  .ful {
    font-size: 22px;
    color: var(--pf-theme-sub-color);
  }
}
</style>
