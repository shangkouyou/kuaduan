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
          <input
            @focus="onFocus"
            @blur="onBlur"
            v-model="words"
            placeholder="在此输入内容"
            type="text"
          />
          <a v-show="words" @click="doClearForm">
            <i class="iconfont iconguanbi"></i>
          </a>
        </div>
        <div class="save-indate box">
          <a
            v-for="(item, index) in saveIndate"
            :key="index"
            :class="{ on: isActive === index }"
            @click="doSetIndate(index)"
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
        <a v-for="(key, index) in 5" :key="index">
          <div class="box tools">
            <a-tooltip placement="top">
              <template slot="title">
                <span>复制内容</span>
              </template>
              <a
                data-clipboard-action="copy"
                data-clipboard-text="1123"
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
              <a @click="doQRCode('按时发生发发的说法发')">
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
                @confirm="doDelContentItem"
                cancel-text="No"
              >
                <a class="del-content-item">
                  <i class="iconfont iconshanchu"></i>
                </a>
              </a-popconfirm>
            </a-tooltip>
          </div>
          <h1 @click="doCopyWord" class="title">
            memcached是一套分布式的高速缓存系统，由LiveJournal的Brad
            Fitzpatrick开发，但被许多网站使用。这是一套开放源代码软件，以BSD
            license授权发布。
          </h1>
          <div class="info box">
            <div class="created-time box">
              <i class="iconfont iconshijian"></i>3秒前
            </div>
            <div class="word-space">|</div>
            <div class="del-time box">
              <i class="iconfont icondaojishi"></i>1小时5分后<strong
                >删除</strong
              >
            </div>
          </div>
        </a>
        <div class="load-end">- 到底了 -</div>
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
Vue.prototype.clipboard = clipboard;

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
      isActive: 0,
    };
  },
  components: {
    VueQrcode,
  },
  methods: {
    doDelContentItem() {
      this.$message.destroy();
      this.$message.success("删除成功");
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
    doSetIndate(index) {
      this.isActive = index;
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
      padding: 10px;
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
    }
    .tools {
      justify-content: flex-start;
      > a {
        margin-right: 20px;
        transform: translateY(0);
          transition: transform ease 0.3s;
        &:hover {
          transform: translateY(-3px);
          transition: transform ease 0.3s;
        }
      }
    }
    .info {
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
  }
}
</style>
