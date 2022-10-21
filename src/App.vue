<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
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
import HelloWorld from "./components/HelloWorld.vue";

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
  components: {
    HelloWorld,
  },
  computed:{
    
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
