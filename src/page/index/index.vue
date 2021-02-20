<template>
  <div class="index-page">
    <cAlert></cAlert>
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
    <a-back-top />
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
import timeBoard from "../components/timeBoard.vue";
import qrcode from "../components/qrcode.vue";
import clipboard from "../components/clipboard.vue";
import cAlert from "../components/alert.vue";

let scanner = null;

export default {
  name: "indexPage",
  data() {
    return {
      inputClass: "",
      words: "",
      saveIndate: [1, 3, 5],
      indateVal: 1,
      dataList: [],
      isActive: 0,
      captchaUrl,
      pagination: {
        page: 1,
        limit: 20,
      },
      invitation: "",
      sensitivitys: "今日头条,微信,支付宝",
      timer : null,
      isSubmit : false,
    };
  },
  components: {
    timeBoard,
    qrcode,
    clipboard,
    cAlert,
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
      words = words
        .map((word) => {
          return word.trim();
        })
        .filter((word) => {
          return word.length > 0;
        });
      scanner = new FastScanner(words);
      return scanner.search(this.words);
    },
    doSubmitData() {
      if (!this.words.trim()) return;
      if( this.isSubmit ){
        this.$message.warning("您操作的太快了哦");
        return;
      }

      let params = {
        content: this.words,
        indate: this.indateVal,
        _csrf: this.invitation,
      };

      addContentApi(params).then(() => {
        this.words = "";
        this.getContentList(true);
        this.preventSubmits();
      }).catch(() => {
        this.$message.error("提交失败，请稍后再试");
      });
    },
    preventSubmits(){
      this.isSubmit = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isSubmit = false;
      },2000)
    },
    getContentList(isInit) {
      if (isInit) {
        this.pagination.page = 1;
      }
      getContentListApi(this.pagination).then((res) => {
        this.dataList = res.docs;
        this.invitation = res.invitation;
        this.pagination.total = res.total;
        window.scrollTo(0, 0);
      }).catch(() => {
        this.$message.error("加载失败，请稍后再试");
      });
    },
    doDelContentItem(id) {
      deleteListItemByIdApi({ _id: id, _csrf: this.invitation }).then(() => {
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
    margin-top: 40px;
  }
}
</style>
