# element-lowcode-v1

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
