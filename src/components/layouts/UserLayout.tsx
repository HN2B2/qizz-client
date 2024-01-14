import {
    ActionIcon,
    AppShell,
    Breadcrumbs,
    Burger,
    Group,
    Image,
    NavLink,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import Head from "next/head"
import Link from "next/link"
import {
    IconHome,
    IconInfoCircle,
    IconMoon,
    IconSun,
} from "@tabler/icons-react"
import classes from "./SwitchSchemeBtn.module.css"
import { useRouter } from "next/router"

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

const logoUrl = "/next.svg"
const Logo = () => {
    return (
        <Link href="/">
            <Image src={logoUrl} alt="Qizz" h={20} fit="contain" />
        </Link>
    )
}

const navbarItems = [
    {
        title: "Home",
        link: "/",
        icon: <IconHome size="1rem" stroke={1.5} />,
    },
    {
        title: "About",
        link: "/about",
        icon: <IconInfoCircle size="1rem" stroke={1.5} />,
    },
]

const UserLayout = ({ title, breadcrumbs, children }: UserLayoutProps) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

    const { colorScheme, setColorScheme } = useMantineColorScheme({
        keepTransitions: true,
    })
    const computedColorScheme = useComputedColorScheme("light")

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark")
    }

    const router = useRouter()
    return (
        <>
            <Head>
                <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
            </Head>
            <AppShell
                header={{ height: 60 }}
                navbar={{
                    width: 300,
                    breakpoint: "sm",
                    collapsed: {
                        mobile: !mobileOpened,
                        desktop: !desktopOpened,
                    },
                }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md" justify="space-between">
                        <Group h="100%">
                            <Burger
                                opened={mobileOpened}
                                onClick={toggleMobile}
                                hiddenFrom="sm"
                                size="sm"
                            />
                            <Burger
                                opened={desktopOpened}
                                onClick={toggleDesktop}
                                visibleFrom="sm"
                                size="sm"
                            />
                            <Logo />
                        </Group>
                        <Group>
                            <ActionIcon
                                color="gray"
                                size="lg"
                                variant="outline"
                                onClick={toggleColorScheme}
                                aria-label="Toggle color scheme"
                                radius="md"
                            >
                                <IconSun
                                    stroke={1.5}
                                    className={classes.light}
                                />
                                <IconMoon
                                    stroke={1.5}
                                    className={classes.dark}
                                />
                            </ActionIcon>
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    {navbarItems.map((item, index) => (
                        <NavLink
                            href={item.link || "#"}
                            key={index}
                            label={item.title}
                            leftSection={item.icon}
                            variant="light"
                            active={router.pathname === item.link}
                        />
                    ))}
                </AppShell.Navbar>
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

export default UserLayout
