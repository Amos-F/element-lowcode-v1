<template>
  <div class="bg-white padding-20 jhd-table">
    <div class="
        flex flex-row-between flex-col-center
        padding-0-20
        u-font-16
        font-bold
        h-50
      " v-if="options.title || $slots.titleRight || $slots.title">
      <div>
        <template v-if="options.title">
          <i class="el-icon-tickets" />
          {{ options.title }}
        </template>
        <slot name="title"></slot>
      </div>
      <div>
        <slot name="titleRight" />
      </div>
    </div>
    {{isMobile}}
    <el-table v-if="!isMobile" :data="options.list" border stripe class="w100" @selection-change="selectionChange" :cell-class-name="customClass">
      <!-- 多选 -->
      <el-table-column type="selection" :width="55" v-if="showSelect">
      </el-table-column>
      <el-table-column type="index" :index="options.indexMethod" label="序号" v-if="options.showIndex" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip v-for="col in options.column" :prop="col.prop" :key="col.prop" :label="col.label" :align="col.align || 'center'" :width="col.width">
        <template slot-scope="scope">
          <!-- 格式化日期范围 -->
          <span v-if="col.istype == 'slot-date'">{{
            getMergeDate(scope.row, col.field)
          }}</span>
          <!-- 格式化日期 -->
          <span v-else-if="col.istype == 'date'">{{
            getDate(scope.row[col.prop], col.format)
          }}</span>
          <span v-else-if="col.istype == 'datetime'">
            {{ getDate(scope.row[col.prop], col.format) }}
          </span>
          <!-- 链接 -->
          <el-button type="text" @click="(e) => handleClick('link', scope.row)" v-else-if="col.istype == 'link'">
            {{ scope.row[col.prop] }}
          </el-button>
          <span v-else-if="col.istype == 'list'">
            {{ col.list[scope.row[col.prop]] }}
          </span>
          <!-- image -->
          <div v-else-if="col.istype == 'image'" style="max-width: 200px; max-height: 100px;width:100px;height:50px;">
            <el-image :src="scope.row[col.prop]" fit="contain" class="w100 h100">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline" style="font-size: 40px; color: #5cb6ff"></i>
              </div>
            </el-image>
          </div>
          <!-- 组合 -->
          <div v-else-if="col.istype == 'group'">
            <span v-for="(g, i) in col.list" :key="i">
              {{ scope.row[g] }}
              <span v-if="i < col.length - 1 && col.split" v-text="col.split"></span>
            </span>
          </div>
          <!-- 通用 html -->
          <div class="text-div" v-else-if="col.istype == 'html'" v-html="
              col.formatter && typeof col.formatter == 'function'
                ? col.formatter(scope.row[col.prop], scope.row)
                : scope.row[col.prop]
            "></div>
          <!-- content to trigger tooltip here -->
          <!-- 自定义formatter方法实现 -->
          <div class="text-div" v-else-if="col.formatter && typeof col.formatter == 'function'">
            {{ col.formatter(scope.row[col.prop], scope.row) }}
          </div>
          <!-- 通用渲染 -->
          <div class="text-div u-line-4" v-else v-text="scope.row[col.prop]"></div>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
    <div v-else>
      <el-checkbox-group v-model="selection" @change="e=>selectionChange(e,true)">
        <div v-for="(row,index) in options.list" :key="index" :row="row">
          <el-descriptions :column="1" size="mini">
            <el-descriptions-item v-if="showSelect" label="选择">
              <el-checkbox :label="index" :indeterminate="false">
                <div></div>
              </el-checkbox>
            </el-descriptions-item>
            <el-descriptions-item v-for="col in options.column" :key="col.prop" :label="col.label">
              <!-- 格式化日期范围 -->
              <span v-if="col.istype == 'slot-date'">{{
            getMergeDate(row, col.field)
          }}</span>
              <!-- 格式化日期 -->
              <span v-else-if="col.istype == 'date'">{{
            getDate(row[col.prop], col.format)
          }}</span>
              <span v-else-if="col.istype == 'datetime'">
                {{ getDate(row[col.prop], col.format) }}
              </span>
              <!-- 链接 -->
              <el-button type="text" @click="(e) => handleClick('link', row)" v-else-if="col.istype == 'link'">
                {{ row[col.prop] }}
              </el-button>
              <span v-else-if="col.istype == 'list'">
                {{ col.list[row[col.prop]] }}
              </span>
              <!-- image -->
              <div v-else-if="col.istype == 'image'" style="max-width: 200px; max-height: 100px;width:100px;height:50px;">
                <el-image :src="row[col.prop]" fit="contain" class="w100 h100">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline" style="font-size: 40px; color: #5cb6ff"></i>
                  </div>
                </el-image>
              </div>
              <!-- 组合 -->
              <div v-else-if="col.istype == 'group'">
                <span v-for="(g, i) in col.list" :key="i">
                  {{ row[g] }}
                  <span v-if="i < col.length - 1 && col.split" v-text="col.split"></span>
                </span>
              </div>
              <!-- 通用 html -->
              <div class="text-div" v-else-if="col.istype == 'html'" v-html="
              col.formatter && typeof col.formatter == 'function'
                ? col.formatter(row[col.prop], row)
                : row[col.prop]
            "></div>
              <!-- content to trigger tooltip here -->
              <!-- 自定义formatter方法实现 -->
              <div class="text-div" v-else-if="col.formatter && typeof col.formatter == 'function'">
                {{ col.formatter(row[col.prop], row) }}
              </div>
              <!-- 通用渲染 -->
              <div class="text-div u-line-4" v-else v-text="row[col.prop]"></div>
            </el-descriptions-item>
            <!-- <template v-slot:mobile v-bind:row="row"></template> -->
            <slot name="mobile" v-bind:row="row">
            </slot>
          </el-descriptions>
          <el-divider direction="horizontal" content-position="left"></el-divider>

        </div>
      </el-checkbox-group>

    </div>
    <div class="flex flex-row-end u-m-t-20">
      <el-pagination :small="isMobile" :page-size.sync="size" :page-sizes="pageSizes" :current-page.sync="current" :layout="pageLayout" :total="total" @current-change="handleClick('page-change', current)" @size-change="handleClick('size-change', size)" :hide-on-single-page="hideOnePage" />
    </div>
  </div>
</template>

<script>
/**
 * @description 统一表格组件
 * @param {Object} options - {title,list,column} title:表格标题,list:表格数据列表，column:表格字段
 * @param {Boolean} showSelect - 是否显示多选
 * @param {Number|String} page - 页码
 * @param {Number|String} pageSize - 每页条目数
 * @param {Array} pageSizes - 条目列表
 * @param {Number|String} total - 总条目数
 * @param {Number|String} mobileWidth  - 展示手机样式所需要宽度的临界值
 */
import moment from "moment";
export default {
  name: "LcTable",
  componentName: "LcTable",
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      },
    },
    showSelect: {
      type: Boolean,
      default: true,
    },
    page: {
      type: [Number, String],
      default: 1,
    },
    pageSize: {
      type: [Number, String],
      defualt: 10,
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 40, 80, 100];
      },
    },
    total: {
      type: [Number, String],
      default: 0,
    },
    hideOnePage: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: "custom-cell",
    },
    /**
     * @description 展示手机样式所需宽度临界值
     */
    mobileWidth: {
      type: [String, Number],
      default: 768,
    },
  },
  data() {
    return {
      current: this.page,
      size: this.pageSize,
      selection: [],
      windowWidth: 0,
    };
  },
  created() {},
  mounted() {
    this.$set(this, "windowWidth", window.innerWidth);
    window.onresize = () => {
      this.$set(this, "windowWidth", window.innerWidth);
    };
  },
  watch: {
    page: function (v) {
      this.current = v;
    },
  },
  computed: {
    // ...mapGetters(["windowWidth"]),
    pageLayout() {
      return this.isMobile ? "prev, pager, next" : "total, sizes, prev, pager, next, jumper";
    },
    isMobile() {
      return this.windowWidth - Number(this.mobileWidth) <= 0;
    },
  },
  methods: {
    getDate: function (time, format) {
      format = format || "YYYY.MM.DD";
      return time ? moment(time).format(format) : "";
    },
    /**
     * @description 日期范围
     */
    getMergeDate: function (row, field) {
      // console.log(row,moment(row.validStartTime).format('YYYY.MM.DD'),row.validStartTime,row.validStartTime)
      const start = field ? field + "StartTime" : "validStartTime";
      const end = field ? field + "EndTime" : "validEndTime";
      let expTime = moment(row[start]).format("YYYY.MM.DD") + "-" + moment(row[end]).format("YYYY.MM.DD");
      // console.log(expTime);
      return expTime;
    },
    handleClick: function (type, item) {
      // 更新父组件pageSize
      if (type == "size-change") {
        this.current = 1;
        // this.$emit('update:page',1)
        this.$emit("update:pageSize", item);
      }
      // 更新父组件page
      if (type == "page-change") {
        this.$emit("update:page", item);
      }
      // console.log(this.page,this.size,type,item)
      this.$emit(type, item);
      // 统一更新方法
      this.$emit("current-change", item, type);
    },
    formatter: function (row, column, cellValue, index, col) {
      // console.log(row, column, cellValue, index);
      return cellValue;
    },
    selectionChange: function (selection, ismobile) {
      // console.log(selection,ismobile,this.options.list)
      if (ismobile) selection = this.options.list.filter((item, index) => selection.includes(index));
      // console.log(selection);
      this.$emit("selection-change", selection);
    },
  },
};
</script>
<style scoped>
@import "../../lc.css";
/* .jhd-table ::v-deep .el-tooltip__popper {
  max-width: 300px !important;
} */
</style>