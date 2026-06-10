import { chmod } from 'node:fs/promises'
import { build } from 'esbuild'

const outfile = 'skills/jira-markup/scripts/converter.js'

await build({
    entryPoints: ['resources/cli.ts'],
    outfile,
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node20',
    minify: true,
    banner: {
        js: '#!/usr/bin/env node',
    },
})

if (process.platform !== 'win32') {
    await chmod(outfile, 0o755)
}
