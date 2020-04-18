/* eslint-disable global-require */
const plugins = () => [
  require('babel-plugin-macros'),
  [
    require('@babel/plugin-proposal-class-properties').default,
    {
      loose: true,
    },
  ],
  [require('babel-plugin-transform-vue-jsx')],
];

module.exports = api => {
  const validEnv = ['development', 'test', 'production'];
  const currentEnv = api.env();

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    );
  }

  return {
    presets: [
      [
        '@babel/plugin-transform-runtime',
        {
          helpers: false,
          regenerator: true,
          corejs: false,
        },
      ],
      [
        '@babel/plugin-transform-regenerator',
        {
          async: false,
        },
      ],
      // isProductionEnv && [
      //   'babel-plugin-transform-react-remove-prop-types',
      //   {
      //     removeImport: true,
      //   },
      // ],
    ].filter(Boolean),
  };
};
