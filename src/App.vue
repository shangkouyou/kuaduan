<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document
      .querySelector("html")
      .setAttribute("data-theme", localStorage.getItem("page-theme"));
  },
};
</script>
