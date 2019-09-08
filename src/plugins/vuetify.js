import Vue from "vue";
import Vuetify from "vuetify/lib";
// Locale: Spanish
import es from "vuetify/es5/locale/es";
// Locale: English
import en from "vuetify/es5/locale/en";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  lang: {
    locales: { es, en },
    current: "es"
  }
});
