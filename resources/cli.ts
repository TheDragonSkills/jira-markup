import { randomUUID } from 'node:crypto'
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

function convertMarkdown(markdown: string): string
{
    const marker = `$JIRA-${ randomUUID() }-`
    const entities = new Map<string, [string, string]>()

    // Protect source braces so only generated inline-code delimiters match below.
    const protectedMarkdown = normalize(markdown)
        .replace(/&(?:#\d{1,7}|#[xX][\da-fA-F]{1,6}|[lr](?:brace|cub));/g, (entity) => {
            const decoded = convert(entity)

            if (decoded !== '{' && decoded !== '}') {
                return entity
            }

            const token = entities.get(entity)?.[0] ?? `${ marker }ENTITY${ entities.size }$`
            entities.set(entity, [token, decoded])

            // Markdown decodes this marker in text, while code keeps it verbatim.
            return `&#36;${ token.slice(1) }`
        })
        .replace(/[{}]/g, (brace) => `${ marker }${ brace === '{' ? 'OPEN' : 'CLOSE' }$`)

    let result = convert(protectedMarkdown)
        .replace(/\{\{[\s\S]*?\}\}/g, (inlineCode) => inlineCode
            .replaceAll(`${ marker }OPEN$`, '\\{')
            .replaceAll(`${ marker }CLOSE$`, '\\}')
        )
        .replaceAll(`${ marker }OPEN$`, '{')
        .replaceAll(`${ marker }CLOSE$`, '}')

    for (const [original, [token, decoded]] of entities) {
        result = result.replaceAll(token, decoded).replaceAll(`&#36;${ token.slice(1) }`, original)
    }

    return result
}

function normalize(text: string): string
{
    return text
        .replace(/^(\s*)[-*]\s+\[\s]\s+/gm, '$1- (x) ')
        .replace(/^(\s*)[-*]\s+\[x]\s+/gm, '$1- (/) ')
        .replace(/^(\s*)[-*]\s+\[!]\s+/gm, '$1- (!) ')
        .replace(/^(\s*)[-*]\s+\[i]\s+/gm, '$1- (i) ')
        .replace(/^(\s*)[-*]\s+\[on]\s+/gm, '$1- (on) ')
        .replace(/^(\s*)[-*]\s+\[off]\s+/gm, '$1- (off) ')
        .replace(/^(\s*)[-*]\s+\[flag]\s+/gm, '$1- (flag) ')
        .replace(/^(\s*)[-*]\s+\[flagoff]\s+/gm, '$1- (flagoff) ')
}

const markdown: string | undefined = await readMarkdown()

if (markdown === undefined || markdown.length === 0) {
    process.stderr.write('Markdown cannot be empty!')
    process.exit(1)
}

process.stdout.write(convertMarkdown(markdown))
