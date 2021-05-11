<template>
  <div class="logo">
    <a href="/app">
      <div><span>power</span><span class="ful">Ful</span> <sup>Beta</sup></div>
    </a>
  </div>
</template>
<style lang="less" scoped>
.logo {
  position: absolute;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 2px;
  color: #000;
  a {
    position: relative;
    display: block;
    sup {
      font-size: 12px;
      font-weight: 400;
      color: #444;
    }
  }
  .ful {
    font-size: 22px;
    color: var(--pf-theme-sub-color);
  }
}
</style>
