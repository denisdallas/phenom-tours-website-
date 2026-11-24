import { Head, Html, Main, NextScript } from "next/document"
import { TagManagerFallback, TrackingHead } from "@/components/tracking"

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <TrackingHead />
      </Head>
      <body>
        <TagManagerFallback />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
