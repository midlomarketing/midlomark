export function Individual({ schema }: { schema: object }) {
  return (
    <script
      type={`application/ld+json`}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function Multiple({ schema }: { schema: object[] }) {
  return (
    <script
      type={`application/ld+json`}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema.map((s) => s)) }}
    />
  )
}
