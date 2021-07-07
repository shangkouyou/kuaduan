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
            <!-- {{ item.content }} -->
            <!-- {{ aesDecrypt(item.content) }} -->
            {{ rasDecrypt(item.content) }}
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
import { getCookie, isURL } from "@/commons/utils";
import keys from "@/commons/keys";

import JSEncrypt from "jsencrypt";

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
    // 非对称加密
    rasDecrypt(encrypted) {
      const privateKey = "-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQCla6TYu1jlEs/brPyZP6mU+ql3hP+IyCI/3F2Z9MaUwYiLuRm90HBhsRSXScQ3dDDAx0grb48ifbEC/Ni8jManQTTevX1h6bav2Jvg+v218CmY9xZvCYwSftby8S+L2E87irn8SErOV+w9BwIFQwfSCeOiVtGxski19jucyY3gVQIDAQABAoGAL1gYrSMptR5mOURQY3gSDB6VxCxfioFlNAvZCkhBUa/2aa8HjAkNMRiigQ5Ox2RM08/1euEKAWAh+m3thkFwVVaHAEr2cUHmAMvMxZYJyxQ8c+qE5IODXfNFaIlkywHsQT9nBTfxuy24wI2KThCncAGV3Emw1uLpxCT+W6DLGyECQQDRdDy5cGg4cXmx/DSMumTlo+SZ1EKCFSxyUMEmsWqFfB8i6ODHKspzStZZHvAbK00kxg4fnlTzwcoiZ/PWewaZAkEAyi5af+J/wSPDjJ92rEMARTrQiN4CUsGvRRPdpv03kvRCnJPHBbRpK6Soxg9c57G1kHUUXXR03TMJ0N82JvDJHQJBAK+QY9n4C5PMIfp7cTzIfAw0nUgHsBvDTbcgU1Zwfd4XlS24z7iB+KI9B4A6O346hHYfgPUlzQVo2VqPkcak5nkCQQCIlCeunGORJYfERzTzyY81NTYKP29yWET+dR0W4ZfZPgiBnZKk1+r0AJfCtD4ehn4QyAap2zHW+9N1tlPumlpBAkEAgplH4jsIreOygi1HlgA6sJbWI/LPdBouASK4vIQQlulkhhBYuMUArds/j7OKIbILLX00feUYCQmKPprVimhk8Q==-----END RSA PRIVATE KEY-----";
      const decrypt = new JSEncrypt();
      decrypt.setPrivateKey(privateKey);
      return decrypt.decrypt(encrypted);
    },
    // 对称加密
    aesDecrypt(ciphertext) {
      const CryptoJS = require("crypto-js");
      const aeskey = "60ca17c5f9e5c804382e9516";
      const bytes = CryptoJS.AES.decrypt(ciphertext, aeskey);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
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
