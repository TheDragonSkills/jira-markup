const { spawnSync } = require('node:child_process')
const { existsSync, readFileSync } = require('node:fs')
const { resolve } = require('node:path')

const root = resolve(__dirname, '..', '..')
const converter = resolve(root, 'skills', 'jira-markup', 'scripts', 'converter.js')
const fixture = resolve(root, 'tests', 'Fixtures', 'Content.md')

function runConverter(args = [], input)
{
    return spawnSync(process.execPath, [converter, ...args], {
        cwd: root,
        encoding: 'utf8',
        input,
        windowsHide: true
    })
}

function normalizeOutput(value)
{
    return value.replace(/\r\n/g, '\n')
}

describe('converter.js', () => {
    const markdown = readFileSync(fixture, 'utf8')

    test('exists in the skill scripts directory', () => {
        expect(existsSync(converter)).toBe(true)
    })

    test('converts markdown from stdin', () => {
        const result = runConverter([], markdown)

        expect(result.status).toBe(0)
        expect(result.stderr).toBe('')
        expect(normalizeOutput(result.stdout)).toMatchSnapshot()
    })

    test('converts markdown from command arguments like stdin', () => {
        const fromStdin = runConverter([], markdown)
        const fromArgs = runConverter([markdown])

        expect(fromArgs.status).toBe(0)
        expect(fromArgs.stderr).toBe('')
        expect(normalizeOutput(fromArgs.stdout)).toEqual(normalizeOutput(fromStdin.stdout))
        expect(normalizeOutput(fromArgs.stdout)).toMatchSnapshot()
    })

    test('applies markdown correction before converting', () => {
        const result = runConverter([], '##Heading\n-Item')

        expect(result.status).toBe(0)
        expect(result.stderr).toBe('')
        expect(normalizeOutput(result.stdout)).toContain('h2. Heading')
        expect(normalizeOutput(result.stdout)).toContain('* Item')
    })

    test('returns a clear error when markdown is empty', () => {
        const result = runConverter([], '')

        expect(result.status).toBe(1)
        expect(result.stdout).toBe('')
        expect(result.stderr).toMatchInlineSnapshot(`"Markdown cannot be empty!"`)
    })
})
