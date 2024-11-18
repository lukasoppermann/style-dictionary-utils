import {configDefaults, defineConfig} from 'vitest/config'

export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude],
    globals: true,
    reporters: process.env.GITHUB_ACTIONS ? ['default', 'github-actions'] : ['default'],
  },
})
