import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    Group,
    Image,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core"
import { IconMoon, IconSun } from "@tabler/icons-react"
import classes from "./SwitchSchemeBtn.module.css"
import Link from "next/link"
import { instance } from "@/utils"
import { useRouter } from "next/router"

const Logo = () => {
    const colorScheme = useComputedColorScheme("light")
    const logoUrl =
        colorScheme === "dark"
            ? "/logo/logo-3-white.png"
            : "/logo/logo-3-color.png"

    return (
        <Link href="/">
            <Image src={logoUrl} alt="Qizz" h={46} fit="contain" />
        </Link>
    )
}

interface HeaderProps {
    burger?: boolean
    mobileOpened?: boolean
    toggleMobile?: () => void
    desktopOpened?: boolean
    toggleDesktop?: () => void
}

const Header = ({
    burger = false,
    mobileOpened,
    toggleMobile,
    desktopOpened,
    toggleDesktop,
}: HeaderProps) => {
    const { setColorScheme } = useMantineColorScheme({
        keepTransitions: true,
    })
    const computedColorScheme = useComputedColorScheme("light")

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark")
    }
    const router = useRouter()
    const handleCreate = async () => {
        try {
            const body = {
                name: "Untitled Quiz",
                quizPublicity: true,
                publicEditable: true,
                draft: true,
                manageBanks: [],
            }

            const { data } = await instance.post("/bank", body)
            router.push(`/bank/${data.quizBankId}/edit`)
        } catch (error) {
            router.push("/auth/login")
        }
    }

    return (
        <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
                <Group h="100%">
                    {burger && (
                        <>
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
                        </>
                    )}
                    <Logo />
                </Group>
                <Group>
                    <Button onClick={() => handleCreate()}>Create Quiz</Button>
                    <ActionIcon
                        color="gray"
                        size="lg"
                        variant="outline"
                        onClick={toggleColorScheme}
                        aria-label="Toggle color scheme"
                        radius="md"
                    >
                        <IconSun stroke={1.5} className={classes.light} />
                        <IconMoon stroke={1.5} className={classes.dark} />
                    </ActionIcon>
                </Group>
            </Group>
        </AppShell.Header>
    )
}

export default Header
