import LcTable from './src/main.vue'

/* istanbul ignore next */
LcTable.install = function (Vue){
  Vue.component(LcTable.name,LcTable)
}

export default LcTable