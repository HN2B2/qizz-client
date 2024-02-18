import { ColorSchemeScript } from "@mantine/core"
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <ColorSchemeScript defaultColorScheme="auto" />
                <link rel="icon" href="/logo/favicon.ico" />
            </Head>
            <body className="bg-neutral-100 dark:bg-neutral-800">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
