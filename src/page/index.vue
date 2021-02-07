<template>
  <div class="index-page">
    <div v-if="showHcontent" class="header-content">
      <span
        >所有新建内容有效期默认
        <strong>仅有1小时</strong>，超时后即删除无法找回</span
      >
      <a @click="doDelHcontent" class="del-hconent">
        <i class="iconfont iconguanbi"></i
      ></a>
    </div>
    <div class="page-body">
      <div class="editor">
        <div class="input-form box" :class="inputClass">
          <div class="captcha">
            <img @click="changeCaptch" :src="captchaUrl" alt="" />
          </div>
          <input
            @focus="onFocus"
            @blur="onBlur"
            v-model="words"
            maxlength="1000"
            @keyup.enter="doSubmitData"
            placeholder="在此输入内容"
            type="text"
          />
          <a v-show="words" class="clear-val" @click="doClearForm">
            <i class="iconfont iconguanbi"></i>
          </a>
        </div>
        <div class="save-indate box">
          <a
            v-for="(item, index) in saveIndate"
            :key="index"
            :class="{ on: isActive === index }"
            @click="doSetIndate(index, item)"
          >
            <a-tooltip placement="bottom">
              <template slot="title">
                <span>{{ item }}小时有效期</span>
              </template>
              {{ item }}小时
            </a-tooltip>
          </a>
        </div>
      </div>
      <div class="content-item">
        <a v-for="(item, index) in dataList" :key="index">
          <div class="box tools">
            <a-tooltip placement="top">
              <template slot="title">
                <span>复制内容</span>
              </template>
              <a
                data-clipboard-action="copy"
                :data-clipboard-text="item.content"
                class="cobyOrderSn"
                @click="doCopyWord"
              >
                <i class="iconfont iconfuzhi1"></i>
              </a>
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>在手机上查看</span>
              </template>
              <a @click="doQRCode(item.content)">
                <i class="iconfont iconicon-1"></i>
              </a>
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>删除</span>
              </template>
              <a-popconfirm
                title="确认删除？"
                ok-text="Yes"
                placement="right"
                @confirm="doDelContentItem(item._id)"
                cancel-text="No"
              >
                <a class="del-content-item">
                  <i class="iconfont iconshanchu"></i>
                </a>
              </a-popconfirm>
            </a-tooltip>
          </div>
          <h1 @click="doCopyWord" class="title">
            {{ item.content }}
          </h1>
          <div class="info box">
            <div class="created-time box">
              <i class="iconfont iconshijian"></i>
              {{ timeFormat(item.createTime) }}
            </div>
            <div class="word-space">|</div>
            <div class="del-time box">
              <i class="iconfont icondaojishi"></i>
              {{ remaining(item) }} 后删除
            </div>
            <div class="del-content-item">
              {{ momentFormat(item.createTime) }}
            </div>
          </div>
        </a>
        <!-- <div class="load-end">- 到底了 -</div> -->
      </div>
    </div>

    <a-modal :width="260" v-model="visible" :footer="null" :title="null">
      <div class="box">
        <vue-qrcode :value="qrcodeValue" />
      </div>
    </a-modal>
  </div>
</template>

<script>
import Vue from "vue";
import VueQrcode from "vue-qrcode";
import clipboard from "clipboard";
// import FastScanner from 'fastscan';
Vue.prototype.clipboard = clipboard;
import {
  addContentApi,
  getContentListApi,
  deleteListItemByIdApi,
  captchaUrl,
} from "@/api/contentList";
import { timeFormat } from "@/commons/times";
import moment from "moment";

export default {
  name: "HelloWorld",
  data() {
    return {
      inputClass: "",
      words: "",
      qrcodeValue: "",
      showHcontent: true,
      visible: false,
      saveIndate: [1, 3, 5],
      indateVal: 1,
      dataList: [],
      isActive: 0,
      captchaUrl,
    };
  },
  components: {
    VueQrcode,
  },
  mounted() {
    this.getContentList();
  },
  methods: {
    momentFormat(time) {
      return moment(time).format("hh:mm");
    },
    timeFormat(time) {
      const tt = new Date(time).getTime();
      return timeFormat(tt);
    },
    doSubmitData() {
      if (!this.words.trim()) return;
      let params = {
        content: this.words,
        indate: this.indateVal,
      };
      addContentApi(params).then(() => {
        this.$message.success("提交成功");
        this.words = "";
        this.getContentList();
      });
    },
    getContentList() {
      getContentListApi().then((res) => {
        this.dataList = res;
      });
    },
    doDelContentItem(id) {
      deleteListItemByIdApi({ _id: id }).then(() => {
        this.$message.success("删除成功");
        this.getContentList();
      });
    },
    onFocus() {
      this.inputClass = "focus";
    },
    onBlur() {
      this.inputClass = "";
    },
    doClearForm() {
      this.words = "";
    },
    doCopyWord() {
      let clipboard = new this.clipboard(".cobyOrderSn");
      clipboard.on("success", () => {
        this.$message.destroy();
        this.$message.success("复制成功");
      });
    },
    doDelHcontent() {
      this.showHcontent = false;
    },
    doQRCode(text) {
      this.visible = true;
      this.qrcodeValue = text;
    },
    doSetIndate(index, item) {
      this.indateVal = item;
      this.isActive = index;
    },
    remaining(item) {
      return moment(item.createTime)
        .add(item.indate, "h")
        .format("hh:mm");
    },
    changeCaptch() {
      this.captchaUrl += `?r=${new Date().getTime()}`;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ a {
  color: #333;
  :hover {
    color: #5551ff;
  }
}
.index-page {
  height: 100%;
  .header-content {
    font-size: 14px;
    text-align: center;
    padding: 12px 50px;
    position: relative;
    color: rgb(0, 0, 0);
    background: rgb(199, 185, 255);
    .del-hconent {
      position: absolute;
      right: 20px;
      color: #fff;
    }
  }
  .page-body {
    padding: 10px;
    max-width: 640px;
    min-width: 320px;
    margin: 0 auto;
  }
  .editor {
    padding: 30px 0;
    .input-form {
      border-bottom: 2px solid #333;
      .iconfont {
        color: #5551ff;
        font-size: 20px;
        font-weight: 900;
      }
      .captcha {
        width: 83px;
        margin-right: 5px;
      }
      .clear-val {
        margin-right: 5px;
      }
      &.focus {
        border-color: #5551ff;
      }
      input {
        font-size: 18px;
        border: none;
        appearance: none;
        padding: 5px 0;
        outline: none;
        width: 100%;
      }
    }
    .save-indate {
      padding: 10px 0;
      a {
        margin-right: 20px;
        font-size: 12px;
        color: #5551ff;
        &.on {
          border-bottom: 2px solid #5551ff;
        }
      }
    }
  }

  .content-item {
    height: 100%;
    margin-top: 10px;
    padding-bottom: 60px;
    > a {
      position: relative;
      line-height: 2;
      text-align: left;
      padding: 10px 0;
      display: block;
      padding: 15px;
      margin-bottom: 15px;
      &:hover {
        box-shadow: 0 3px 30px rgba(0, 0, 0, 0.15);
        transition: all ease 0.4s;
        border-bottom: none;
      }
    }
    .del-content-item {
      position: absolute;
      right: 0;
      :hover {
        color: #c10000;
      }
    }
    .title {
      font-size: 18px;
      line-height: 1.5;
      margin: 10px 0;
      max-height: 100px;
      overflow: auto;
      word-break: break-word;
    }
    .tools {
      position: relative;
      justify-content: flex-start;
      > a {
        margin-right: 20px;
        transform: translateY(0);
        transition: transform ease 0.3s;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          transform: translateY(-3px);
          transition: transform ease 0.3s;
        }
      }
    }
    .info {
      position: relative;
      font-size: 12px;
      justify-content: flex-start;
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
    }
  }
  .load-end {
    font-size: 14px;
    color: #888;
    text-align: center;
  }
}
</style>
