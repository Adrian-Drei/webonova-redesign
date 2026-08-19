// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  // Your custom configs here
  rules: {
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "never", // <input>, <img>, <br> should NOT self-close
          normal: "never", // normal HTML elements
          component: "always", // Vue components can self-close
        },
      },
    ],
  },
});
