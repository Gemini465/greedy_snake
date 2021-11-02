module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
      "type-enum": [
        2,
        "always",
        // 比默认值多了一个 deps，用于表示依赖增、删、改等提交
        [
          "build",
          "ci",
          "chore",
          "deps",
          "docs",
          "feat",
          "fix",
          "perf",
          "refactor",
          "revert",
          "style",
          "test",
        ],
      ],
    },
  };