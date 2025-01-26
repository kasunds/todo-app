import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";

import App from "./App.vue";

const vuetify = createVuetify({
  components,
  theme: {
    themes: {
      light: {
        colors: {
          secondary: '#212121'
        }
      },
    },
  }
});

createApp(App).use(vuetify, ).mount("#app");
