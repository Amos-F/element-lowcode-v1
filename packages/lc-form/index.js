import LcForm from './src/main.vue'

/* istanbul ignore next */
LcForm.install = function(Vue) {
  Vue.component(LcForm.name, LcForm);
};

export default LcForm;
