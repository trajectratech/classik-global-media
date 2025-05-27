import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    parser: "@typescript-eslint/parser",
    ignorePatterns: ["node_modules/*", "public/**", ".next/**"], // Ignore [...slug] folder ],
    extends: ["next/core-web-vitals", "next/typescript", "prettier"],
    rules: {},
    overrides: [
      {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: ["prettier", "import"],
        rules: {
          "import/order": [
            "error",
            {
              groups: [
                "builtin",
                "external",
                "internal",
                "parent",
                "sibling",
                "index",
                "object"
              ],
              pathGroups: [
                {
                  pattern: "@/**",
                  group: "internal",
                  position: "after"
                }
              ],
              "newlines-between": "always",
              alphabetize: { order: "asc", caseInsensitive: true }
            }
          ],
          "no-console": ["error", { allow: ["error"] }],
          "prettier/prettier": ["error", {}, { usePrettierrc: true }]
        }
      },
      {
        plugins: ["check-file"],
        files: ["**/*.ts", "**/*.tsx"],
        rules: {
          "check-file/filename-naming-convention": [
            "error",
            {
              "**/*.{ts,tsx}": "KEBAB_CASE"
            },
            {
              ignoreMiddleExtensions: true
            }
          ],
          "check-file/folder-naming-convention": [
            "error",
            {
              "!(app)/**/*": "KEBAB_CASE",
              "!(**/__tests__)/**/*": "KEBAB_CASE"
            }
          ]
        }
      }
    ],
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json"
        }
      }
    }
  })
];

export default eslintConfig;
