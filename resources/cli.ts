import { convert } from 'md2jira-core'

async function readMarkdown(): Promise<string | undefined>
{
    const args: string[] = process.argv.slice(2)

    if (args.length > 0) {
        return args.join(' ')
    }

    if (process.stdin.isTTY) {
        return undefined
    }

    const chunks: Buffer[] = []

    for await (const chunk of process.stdin) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    }

    return Buffer.concat(chunks).toString('utf8')
}

function escapeCurlyBraces(value: string): string
{
    return value.replace(/(?<!\\)(\{+|\}+)/g, (braces) => {
        if (braces.length % 2 === 0) {
            return braces
        }

        if (braces[0] === '{') {
            return `${ braces.slice(0, -1) }\\{`
        }

        return `\\}${ braces.slice(1) }`
    })
}

function normalize(text: string): string
{
    return text
        .replace(/^(\s*)[-*]\s+\[\s]\s+/gm, '$1- (x) ')
        .replace(/^(\s*)[-*]\s+\[x]\s+/gm, '$1- (/) ')
        .replace(/^(\s*)[-*]\s+\[!]\s+/gm, '$1- (!) ')
        .replace(/^(\s*)[-*]\s+\[flag]\s+/gm, '$1- (flag) ')
        .replace(/[{}]/g, '\\$&')
}

const markdown: string | undefined = await readMarkdown()

if (markdown === undefined || markdown.length === 0) {
    process.stderr.write('Markdown cannot be empty!')
    process.exit(1)
}

process.stdout.write(
    escapeCurlyBraces(convert(normalize(markdown)))
)
