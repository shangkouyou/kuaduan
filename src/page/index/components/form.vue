<template>
  <div class="page-form">
    <logo></logo>
    <div class="center-box">
      <div>
        <div class="input-form box" :class="inputClass">
          <!-- <div class="captcha">
            <img @click="changeCaptch" :src="captchaUrl" alt="" />
          </div> -->
          <input
            @focus="onFocus"
            @blur="onBlur"
            v-model="words"
            maxlength="3000"
            @keyup.enter="doSubmitData"
            placeholder="在此输入内容，3000字以内"
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
    </div>
  </div>
</template>

<script>
import { addContentApi } from "@/api/contentList";
import logo from "../../components/logo.vue";
import { getCookie } from "@/commons/utils";
import keys from "@/commons/keys";

export default {
  name: "inexForm",
  data() {
    return {
      inputClass: "",
      words: "",
      saveIndate: [1, 3, 5],
      indateVal: 1,
      isActive: 0,
      timer: null,
      isSubmit: false,
    };
  },
  components: {
    logo,
  },
  mounted() {},
  methods: {
    doSubmitData() {
      if (!this.words.trim()) return;
      if (this.isSubmit) {
        this.$message.destroy();
        this.$message.warning("您操作的太快了哦");
        return;
      }

      let params = {
        content: this.words,
        indate: this.indateVal,
        visitorId: getCookie('csrfToken'),
        _csrf: sessionStorage.getItem(keys.cache.INVITATION_VALLUE) || '',
      };

      addContentApi(params)
        .then(() => {
          this.words = "";
          this.$emit("onSubmit");
          this.preventSubmits();
        })
        .catch(() => {
          this.$message.error("提交失败，请稍后再试");
        });
    },
    doSetIndate(index, item) {
      this.indateVal = item;
      this.isActive = index;
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
    preventSubmits() {
      this.isSubmit = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.isSubmit = false;
      }, 2000);
    },
    // changeCaptch() {
    //   this.captchaUrl += `?r=${new Date().getTime()}`;
    // },
  },
};
</script>

<style lang="less" scoped>
.page-form {
  position: relative;
  padding: var(--pf-page-padding);
  .input-form {
    flex: 1;
    border-bottom: 2px solid var(--pf-font-color);
    .iconfont {
      color: var(--pf-theme-sub-color);
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
      border-color: var(--pf-theme-sub-color);
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
      color: var(--pf-theme-sub-color);
      &.on {
        border-bottom: 2px solid var(--pf-theme-sub-color);
      }
    }
  }
}
</style>
