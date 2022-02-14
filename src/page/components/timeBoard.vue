<template>
  <div class="box">
    <div class="created-time box">
      <i class="iconfont iconshijian"></i>
      {{ timeFormat(item.createTime) }}
    </div>
    <div class="word-space">|</div>
    <div class="del-time box">
      <i class="iconfont icondaojishi"></i>
      {{ remaining(item) }} 后过期
    </div>
    <div class="word-space">|</div>
    <div class="del-time box">
      <i class="iconfont iconshujutongji"></i>
      {{item.copyNum}}次复制
    </div>
  </div>
</template>

<script>
import { timeFormat } from "@/commons/times";

export default {
  name: "TimeBoard",
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
    timeFormat(time) {
      const tt = new Date(time).getTime();
      return timeFormat(tt);
    },
    remaining(item) {
      let time = new Date(item.createTime);
      time.setHours(time.getHours()+item.indate)
      return `${time.getHours()}:${time.getMinutes()}`
    },
  },
};
</script>

<style lang="less" scoped>
.box{
  font-size: 12px;
}
.created-time {
  color: #888;
}
.word-space {
  margin: 0 15px;
  color: #888;
}
.del-time {
  color: #888;
}
.iconfont {
  margin-right: 3px;
}
</style>
