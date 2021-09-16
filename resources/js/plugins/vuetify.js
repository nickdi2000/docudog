import Vue from 'vue'
import Vuetify, { VSnackbar, VBtn, VIcon } from 'vuetify/lib'
import VuetifyToast from 'vuetify-toast-snackbar'
import '@mdi/font/css/materialdesignicons.css'

const theme = {
		primary: '#1e88e5',
    info: '#1e88e5',
    success: '#21c1d6',
    accent: '#fc4b6c',
    default: '#563dea'
}

const dog = {
      primary: '#795548',
      secondary: '#ffc107',
      accent: '#ff9800',
      error: '#ff5722',
      warning: '#cddc39',
      info: '#00bcd4',
      success: '#4caf50'
}

Vue.use(Vuetify, {
  components: {
    VSnackbar,
    VBtn,
    VIcon
  }
})
Vue.use(VuetifyToast)

export default new Vuetify({
    theme: {
        themes: {
          dark: dog,
          light: dog,
        },
      },
			icons: {
		    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
		  },
});
