import reactRefresh from "@vitejs/plugin-react-refresh";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
  build: {
    minify: false,
  },
};
