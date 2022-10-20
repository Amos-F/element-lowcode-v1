import LcForm from "./lc-form/index.js";
import LcFormGroup from "./lc-form-group/index.js";
import LcTable from "./lc-table/index.js";

const components = [LcForm, LcFormGroup, LcTable];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function(Vue, options = {}) {
  // 遍历注册全局组件
  components.forEach(component => {
    // console.log(component.name)
    Vue.component(component.name, component);
  });
};
// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default {
  install,
  LcForm,
  LcFormGroup,
  LcTable
};
// export { LcForm, LcFormGroup, LcTable };
