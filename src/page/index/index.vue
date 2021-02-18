<template>
  <div class="index-page">
    <div v-if="showHcontent" class="header-content bottom-shadow">
      <span
        >所有新建内容有效期默认
        <strong>仅有1小时</strong>，超时后即删除无法找回</span
      >
      <div class="header-content-right box bottom-shadow">
        <div class="skew-box bottom-shadow"></div>
        <a @click="doDelHcontent" class="del-hconent">
          <i class="iconfont iconguanbi"></i>
        </a>
      </div>
    </div>
    <div class="page-body">
      <div class="editor">
        <div class="input-form box" :class="inputClass">
          <!-- <div class="captcha">
            <img @click="changeCaptch" :src="captchaUrl" alt="" />
          </div> -->
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
            <clipboard ref="rCBoard" :item="item"></clipboard>
            <qrcode :item="item"></qrcode>
            <a @click="doGotoDetail(item._id)" class="del-content-item goto">
              <i class="iconfont iconyoujiantou1"></i>
            </a>
          </div>
          <h1 class="title">
            {{ item.content }}
          </h1>
          <div class="info box">
            <timeBoard :item="item"></timeBoard>
            <!-- <a-tooltip placement="top">
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
            </a-tooltip> -->
          </div>
        </a>
        <a-pagination
          v-model="pagination.page"
          :pageSize="pagination.limit"
          :total="pagination.total"
          :hideOnSinglePage="true"
          @change="onPageChange"
        />
        <!-- <div class="load-end">- 到底了 -</div> -->
      </div>
    </div>
  </div>
</template>

<script>
import FastScanner from "fastscan";
import {
  addContentApi,
  getContentListApi,
  deleteListItemByIdApi,
  captchaUrl,
} from "@/api/contentList";
import timeBoard from "./components/timeBoard.vue";
import qrcode from "./components/qrcode.vue";
import clipboard from "./components/clipboard.vue";

let scanner = null;

export default {
  name: "indexPage",
  data() {
    return {
      inputClass: "",
      words: "",
      showHcontent: true,
      saveIndate: [1, 3, 5],
      indateVal: 1,
      dataList: [],
      isActive: 0,
      captchaUrl,
      pagination: {
        page: 1,
        limit: 20,
      },
      sensitivitys : '今日头条,微信,支付宝'
    };
  },
  components: {
    timeBoard,
    qrcode,
    clipboard,
  },
  mounted() {
    this.getContentList();
  },
  methods: {
    rebuild() {
      let words = this.sensitivitys
        .replace(new RegExp("，", "g"), ",")
        .replace(new RegExp("\\n", "g"), ",")
        .split(",");
      words = words.map((word) => {
          return word.trim();
        }).filter((word) => {
          return word.length > 0;
        });
        scanner = new FastScanner(words)
        return scanner.search(this.words)
    },
    doSubmitData() {
      if (!this.words.trim()) return;

      console.log(this.rebuild())

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
    getContentList(isInit) {
      if (isInit) {
        this.pagination.page = 1;
      }
      getContentListApi(this.pagination).then((res) => {
        this.dataList = res.docs;
        this.pagination.total = res.total;
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
    doDelHcontent() {
      this.showHcontent = false;
    },
    doGotoDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    doSetIndate(index, item) {
      this.indateVal = item;
      this.isActive = index;
    },
    onPageChange(page) {
      this.pagination.page = page;
      this.getContentList();
      window.scrollTo(0, 0);
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
    position: relative;
    font-size: 14px;
    text-align: center;
    padding: 12px 60px;
    position: relative;
    color: #fff;
    background: #0f69ff;
    background-image: linear-gradient(
      to bottom,
      transparent 80%,
      rgba(0, 0, 0, 0.15)
    );
    // background: rgb(199, 185, 255);
    .header-content-right {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      width: 100px;
      background: #188fff;
      background-image: linear-gradient(
        to bottom,
        transparent 80%,
        rgba(0, 0, 0, 0.15)
      );
      .skew-box {
        position: absolute;
        left: -9px;
        height: 100%;
        background: #188fff;
        background-image: linear-gradient(
          to bottom,
          transparent 80%,
          rgba(0, 0, 0, 0.15)
        );
        width: 36px;
        transform: skew(-22deg);
      }
    }
    .del-hconent {
      position: absolute;
      right: 36px;
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
      cursor: default;
      &:hover {
        box-shadow: 0 3px 30px rgba(0, 0, 0, 0.15);
        transition: all ease 0.4s;
        border-bottom: none;
      }
    }
    .goto {
      .iconfont {
        font-size: 18px;
        color: #888;
        color: #888;
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
      justify-content: space-between;
    }
  }
  .load-end {
    font-size: 14px;
    color: #888;
    text-align: center;
  }
  /deep/ .ant-pagination {
    text-align: center;
    margin-top: 30px;
  }
}
</style>
