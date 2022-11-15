# element-lowcode-v1

> 本项目主要是为了节约开发人员重复的书写form表单和table表格代码的时间而开发的一套针对`Element-ui for vue2` 的低代码高可复用性组件
>
> 项目依赖：
>
> ​	1.`element-ui@vue2`官网： [https://element.eleme.cn/](https://element.eleme.cn/)
> ​	2.`moment`官网： [http://momentjs.cn/](http://momentjs.cn/)

## Project setup 安装依赖

```bash
npm install -S element-lowcode-v1
```

# UseAge 使用



```javascript
// main.js:
import Vue from "vue";
import App from "./App.vue";
// 引入Element-ui
import ElementUI from "element-ui";
// #引入 element-lowcode-v1插件
import EleLowcode from "element-lowcode-v1";
Vue.use(ElementUI);
Vue.use(EleLowcode);
// 引入element-ui css 样式
import "element-ui/lib/theme-chalk/index.css";
// #引入 element-lowcode-v1 css 样式
import 'element-lowcode-v1/lib/element-lowcode-v1.css'

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");

```



```html
<!-- .vue文件 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="" style="max-width:600px;margin:0 auto;">
      <!-- form -->
      <h1>lc-form</h1>
      <lc-form :list-data="listData" :form-data="formData" @btns="btns"></lc-form>
      <hr />
      <h1>lc-form-group</h1>
      <!-- form-group -->
      <lc-form-group :list-data="listDataGroup" :form-data="formData" @btns="btns" :group-style="{ background: '#ccc',marginTop:'10px'}"></lc-form-group>
      <hr />
    </div>
    <!-- table -->
    <h1>lc-table</h1>
    <div style="width:60vw;margin:0 auto;">
      <lc-table :options="tableOptions" :mobile-width="768" ></lc-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      listData: [{ prop: "test", label: "测试" }],
      listDataGroup: [
        {
          title: "标题1",
          list: [{ prop: "test", label: "测试" }],
        },
        {
          title: "标题2",
          list: [{ prop: "test2", label: "测试2" }],
        },
      ],
      formData: { test: "" },
      formRules: {},
      btns: [],
      tableOptions: {
        title: "测试表格",
        column: [
          {
            prop: "date",
            label: "日期",
            align: "center",
            width: "100",
          },
          {
            prop: "name",
            label: "名字",
            align: "center",
            width: "100",
          },
          {
            prop: "province",
            label: "省份",
            align: "center",
            width: "100",
          },
          {
            prop: "city",
            label: "市区",
            align: "center",
            width: "100",
          },
          {
            prop: "address",
            label: "地址",
            align: "center",
          },
          {
            prop: "zip",
            label: "邮编",
            align: "center",
          },
        ],
        list: [],
      },
      windowWidth:1024
    };
  },
  created(){
    this.getData()
  },
  methods: {
    getData: function () {
      this.isloading = true
      const loading = this.$loading({
        title: "加载中",
      });
      setTimeout(() => {
        this.isloading = false;
        loading.close()
        this.tableOptions.list = [
          {
            date: "2016-05-02",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1518 弄",
            zip: 200333,
          },
          {
            date: "2016-05-04",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1517 弄",
            zip: 200333,
          },
          {
            date: "2016-05-01",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1519 弄",
            zip: 200333,
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            province: "上海",
            city: "普陀区",
            address: "上海市普陀区金沙江路 1516 弄",
            zip: 200333,
          },
        ];
      }, 1000);
    },
  },
};
</script>
```

# 参数

## lc-form Attributes

| 参数            | 说明                                                         | 类型            | 是否必须 | 可选值                | 默认值 |
| --------------- | :----------------------------------------------------------- | --------------- | -------- | --------------------- | ------ |
| listData        | 表单字段循环JSON列表，想见下方`listData`说明                 | Array<Object>   | 是       |                       |        |
| formData        | 表单`:mode`绑定值同`el-form的:mode`                          | Object          | 是       |                       |        |
| formRules       | 表单验证规则，同`el-from`的rules                             | Object          | 否       |                       |        |
| btns            | 表单的自定义按钮级事件数据详见下方`btns`说明                 | Array           | 否       |                       | []     |
| labelWidth      | 同`el-form`的`labelWidth`                                    | Number/String   | 否       |                       | 80px   |
| size            | 同`el-form`的size                                            | String          | 否       | medium / small / mini | mini   |
| inline          | 是否行内表单，同`el-form`（一般搜索模块设置true）            | Boolean         | 否       | true / false          | true   |
| limit           | 上传控件文件数量通用限制`同el-upload`的limit                 | Number          | 否       |                       | 1      |
| disabled        | 同`el-form`                                                  | Boolean         | 否       | true / false          | false  |
| showPlaceholder | 是否展示placeholder                                          | `Boolean`       | 否       | true / false          | true   |
| remoteLoading   | *远程搜索loading状态`同el-select`*                           | `Boolean`       | 否       | true / false          | false  |
| showImgs        |                                                              | Boolean         | 否       |                       |        |
| mobileWidth     | 切换为手机样式的宽度临界值                                   | String / Number | 否       |                       | 768    |
| confirmText     | 默认确认按钮文字                                             | String          | 否       |                       | 保存   |
| cancelText      | 默认取消按钮文字                                             | String          | 否       |                       | 取消   |
| isSearch        | 是否为查询表单，如果true，那么取消按钮默认文字为重置，并且点击会触发重置表单数据 | Boolean         | 否       |                       | false  |

### listData Attributes

`表单组件循环列表说明`

| 参数          | 说明                                                         | 类型    | 是否必须 | 可选值       | 默认值                            |
| ------------- | ------------------------------------------------------------ | ------- | -------- | ------------ | --------------------------------- |
| type          | `form-item`组件类型                                          | String  | 是       | 详见说明     | text                              |
| prop          | form表单绑定数据的字段                                       | String  | 是       |              |                                   |
| label         | form表单字段的label                                          | String  | 否       |              |                                   |
| width         | `el-form-item`的lable宽度，权重高于外层`labelWidth`          | String  | 否       |              |                                   |
| itemWidth     | `el-form-item`除lable外区域的宽度                            | String  | 否       |              | 100%                              |
| noAll         | 是否不展示`全部`选项，当type是`select` 时有效                | Boolean |          |              |                                   |
| textAll       | `全部`选项默认展示文字                                       | String  | 否       |              | 全部                              |
| renderVal     | 当type的值是radio / checkbox / select 的时候需要渲染控件上的选择项，详见`renderVal`说明 | Array   |          |              |                                   |
| valueFormat   | `el-date-picker`组件的格式化                                 | String  | 否       |              | yyyy-MM-dd HH:mm:ss  / yyyy-MM-dd |
| momentFormat  | moment插件中的格式化配置                                     | String  | 否       |              | YYYY-MM-DD HH:mm:ss               |
| required      | 同`el-form-item` 的 `required`属性                           | Boolean |          |              |                                   |
| disabled      | 组件禁用状态（当组件支持disabled属性时）                     | Boolean |          |              |                                   |
| clearable     | 是否可清空（当组件支持clearable属性时）                      | Boolean |          |              |                                   |
| showIf        | 条件字段，是否开启此控件根据条件展示或者隐藏                 | Boolean | 否       |              | false                             |
| valIf         | 条件字段展示所需判断的值（如果valIf的值与表单绑定数据中propIf字段值相等则展示否则隐藏该组件）*注1* | Any     |          |              |                                   |
| propIf        | 条件字段展示所需判断的字段（如果valIf的值与表单绑定数据中propIf字段值相等则展示否则隐藏该组件）*注1* | String  |          |              |                                   |
| valOr         | `或`条件字段，必须要先有valIf和showIf 满足if条件之后或者再满足valOr的值与绑定数据中propIf字段值相等则展示否则隐藏该组件 *注2* | Any     |          |              |                                   |
| options       | `el-cascader`的`options`属性                                 |         |          |              |                                   |
| props         | `el-cascader`的`props`属性                                   |         |          |              |                                   |
| showAllLevels | `el-cascader`的`show-all-levels`属性                         | Boolean | 否       | true / false | false                             |
| max           | input限制输入最大字符数量                                    | Number  | 否       |              | -                                 |
| widthBtn      | 同一个form-item是否同时展示一个btn                           | Boolean | 否       | true / false | false                             |
| btnEvent      | widthBtn的button点击自定义事件如传入`testEvent`则在组件外使用`@testEvent="EventFunc"`接收事件 | String  | 否       |              |                                   |
| btnText       | widthBtn 的button按钮文字                                    | String  | 否       |              |                                   |
| showImgs      | type为image-upload时有效，值为需要展示出来的文件列表，需要用户自己传入数据类型为：{prop:fileList<Array>,prop2:flieList2<Array>} | Object  | 否       |              |                                   |
| action        | 同`el-upload`中的action                                      |         |          |              |                                   |
| limit         | 同`el-upload`中的limit 权重高于组件prop中的limit             | Number  | 否       |              | 1                                 |
| accept        | 同`el-upload`中的accept                                      |         |          |              |                                   |

```javascript
// 注1:
if(valIf == forms[propIf]) {
  // 展示组件
}else{
  // 隐藏组件
}
// 注2:
if(valIf == forms[propIf] || valOr == forms[propIf]){
  // 展示组件
}else{
  // 隐藏组件
}
```
>说明：type可选值为 text / textarea / number / txt / img / daterange / datetimerange / monthrange / date /datetime / radio / checkbox / select / image-upload / tree-select
>
>1. `text / textarea / number` 分别对应`el-input`的type类型
>2.  `/ daterange / datetimerange / monthrange / date /datetime` 分别对应 `el-date-picker`类型
>3. `radio`和`checkbox` 分别对应 `el-radio-group` 和 `el-checkbox-group`
>4. `select` 对应 `el-select`
>5. `tree-select` 对应 `el-cascader`
>6. `image-upload` 对应 `el-upload`组件
>7. `txt`则输出span 文本

### renderVal Attributes

| 参数     | 说明                               | 类型    | 是否必填 | 可选值       | 默认值 |
| -------- | ---------------------------------- | ------- | -------- | ------------ | ------ |
| label    | 循环列表绑定的值，与原组件保持一致 | Any     | 是       |              |        |
| title    | 循环列表展示的标题                 | String  | 是       |              |        |
| disabled | 是否禁用                           | Boolean | 否       | true / false | false  |

## lc-form Event

> lc-form 的触发事件

| 事件名        | 说明                                                         | 类型     | 参数       |
| ------------- | ------------------------------------------------------------ | -------- | ---------- |
| #propEvent    | 自定义btn中的event 传入的事件名称，点击button会触发抛出此事件组件外部需要使用@propEvent（注：prop-event只是一个名称，无特殊含义） | function | forms      |
| radio-change  | radio绑定值变化时触发的事件                                  | function | value,prop |
| check-change  | checkbox绑定值变化时触发的事件                               | function |            |
| image-change  | 同`el-upload`中的on-change事件                               | function |            |
| upload        | 自定义上传方法，需要用户自己处理上传事件同`el-upload`中的*http-request* | function |            |
| remove        | 移除已上传/选择的文件时触发                                  | function |            |
| on-remote     | `el-select`远程搜索查询触发事件                              | function |            |
| select-change | *下拉选中事件*                                               | function |            |
| submit        | 默认按钮提交事件                                             | function | formrs     |
| cancel        | 默认按钮 取消事件                                            | function | forms      |

### lc-form 内置方法

| 方法名           | 说明                     | 类型    | 参数                        |
| ---------------- | ------------------------ | ------- | --------------------------- |
| onSubmit         | 表单规则校验方法         | Promise |                             |
| onReset          | 表单字段重置方法         | Promise |                             |
| setRemoteOptions | 远程搜索结果列表设置方法 | Promise | prop<String>,options<Array> |



## lc-table Attributes

| 参数        | 说明                                                         | 类型          | 是否必填 | 可选值       | 默认值                    |
| ----------- | ------------------------------------------------------------ | ------------- | -------- | ------------ | ------------------------- |
| options     |                                                              | Object        |          |              |                           |
| mobileWidth | *展示手机样式所需要宽度的临界值*                             | String/Number | 否       |              | 768px                     |
| showSelect  | 是否显示多选                                                 | Boolean       | 是       | true / false | true                      |
| page        | `el-pagination`的page属性用法相同,当前页数，支持 .sync 修饰符 | Number        | -        |              | 1                         |
| pageSize    | `el-pagination`的pageSize属性用法相同,每页显示条目个数，支持 .sync 修饰符 | Number        | -        |              | 10                        |
| pageSizes   | `el-pagination`的pageSizes属性用法相同,每页显示个数选择器的选项设置 | Array<Number> | -        |              | [10, 20, 30, 40, 50, 100] |
| total       | `el-pagination`的total属性用法相同,总条目数                  | Number        | -        |              | -                         |
| hideOnePage | 只有一页数据时是否展示分页                                   | Boolean       | 否       | true / false | false                     |

## lc-table Event

> lc-table 所触发的事件

| 事件名           | 说明                                             | 参数                                  |
| ---------------- | ------------------------------------------------ | ------------------------------------- |
| size-change      | pageSize 改变时会触发                            | pageSize                              |
| page-change      | page 改变时会触发                                | page                                  |
| current-change   | page或pageSize改变都会触发的事件（用于统一处理） | pageSize/page,size-chagne/page-change |
| selection-change | 当选择项发生变化时会触发该事件                   | selectIndex<Array>                    |

