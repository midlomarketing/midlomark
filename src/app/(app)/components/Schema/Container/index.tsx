import Script from "next/script";

export function Schema({ schema }: { schema: object }) {
  return (
    <Script
      type={`application/ld+json`}
    >
      {JSON.stringify(schema)}
    </Script>
  )
}
