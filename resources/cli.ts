import { convert } from '../converter/src/convert'

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

function normalize(text: string): string
{
    return text
        .replace(/^(\s*)[-*]\s+\[\s]\s+/gm, '$1- (x) ')
        .replace(/^(\s*)[-*]\s+\[x]\s+/gm, '$1- (/) ')
        .replace(/^(\s*)[-*]\s+\[!]\s+/gm, '$1- (!) ')
        .replace(/^(\s*)[-*]\s+\[flag]\s+/gm, '$1- (flag) ')
}

const markdown: string | undefined = await readMarkdown()

if (markdown === undefined || markdown.length === 0) {
    process.stderr.write('Markdown cannot be empty!')
    process.exit(1)
}

process.stdout.write(
    convert(normalize(markdown), true)
)
