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

    test.each(['stdin', 'arguments'])('escapes inline braces and preserves fenced code from %s', (source) => {
        const markdown = [
            'Baz `POST /api/users/{user}/some`',
            '',
            '```ts',
            "import { convert } from '../converter/src/convert'",
            '```'
        ].join('\n')
        const result = source === 'stdin' ? runConverter([], markdown) : runConverter([markdown])

        expect(result.status).toBe(0)
        expect(result.stderr).toBe('')
        expect(normalizeOutput(result.stdout)).toBe([
            'Baz {{POST /api/users/\\{user\\}/some}}',
            '',
            '{code:language=typescript}',
            "import { convert } from '../converter/src/convert'",
            '{code}'
        ].join('\n'))
    })

    test.each([
        ['literal macro names', '{code}\n\n{note}', '{code}\n\n{note}'],
        ['literal macro in code', '```\n{code}\n```', '{code}\n{code}\n{code}'],
        ['alert macros', '> [!NOTE]\n> Use {user}', '{note}\nUse {user}\n{note}'],
        ['table cells', '| Path |\n| --- |\n| `{user}` |', '||Path||\n|{{\\{user\\}}}|'],
        ['plain table braces', '| Path |\n| --- |\n| {user} |', '||Path||\n|{user}|'],
        ['Markdown escapes', String.raw`Use \{user\}`, 'Use {user}'],
        ['adjacent braces', '`{{user}}`', '{{\\{\\{user\\}\\}}}'],
        ['marker-like text', '$JIRA_BRACE$OPEN$ {user}', '$JIRA_BRACE$OPEN$ {user}'],
        ['encoded marker-like text', '&#36;JIRA_BRACE$OPEN$', '$JIRA_BRACE$OPEN$'],
        ['brace entities in text', '&#123;code&#125; &#x7b;user&#X7D; &lbrace;x&rbrace;', '{code} {user} {x}'],
        ['brace entities in inline code', '`&#123;user&#125;`', '{{&#123;user&#125;}}'],
        ['brace entities in fenced code', '```\n&lcub;user&rcub;\n```', '{code}\n&lcub;user&rcub;\n{code}'],
        ['repeated entities in text and code', '&#123;user&#125; `&#123;user&#125;`', '{user} {{&#123;user&#125;}}'],
        ['escaped brace entities', String.raw`\&#123;user\&#125;`, '&#123;user&#125;'],
        ['other entities', '&#65; &#x42; &amp;', 'A B &'],
        ['braces in plain text', 'Use {user} and `{user}`', 'Use {user} and {{\\{user\\}}}'],
        ['inline-looking fenced content', '```ts\nconst path = `{user}`; // {{user}}\n```\n\n`{user}`', '{code:language=typescript}\nconst path = `{user}`; // {{user}}\n{code}\n\n{{\\{user\\}}}'],
        ['indented code', '    {user}\n\n`{user}`', '{code}\n{user}\n{code}\n\n{{\\{user\\}}}'],
        ['quoted fenced code', '> ```ts\n> const user = { id: 1 }\n> ```', '{code:language=typescript}\nconst user = { id: 1 }\n{code}'],
        ['multiple inline spans', '`{user}` and `{id}`', '{{\\{user\\}}} and {{\\{id\\}}}'],
        ['double-backtick span', '`` `{user}` ``', '{{`\\{user\\}`}}']
    ])('preserves %s', (_name, markdown, expected) => {
        const result = runConverter([], markdown)

        expect(result.status).toBe(0)
        expect(result.stderr).toBe('')
        expect(normalizeOutput(result.stdout)).toBe(expected)
    })

    test('returns a clear error when markdown is empty', () => {
        const result = runConverter([], '')

        expect(result.status).toBe(1)
        expect(result.stdout).toBe('')
        expect(result.stderr).toMatchInlineSnapshot(`"Markdown cannot be empty!"`)
    })
})
