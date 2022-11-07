<template>
  <div class="flex flex-col-center common-form">
    <el-form :model="searchForm" :ref="formRef" :label-width="getLabelWidth(labelWidth)" :inline="inline" :size="size"
      :rules="innerRules" :disabled="disabled">
      <template v-for="item in listData">
        <el-form-item :label="item.label" :prop="item.prop" :key="item.prop" :label-width="getLabelWidth(item.width)"
          v-if="!item.showIf || (item.showIf && item.valIf === searchForm[item.propIf] || (item.valOr && item.valOr === searchForm[item.propIf]))">
          <div class="item-class flex" :class="{ 'input-change': item.max && item.max > 0 }"
            :style="{ width: item.itemWidth || '100%' }">
            <!-- input -->
            <el-input v-if="!item.type || item.type == 'text' || item.type == 'textarea'"
              v-model="searchForm[item.prop]" :maxlength="item.max || -1" :show-word-limit="item.max > 0"
              :type="item.type || 'text'" :placeholder="showPlaceholder ? item.placeholder || '请输入' : ''"></el-input>
            <!-- number -->
            <el-input v-if="item.type == 'number'" v-model.number="searchForm[item.prop]" :maxlength="item.max || -1"
              :show-word-limit="item.max > 0" :type="item.type || 'text'"
              :placeholder="showPlaceholder ? item.placeholder || '请输入' : ''"></el-input>
            <!-- text -->
            <span v-if="item.type == 'txt'" v-text="searchForm[item.prop]"></span>
            <!-- image -->
            <el-image v-if="item.type == 'img'" :src="searchForm[item.prop]" class="custom-img">
              <div slot="error" class="w100 h100 flex flex-row-center flex-col-center" style="border:1px dashed #ccc;">
                <i class="el-icon-picture font-30"></i>
              </div>
            </el-image>
            <!-- date range -->
            <el-date-picker v-if="['daterange', 'datetimerange', 'monthrange'].includes(item.type)"
              :default-time="['00:00:00', '23:59:59']" unlink-panels v-model="searchForm[item.prop]"
              :type="item.type || 'daterange'" start-placeholder="请选择开始时间" end-placeholder="请选择结束时间" range-separator="~"
              @change="(e) => dateChange(e, item)" :placeholder="showPlaceholder ? item.placeholder || '请选择' : ''"
              :value-format="item.valueFormat || defaultFormatDate(item.type)"></el-date-picker>
            <!-- date -->
            <el-date-picker v-if="['date', 'datetime'].includes(item.type)" v-model="searchForm[item.prop]"
              :type="item.type" :placeholder="showPlaceholder ? item.placeholder || '请选择' : ''"
              :value-format="item.valueFormat || defaultFormatDate(item.type)"></el-date-picker>
            <!-- datetime range -->
            <!-- <el-date-picker v-if="item.type == 'daterange'" :default-time="['00:00:00','23:59:59']" unlink-panels v-model="searchForm[item.prop]" type="daterange" start-placeholder="请选择开始时间" end-placeholder="请选择结束时间" range-separator="~" @change="(e) => dateChange(e, item)" :placeholder="showPlaceholder ? item.placeholder || '请选择':''"></el-date-picker> -->
            <!-- radio -->
            <el-radio-group v-if="item.type == 'radio'" v-model="searchForm[item.prop]"
              @change="e => radioChange(e, item)">
              <el-radio v-for="(ite, ind) in item.renderVal" :key="ind" :label="ite.label" :disabled="ite.disabled">
                {{ ite.title }}
              </el-radio>
            </el-radio-group>
            <!-- checkbox -->
            <el-checkbox-group v-if="item.type == 'checkbox'" v-model="searchForm[item.prop]"
              @change="e => checkChange(e, item)">
              <el-checkbox v-for="ite in item.renderVal" :key="ite.label" :label="ite.label" :disabled="ite.disabled">
                {{ ite.title }}
              </el-checkbox>
            </el-checkbox-group>
            <!-- select -->
            <el-select class="w100" v-if="item.type == 'select'" :filterable="item.filterable" :multiple="item.multiple"
              :remote="item.remote" v-model="searchForm[item.prop]"
              :placeholder="showPlaceholder ? item.placeholder || '请选择' : ''" :disabled="item.disabled"
              :remote-method="e => remoteMethod(e, item.prop)" :loading="remoteLoading"
              @change="e => selectChange(e, item.renderProp || item.prop)" :allow-create="item.allowCreate"
              :default-first-option="item.defaultFirstOption">
              <el-option label="全部" value="" v-if="!item.noAll"></el-option>
              <el-option v-for="(ite, ind) in item.renderVal" :key="ind" :label="ite.title" :value="ite.label"
                :disabled="ite.disabled">
              </el-option>
            </el-select>
            <!-- tree-select -->
            <el-cascader :ref="'tree' + item.prop" class="w100" v-if="item.type == 'tree-select'" :options="item.options"
              v-model="searchForm[item.prop]" clearable filterable :show-all-levels="item.showAllLevels || false"
              :props="item.props" @change="e => handleSelect(e, item)">
            </el-cascader>
            <!-- rich-text -->
            <!-- <Tinymce v-if="item.type == 'rich-text'" ref="editor" v-model="searchForm[item.prop]" :height="400" /> -->
            <!-- upload -->
            <!-- 文件上传 -->
            <el-upload :class="[disabled ? 'img-upload-disabled' : '']" v-if="item.type == 'image-upload'"
              :file-list="item.fileList || (showImgs[item.prop] ? [showImgs[item.prop]] : [])" :ref="'upimg' + item.prop"
              :action="item.action || '#'" :limit="item.limit ?? limit" list-type="picture-card"
              :auto-upload="item.autoupload" :on-exceed="(e) => handleImage('limit', item.prop)"
              :on-error="(e) => handleImage('error', e, item.prop)"
              :on-change="(e) => handleImage('change', e, item.prop)" :http-request="uploadFn"
              :accept="item.accept || ''">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                <span class="el-upload-list__item-actions">
                  <span class="el-upload-list__item-delete" @click.stop="handleRemove(file, item.prop)" v-if="!disabled">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-button class="u-m-l-10" type="primary" size="mini" @click="$emit(item.btnEvent)" v-if="item.widthBtn">
              {{ item.btnText }}</el-button>
          </div>
        </el-form-item>
      </template>
      <slot name="item"></slot>
      <el-form-item>
        <template v-if="!$slots.default">
          <div class="btn-group">
            <template v-if="btns.length">
              <el-button class="u-m-r-5" :type="item.type" @click="handleBtn(item.event)" v-for="item in btns"
                :key="item.text">{{ item.text }}</el-button>
            </template>
            <template v-else>
              <el-button class="u-m-r-5" type="primary" @click="onSubmit">保存</el-button>
              <el-button @click="onCancel">取消</el-button>
            </template>
          </div>
        </template>
        <slot></slot>
      </el-form-item>
    </el-form>
    <slot name="out"></slot>
  </div>
</template>
<script>
// import Tinymce from "@/components/Tinymce";
// const moment = require("moment");
import moment from "moment";
/**
 * @description 统一表单生成
 * @param { Array } listData - 用以循环form表单数据列表 [{prop:prop:type:type,label:label:width:width:itemWidth:itemWidth,noAll:noAll,renderVal:renderVal,momentFormat:momentFormat,valueFormat:valueFormat}]
 * @param { Object } formData - 表单数据对象
 * @param { Array } formRules - 表单校验规则
 * @param { Number | String } labelWidth - label宽度
 * @param { String } size - 表单尺寸同el-form 中的size
 * @param { Boolean } inline - 是否行内表单
 * @param { Array } btns - button 列表 [{type:type,text:text,event:event}]
 * @param { Boolean } noAll - select控件是否显示全部选项 默认是
 */
export default {
  name: "LcForm",
  // components: { Tinymce },
  data() {
    return {
      searchForm: this.formData,
      innerRules: this.formRules,
      oldData: JSON.parse(JSON.stringify(this.formData)),
    };
  },
  props: {
    listData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    formData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * @description label宽度
     */
    labelWidth: {
      type: [Number, String],
      default: "80px",
    },
    /**
     * @description size
     */
    size: {
      type: String,
      default: "mini",
    },
    /**
     * @description 是否行内表单
     */
    inline: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 表单校验规则
     */
    formRules: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /**
     * @description 自定义按钮组
     */
    btns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    limit: {
      type: Number,
      default: 1,
    },
    /**
     * @description 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * @description 是否展示placeholder
     */
    showPlaceholder: {
      type: Boolean,
      default: true,
    },
    /**
     * @description 远程搜索loading状态
     */
    remoteLoading: {
      type: Boolean,
      default: false,
    },
    showImgs: {
      type: [Object, Array],
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    // console.log(this.formData);
  },
  computed: {
    formRef() {
      return "commonForm" + Math.round(Math.random() * 1000);
    },
  },
  methods: {
    /**
     * @description 根据类型显示默认时间格式化格式
     */
    defaultFormatDate: function (type) {
      if (["datetime", "datetimerange"].includes(type)) return "yyyy-MM-dd HH:mm:ss";
      else return "yyyy-MM-dd";
    },
    getLabelWidth: function (v) {
      return v ? this.i2s(v) : this.i2s(this.labelWidth);
    },
    /**
     * @description integer to string
     */
    i2s: function (v) {
      return new String(v).indexOf("px") == -1 ? v + "px" : v;
    },
    /**
     * @description 时间改变 触发
     */
    dateChange: function (e, item) {
      // console.log(e,item)
      // this.$set(this.formData,item.prop,e)
      // console.log(this.formData)
      const timeFormat = item.momentFormat || "YYYY-MM-DD HH:mm:ss";
      if (Array.isArray(item.renderVal) && item.renderVal.length) {
        let [start, end] = e || [];
        // console.log(start,end)
        start = start ? moment(start).format(timeFormat) : "";
        end = end ? moment(end).format(timeFormat) : "";
        this.$set(this.formData, item.renderVal[0], start);
        this.$set(this.formData, item.renderVal[1], end);
      }
    },
    /**
     * @description 校验部分字段
     * @param {Array[string]|string}
     */
    onSubmitFields: function (props) {
      return new Promise((resolve, reject) => {
        this.$refs.commonForm.validateField(props, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    },
    /**
     * @description 重置表单
     */
    onReset: function () {
      return new Promise((resolve) => {
        // this.searchForm = this.oldData
        this.$refs[this.formRef].resetFields();
        // 对于有初始渲染值的处理方法
        Object.keys(this.searchForm).map((item) => {
          if (item != "exchangeType") {
            if (typeof this.searchForm[item] == "string") this.$set(this.searchForm, item, this.oldData[item] || "");
            if (Array.isArray(this.searchForm[item])) this.$set(this.searchForm, item, this.oldData[item] || []);
            if (typeof this.searchForm[item] == "number") this.$set(this.searchForm, item, this.oldData[item] || this.oldData[item] === 0 ? this.oldData[item] : null);
          }
        });
        // console.log(this.$refs.upimg, this.searchForm, this.$refs.commonForm);
        const upimgs = this.listData.filter((item) => item.type == "image-upload");
        if (upimgs.length) {
          upimgs.map((item) => {
            this.$refs["upimg" + item.prop][0].clearFiles();
          });
        }
        resolve(this.searchForm);
      });
    },
    /**
     * @description 渲染tree-select
     */
    handleSelect: function (e, item) {
      if (!e || !e.length) return;
      // 由于操作搜索选择无法获取到选中节点，需要在视图更新之后获取
      this.$nextTick(() => {
        // console.log(e,this.$refs['tree'+item.prop][0],this.$refs['tree'+item.prop][0].getCheckedNodes())
        // console.log(e,item,this.formData[item.prop],this.$refs['tree'+item.prop][0].getCheckedNodes())
        const labels = this.$refs["tree" + item.prop][0].getCheckedNodes()[0].pathLabels;
        // console.log(e,labels)
        item.renderVal.map((i, index) => {
          this.$set(this.formData, i.value, e[index]);
          this.$set(this.formData, i.label, labels[index]);
        });
        // console.log(this.formData)
      });
    },

    /**
     * @description 设置查询结果数据
     */
    setRemoteOptions: function (prop, options = []) {
      return new Promise((resolve) => {
        if (!prop) return;
        if (!options) options = [];
        this.listData.filter((item) => {
          if (item.prop == prop) {
            this.$set(item, "renderVal", options);
          }
          return item.prop == prop;
        });
        resolve();
      });
    },
    radioChange: function (e, item) {
      this.$emit("radio-change", e, item.prop);
    },
    checkChange: function (e, item) {
      this.$emit("check-change", e, item.prop);
    },
    /**
     * @description 自定义btn点击事件
     */
    handleBtn: function (e) {
      this.$emit(e, this.searchForm);
    },
    /**
     * @description 表单提交
     */
    onSubmit: function () {
      return new Promise((resolve) => {
        this.$refs[this.formRef].validate((valid) => {
          // console.log(valid);
          if (valid) {
            // console.log(this.searchForm);
            this.$emit("submit", this.searchForm);
            resolve(this.searchForm);
          }
        });
      });
    },
    onCancel: function () {
      this.$emit("cancel", this.searchForm);
    },
    handleImage: function (t, e, prop) {
      // console.log(e);
      if (t == "limit") this.$message.error(`最多上传${this.limit}张`);
      if (t == "error") this.$message.error(e.message);
      if (t == "change") this.$emit("image-change", e, prop);
    },
    uploadFn: function (e, prop) {
      this.$emit("upload", e, prop);
    },
    handleRemove: function (file, prop) {
      // console.log(file);
      this.$refs["upimg" + prop][0].clearFiles();
      this.$emit("remove", file, prop);
    },
    /**
     * @description 查询下拉事件
     */
    remoteMethod: function (e, prop) {
      // console.log(e)
      this.$emit("on-remote", e, prop);
    },
    /**
     * @description 下拉选中事件
     */
    selectChange: function (e, prop) {
      this.$emit("select-change", e, prop);
    },
  },
};
</script>

<style scoped>
@import "../../lc.css";

.input-change ::v-deep .el-input__inner {
  padding-right: 46px;
}

::v-deep .img-upload-disabled .el-upload--picture-card {
  display: none;
}
</style>