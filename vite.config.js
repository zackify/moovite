import reactRefresh from "@vitejs/plugin-react-refresh";

export default {
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react';`,
  },
  build: {
    minify: false,
  },
};
