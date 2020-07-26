module.exports = {
  "presets": [
    ["@vue/app",
    { "useBuiltIns": "entry" }]
  ],
  "plugins": [
    [
      "transform-imports",
      {
        "quasar": {
          "transform": "quasar/dist/babel-transforms/imports.js",
          "preventFullImport": true
        }
      },
    ]
  ]
}