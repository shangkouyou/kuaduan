<template>
  <div class="mode-switcher">
    <a-popover placement="leftTop">
      <template slot="content">
        <ul class="ms-box">
          <li
            @click="doSetTheme('light')"
            :class="{ on: themeName === 'light' }"
          >
            <svg viewBox="0 0 1024 1024" width="20">
              <path
                fill-rule="evenodd"
                d="M513 62.37a64.13 64.13 0 1 1-64.13 64.13A64.13 64.13 0 0 1 513 62.37zm-301.18 201a64.13 64.13 0 1 1-87.61 23.47 64.13 64.13 0 0 1 87.61-23.48zm690 23.47a64.13 64.13 0 1 1-87.61-23.47 64.13 64.13 0 0 1 87.57 23.46zm-23.51 361.31a64.13 64.13 0 1 1-87.61 23.47 64.13 64.13 0 0 1 87.61-23.47zm-643 23.47a64.13 64.13 0 1 1-87.61-23.47 64.13 64.13 0 0 1 87.6 23.48zM513 254.77c141.68 0 256.53 114.85 256.53 256.53S654.68 767.83 513 767.83 256.47 653 256.47 511.3 371.32 254.77 513 254.77zM513 832a64.13 64.13 0 1 1-64.13 64.13A64.13 64.13 0 0 1 513 832z"
              ></path>
            </svg>
            <span>浅色</span>
          </li>
          <li @click="doSetTheme('dark')" :class="{ on: themeName === 'dark' }">
            <svg width="20" viewBox="0 0 1024 1024">
              <path
                fill-rule="evenodd"
                d="M342.87 253.09c0 237.4 192.45 429.85 429.85 429.85A428.79 428.79 0 0 0 928 654c-62.21 160.65-218.25 274.57-400.9 274.57-237.4 0-429.85-192.45-429.85-429.85 0-182.65 113.92-338.69 274.58-401a428.26 428.26 0 0 0-28.96 155.37z"
              ></path>
            </svg>
            <span>深色</span>
          </li>
        </ul>
      </template>
      <svg v-show="themeName === 'light'" class="m-switch" viewBox="0 0 1024 1024" width="20">
        <path
          fill-rule="evenodd"
          d="M513 62.37a64.13 64.13 0 1 1-64.13 64.13A64.13 64.13 0 0 1 513 62.37zm-301.18 201a64.13 64.13 0 1 1-87.61 23.47 64.13 64.13 0 0 1 87.61-23.48zm690 23.47a64.13 64.13 0 1 1-87.61-23.47 64.13 64.13 0 0 1 87.57 23.46zm-23.51 361.31a64.13 64.13 0 1 1-87.61 23.47 64.13 64.13 0 0 1 87.61-23.47zm-643 23.47a64.13 64.13 0 1 1-87.61-23.47 64.13 64.13 0 0 1 87.6 23.48zM513 254.77c141.68 0 256.53 114.85 256.53 256.53S654.68 767.83 513 767.83 256.47 653 256.47 511.3 371.32 254.77 513 254.77zM513 832a64.13 64.13 0 1 1-64.13 64.13A64.13 64.13 0 0 1 513 832z"
        ></path>
      </svg>
      <svg v-show="themeName !== 'light'"  class="m-switch" width="20" viewBox="0 0 1024 1024">
        <path
          fill-rule="evenodd"
          d="M342.87 253.09c0 237.4 192.45 429.85 429.85 429.85A428.79 428.79 0 0 0 928 654c-62.21 160.65-218.25 274.57-400.9 274.57-237.4 0-429.85-192.45-429.85-429.85 0-182.65 113.92-338.69 274.58-401a428.26 428.26 0 0 0-28.96 155.37z"
        ></path>
      </svg>
    </a-popover>
  </div>
</template>
<script>
export default {
  name: "modeSwitcher",
  data() {
    return {
      themeName: localStorage.getItem("page-theme") || "light",
    };
  },
  mounted() {},
  methods: {
    doSetTheme(val) {
      this.themeName = val;
      localStorage.setItem("page-theme", val);
      document.querySelector("html").setAttribute("data-theme", val);
    },
  },
};
</script>
<style lang="less" scoped>
.ms-box {
  li {
    height: 20px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &.on {
      color: var(--pf-theme-color);
      svg {
        fill: currentColor;
        color: var(--pf-theme-color);
      }
    }
    &:hover {
      color: var(--pf-theme-color);
      svg {
        fill: currentColor;
        color: var(--pf-theme-color);
      }
    }
    span {
      margin-left: 5px;
    }
  }
}

.mode-switcher {
  position: absolute;
  right: 0;
    margin: 0 20px;
  .m-switch {
    cursor: pointer;
  }
  svg {
    fill: currentColor;
    color: var(--pf-theme-color);
  }
}
</style>
