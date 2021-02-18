
<template>
  <div>
    <a-tooltip placement="top">
      <template slot="title">
        <span>在手机上查看</span>
      </template>
      <a @click="doQRCode(item.content)">
        <i class="iconfont iconicon-1"></i>
      </a>
    </a-tooltip>

    <a-modal :width="260" v-model="visible" :footer="null" :title="null">
      <div class="box">
        <vue-qrcode :value="qrcodeValue" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import VueQrcode from "vue-qrcode";

export default {
  name: "Qrcode",
  props: {
    item: {
      type: Object,
    },
  },
  data() {
    return {
      qrcodeValue: "",
      visible : false
      };
  },
  components: {
    VueQrcode,
  },
  mounted() {},
  methods: {
    doQRCode(text) {
      this.visible = true;
      if( text.length > 100 ){
        this.qrcodeValue = `http://127.0.0.1:8099/#/detail/${this.item._id}`;
      }else{
        this.qrcodeValue = text;
      }
    },
  },
};
</script>