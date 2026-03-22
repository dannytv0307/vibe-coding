#!/usr/bin/env node
/**
 * PostToolUse hook: auto-format files with Prettier after Write or Edit
 * Receives tool use data via stdin as JSON
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const SUPPORTED_EXTENSIONS = new Set([
  'ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs',
  'json', 'jsonc',
  'css', 'scss', 'less',
  'html',
  'md', 'mdx',
])

let input = ''
process.stdin.on('data', chunk => { input += chunk })
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input)
    const filePath = data?.tool_input?.file_path
    if (!filePath) process.exit(0)

    const ext = filePath.split('.').pop()?.toLowerCase()
    if (!ext || !SUPPORTED_EXTENSIONS.has(ext)) process.exit(0)

    if (!fs.existsSync(filePath)) process.exit(0)

    // Determine project root to find correct prettier + config
    const normalizedPath = filePath.replace(/\\/g, '/')
    let cwd

    if (normalizedPath.includes('/frontend/')) {
      cwd = path.join(__dirname, '../../frontend')
    } else if (normalizedPath.includes('/backend/')) {
      cwd = path.join(__dirname, '../../backend')
    } else {
      cwd = path.join(__dirname, '../..')
    }

    // Use local prettier if available, otherwise fall back to npx
    const localPrettier = path.join(cwd, 'node_modules/.bin/prettier')
    const prettierBin = fs.existsSync(localPrettier)
      ? `"${localPrettier}"`
      : 'npx --yes prettier'

    execSync(`${prettierBin} --write "${filePath}"`, {
      cwd,
      stdio: 'pipe',
    })
  } catch (_) {
    // silent fail — never block Claude's workflow
  }
  process.exit(0)
})
