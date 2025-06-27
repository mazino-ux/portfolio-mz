import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en" suppressHydrationWarning>
            <Head>
                {/* Meta tags for SEO and PWA */}
                <meta charSet="UTF-8" />
                <meta name="theme-color" content="#10b981" />
                <meta name="description" content="Elite Full-Stack Engineer portfolio of Trinity Ogwezi" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                {/* Preload fonts for performance */}
                <link
                    rel="preload"
                    href="/assets/fonts/helvetiker_regular.typeface.json"
                    as="fetch"
                    crossOrigin="anonymous"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}