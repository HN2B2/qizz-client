import { AppShell, Breadcrumbs } from "@mantine/core"
import Head from "next/head"
import Link from "next/link"
import { Header } from "./layoutComponents"

const APP_NAME = "Qizz"

export type BreadCrumbsItem = {
    title: string
    link?: string
}

interface UserLayoutProps {
    title?: string
    breadcrumbs?: BreadCrumbsItem[]
    children: React.ReactNode
}

const HeaderLayout = ({ title, breadcrumbs, children }: UserLayoutProps) => {
    return (
        <>
            <Head>
                <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
            </Head>
            <AppShell header={{ height: 60 }} padding="md">
                <Header />
                <AppShell.Main>
                    {breadcrumbs && (
                        <Breadcrumbs mb={"sm"}>
                            {breadcrumbs.map((item, index) => (
                                <Link key={index} href={item.link || "#"}>
                                    {item.title}
                                </Link>
                            ))}
                        </Breadcrumbs>
                    )}
                    {children}
                </AppShell.Main>
            </AppShell>
        </>
    )
}

export default HeaderLayout
