import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

//importamos vue-router
import VueRouter from 'vue-router';

//importamos nuestros componentes
import inicio from './components/Inicio';
import listHotel from './components/ListHotel';



//creamos nuestros componentes
Vue.component('inicio', inicio);
Vue.component('listHotel', listHotel);



//uso de vue-router
Vue.use(VueRouter);

//definimos las rutas
const routes = [
  {path:'/', component:inicio},
  {path:'/inicio',component:inicio},
  {path:'/articulos', component:listHotel},
  
 
]

//crearmos el objeto router
const router = new VueRouter({
  routes,
  mode:'history'
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
