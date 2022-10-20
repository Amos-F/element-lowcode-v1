# element-lowcode-v1

> 本项目主要是为了节约开发人员重复的书写form表单和table表格代码的时间而开发的一套针对Element-ui for vue2 的低代码组件

## Project setup

```
npm install -S element-lowcode-v1
```

# UseAge

```html
<template>
  <div id="app">
    <div class="" style="max-width:600px;margin:0 auto;">
      <!-- 普通表单 -->
      <lc-form :list-data="listData" :form-data="formData" @btns="btns"></lc-form>
      <!-- 有分组样式表单 -->
      <lc-form-group :list-data="listDataGroup" :form-data="formData" @btns="btns"></lc-form-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      listData: [{ prop: "test", label: "测试" }],
      listDataGroup:[{
        title:'test',
        list:[{ prop: "test", label: "测试" }]
      }],
      formData: { test: "" },
      formRules: {},
      btns: [],
    };
  },
  components: {
    HelloWorld,
  },
};
</script>
```

# 参数

## lc-form Attributes

| 参数            | 说明                                              | 类型           | 是否必须 | 可选值                | 默认值 |
| --------------- | :------------------------------------------------ | -------------- | -------- | --------------------- | ------ |
| listData        | 表单字段循环JSON列表，想见下方`listData`说明      | Array<Object>  | 是       |                       |        |
| formData        | 表单`:mode`绑定值同`el-form的:mode`               | Object         | 是       |                       |        |
| formRules       | 表单验证规则，同`el-from`的rules                  | Object         | 否       |                       |        |
| btns            | 表单的自定义按钮级事件数据详见下方`btns`说明      | Array          | 否       |                       | []     |
| labelWidth      | 同`el-form`的`labelWidth`                         | Number\|String | 否       |                       | 80px   |
| size            | 同`el-form`的size                                 | String         | 否       | medium / small / mini | mini   |
| inline          | 是否行内表单，同`el-form`（一般搜索模块设置true） | Boolean        | 否       | true / false          | true   |
| limit           | 上传控件文件数量限制`同el-upload`的limit          | Number         | 否       |                       | 1      |
| disabled        | 同`el-form`                                       | Boolean        | 否       | true / false          | false  |
| showPlaceholder | 是否展示placeholder                               | `Boolean`      | 否       | true / false          | true   |
| remoteLoading   | *远程搜索loading状态`同el-select`*                | `Boolean`      | 否       | true / false          | false  |
| showImgs        |                                                   | Boolean        | 否       |                       |        |

### listData Attributes

`表单组件循环列表说明`

| 参数          | 说明                                                         | 类型    | 是否必须 | 可选值       | 默认值                            |
| ------------- | ------------------------------------------------------------ | ------- | -------- | ------------ | --------------------------------- |
| type          | `form-item`组件类型                                          | String  | 是       | 详见说明     | text                              |
| prop          | form表单绑定数据的字段                                       | String  | 是       |              |                                   |
| label         | form表单字段的label                                          | String  | 否       |              |                                   |
| width         | `el-form-item`的lable宽度，权重高于外层`labelWidth`          | String  | 否       |              |                                   |
| itemWidth     | `el-form-item`除lable外区域的宽度                            | String  | 否       |              | 100%                              |
| noAll         | 是否不展示`全部`选项，当type是radio或checkbox 时有效         | Boolean |          |              |                                   |
| renderVal     | 当type的值是radio / checkbox / select 的时候需要渲染控件上的选择项，详见`renderVal`说明 | Array   |          |              |                                   |
| valueFormat   | `el-date-picker`组件的格式化                                 | String  | 否       |              | yyyy-MM-dd HH:mm:ss  / yyyy-MM-dd |
| momentFormat  | moment插件中的格式化配置                                     | String  | 否       |              | YYYY-MM-DD HH:mm:ss               |
| required      | 同`el-form-item` 的 `required`属性                           |         |          |              |                                   |
| showIf        | 条件字段，是否开启此控件根据条件展示或者隐藏                 | Boolean | 否       |              | false                             |
| valIf         | 条件字段展示所需判断的值（如果valIf的值与表单绑定数据中propIf字段值相等则展示否则隐藏该组件）`[valIf == forms[propIf]]` |         |          |              |                                   |
| propIf        | 条件字段展示所需判断的字段（如果valIf的值与表单绑定数据中propIf字段值相等则展示否则隐藏该组件）`[valIf == forms[propIf]]` |         |          |              |                                   |
| valOr         | `或`条件字段，必须要先有valIf和showIf 满足if条件之后或者再满足valOr的值与绑定数据中propIf字段值相等则展示否则隐藏该组件`[valIf == forms[propIf] || valOr == forms[propIf]]` | Any     |          |              |                                   |
| options       | `el-cascader`的`options`属性                                 |         |          |              |                                   |
| props         | `el-cascader`的`props`属性                                   |         |          |              |                                   |
| showAllLevels | `el-cascader`的`show-all-levels`属性                         | Boolean | 否       | true / false | false                             |
| max           | input限制输入最大字符数量                                    | Number  | 否       |              | -                                 |
| widthBtn      | 同一个form-item是否同时展示一个btn                           | Boolean | 否       | true / false | false                             |
| btnEvent      | widthBtn的button点击自定义事件如传入`testEvent`则在组件外使用`@testEvent="EventFunc"`接收事件 | String  | 否       |              |                                   |
| btnText       | widthBtn 的button按钮文字                                    | String  | 否       |              |                                   |

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

