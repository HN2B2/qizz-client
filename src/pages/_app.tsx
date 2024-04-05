import "@/styles/globals.css"
import "@mantine/core/styles.css"
import "@mantine/carousel/styles.css"
import "@mantine/charts/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/dropzone/styles.css"
import "@mantine/notifications/styles.css"
import "@mantine/tiptap/styles.css"
import "@mantine/nprogress/styles.css"
import "@mantine/spotlight/styles.css"
import { createTheme, MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import { NavigationProgress } from "@mantine/nprogress"
import type { AppProps } from "next/app"

export const theme = createTheme({})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <MantineProvider theme={theme}>
            <ModalsProvider>
                <Notifications />
                <NavigationProgress />
                <Component {...pageProps} />
            </ModalsProvider>
        </MantineProvider>
    )
}
