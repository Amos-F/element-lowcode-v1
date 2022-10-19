<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div class="" style="max-width:600px;margin:0 auto;">
      <lc-form :list-data="listData" :form-data="formData" @btns="btns"></lc-form>
      <hr/>
      <lc-form-group :list-data="listDataGroup" :form-data="formData" @btns="btns"></lc-form-group>
    </div>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
