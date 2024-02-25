import {
    ActionIcon,
    AppShell,
    Burger,
    Button,
    Group,
    Image,
    Menu,
    useComputedColorScheme,
    useMantineColorScheme,
    Text,
    rem,
} from "@mantine/core"
import {
    IconLogout,
    IconMoon,
    IconPlus,
    IconSettings,
    IconSun,
} from "@tabler/icons-react"
import Link from "next/link"
import { instance } from "@/utils"
import { useRouter } from "next/router"
import { UserResponse } from "@/types/user"
import { useDisclosure } from "@mantine/hooks"
import useUser from "@/hooks/useUser"

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
const MenuHeader = ({ user }: { user: UserResponse | null }) => {
    const [opened, { toggle }] = useDisclosure()

    return (
        <Menu shadow="md" width={200}>
            <Menu.Target>
                <Burger
                    opened={opened}
                    onClick={toggle}
                    aria-label="Toggle navigation"
                />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item>
                    <Text fw={700}>{user?.username}</Text>
                    <Text fw={200} c="dimmed">
                        {user?.email}
                    </Text>
                </Menu.Item>

                <Menu.Divider />

                <Menu.Item
                    leftSection={
                        <IconSettings
                            style={{ width: rem(20), height: rem(20) }}
                        />
                    }
                >
                    Settings
                </Menu.Item>
                {user !== null ? (
                    <Menu.Item
                        leftSection={
                            <IconLogout
                                style={{ width: rem(20), height: rem(20) }}
                            />
                        }
                        component="a"
                        href="/auth/logout"
                    >
                        Log out
                    </Menu.Item>
                ) : (
                    <Menu.Item
                        leftSection={
                            <IconPlus
                                style={{ width: rem(20), height: rem(20) }}
                            />
                        }
                        component="a"
                        href="/auth/register"
                    >
                        Register
                    </Menu.Item>
                )}
            </Menu.Dropdown>
        </Menu>
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
    const { user } = useUser()
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
                            className={`${
                                computedColorScheme === "light"
                                    ? "hidden"
                                    : "block"
                            }`}
                        />
                        <IconMoon
                            stroke={1.5}
                            className={`${
                                computedColorScheme === "light"
                                    ? "block"
                                    : "hidden"
                            }`}
                        />
                    </ActionIcon>
                    {user !== null ? (
                        <Button color="green" onClick={() => handleCreate()}>
                            Create Quiz
                        </Button>
                    ) : (
                        <Link href="/auth/login">
                            <Button>Login</Button>
                        </Link>
                    )}
                    <MenuHeader user={user} />
                </Group>
            </Group>
        </AppShell.Header>
    )
}

export default Header
