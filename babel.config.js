module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@config': './src/config',
            '@middlewares': './src/app/middlewares',
            '@models': './src/app/models',
            '@controllers': './src/app/controllers',
            '@database': './src/database',
            '@migrations': './src/database/migrations',
          },
        },
      ],
    ],
    ignore: ['**/*.spec.ts'],
  }
  