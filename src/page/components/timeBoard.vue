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
  </div>
</template>

<script>
import { timeFormat } from "@/commons/times";
import moment from "moment";

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
    console.log(moment().calendar())
  },
  methods: {
    timeFormat(time) {
      const tt = new Date(time).getTime();
      return timeFormat(tt);
    },
    remaining(item) {
      return moment(item.createTime)
        .add(item.indate, "h")
        .format("HH:mm");
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
