<template>
  <div class="index-page">
    <cAlert></cAlert>
    <div class="index-page-top">
      <inputForm @onSubmit="getContentList(true)"></inputForm>
    </div>
    <div class="page-body center-box">
      <div v-if="dataList.length" class="content-item">
        <a v-for="(item, index) in dataList" :key="index">
          <div class="box tools">
            <clipboard
              :index="index"
              ref="rCBoard"
              :item="item"
              @onUpdateItemCopyNum="onUpdateItemCopyNum"
            ></clipboard>
            <qrcode :item="item"></qrcode>
            <deleter
              v-if="visitorId === item.visitorId"
              :id="item._id"
              @deleted="getContentList"
            ></deleter>
            <a
              @click.stop="doGotoDetail(item._id)"
              class="del-content-item goto"
            >
              <i class="iconfont iconyoujiantou1"></i>
            </a>
          </div>
          <h1 class="title" @click.stop="doClickTitle(item.content)">
            {{ item.content }}
          </h1>
          <div class="info box">
            <timeBoard :item="item"></timeBoard>
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
      <div v-if="isNoData" class="no-data box">
        <div>
          <div><i class="iconfont iconnull1"></i></div>
          <div>暂无记录</div>
        </div>
      </div>
    </div>
    <a-back-top />
    <cBottom></cBottom>
  </div>
</template>

<script>
import { getContentListApi } from "@/api/contentList";
import timeBoard from "../components/timeBoard.vue";
import qrcode from "../components/qrcode.vue";
import clipboard from "../components/clipboard.vue";
import cAlert from "../components/alert.vue";
import deleter from "../components/deleter.vue";
import inputForm from "./components/form.vue";
import cBottom from "../components/bottom.vue";
import { getCookie, isURL } from "@/commons/utils";
import keys from "@/commons/keys";

export default {
  name: "indexPage",
  data() {
    return {
      dataList: [],
      pagination: {
        page: 1,
        limit: 20,
      },
      invitation: "",
      isNoData: false,
      visitorId: getCookie("csrfToken"),
    };
  },
  components: {
    timeBoard,
    qrcode,
    clipboard,
    cAlert,
    deleter,
    inputForm,
    cBottom,
  },
  mounted() {
    this.getContentList();
  },
  methods: {
    getContentList(isInit) {
      if (isInit) {
        this.pagination.page = 1;
      }
      getContentListApi(this.pagination)
        .then((res) => {
          this.dataList = res.docs;
          this.invitation = res.invitation;
          sessionStorage.setItem(keys.cache.INVITATION_VALLUE, this.invitation);
          this.pagination.total = res.totalDocs;
          window.scrollTo(0, 0);
          if (!this.dataList.length) this.isNoData = true;
          //解决闪屏问题
          else this.isNoData = false;
        })
        .catch(() => {
          this.$message.destroy();
          this.$message.error("加载失败，请稍后再试");
          this.isNoData = true;
        });
    },
    doGotoDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    onPageChange(page) {
      this.pagination.page = page;
      this.getContentList();
    },
    onUpdateItemCopyNum(index) {
      this.dataList[index].copyNum += 1;
    },
    doClickTitle(title) {
      if (title.length < 500) {
        if (isURL(title)) {
          window.open(title);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ a {
  color: var(--pf-font-color);
  :hover {
    color: var(--pf-theme-sub-color);
  }
}
.index-page {
  height: 100%;
  .page-body {
    padding: 10px;
  }
  min-width: 375px;
  .no-data {
    text-align: center;
    color: #aaa;
    height: 300px;
    i {
      font-size: 55px;
      color: #ddd;
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
      border-radius: 7px;
      border-bottom: var(--pf-content-item-border);
      &:hover {
        box-shadow: 0 3px 30px rgba(0, 0, 0, 0.15);
        transition: all ease 0.4s;
        border-bottom: var(--pf-content-item-border);
      }
    }
    .goto {
      .iconfont {
        font-size: 18px;
        color: #888;
      }
    }
    .del-content-item {
      position: absolute;
      right: 0;
    }
    .title {
      font-size: 18px;
      line-height: 1.5;
      margin: 10px 0;
      max-height: 100px;
      overflow: auto;
      word-break: break-word;
      color: var(--pf-content-item-color);
    }
    .tools {
      position: relative;
      justify-content: flex-start;
      > * {
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
      user-select: none;
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
<style lang="less">
[data-theme=dark]{
  .index-page{
    .content-item{
      a{
        border-radius: 0;
      }
    }
  }
}
</style>
