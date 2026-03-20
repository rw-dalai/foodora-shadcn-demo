import { useState } from "react"

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}

export function SourceCode({ files }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      {files.map(({ filename, source }) => (
        <section key={filename}>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-mono text-sm font-semibold text-foreground">
              {filename}
            </h3>
            <CopyButton text={source} />
          </div>
          <pre className="overflow-x-auto rounded-lg bg-muted p-4 text-sm leading-relaxed">
            <code className="text-foreground">{source}</code>
          </pre>
        </section>
      ))}
    </div>
  )
}
