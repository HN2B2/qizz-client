import { AuthResponse, RegisterRequest } from "@/types/auth"
import { UserResponse } from "@/types/user"
import { getServerErrorNoti, instance } from "@/utils"
import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Container,
    Button,
    Divider,
    Flex,
    Text,
    rem,
    Box,
    Popover,
    Progress,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure, useHotkeys, useLocalStorage } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconBrandGoogleFilled, IconCheck, IconX } from "@tabler/icons-react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

const requirements = [
    { re: /[0-9]/, label: "Includes number" },
    { re: /[a-z]/, label: "Includes lowercase letter" },
    { re: /[A-Z]/, label: "Includes uppercase letter" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
]

function PasswordRequirement({
    meets,
    label,
}: {
    meets: boolean
    label: string
}) {
    return (
        <Text
            c={meets ? "teal" : "red"}
            style={{ display: "flex", alignItems: "center" }}
            mt={7}
            size="sm"
        >
            {meets ? (
                <IconCheck style={{ width: rem(14), height: rem(14) }} />
            ) : (
                <IconX style={{ width: rem(14), height: rem(14) }} />
            )}{" "}
            <Box ml={10}>{label}</Box>
        </Text>
    )
}

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1
        }
    })

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10)
}

const RegisterPage = () => {
    const router = useRouter()
    const { r } = router.query

    const [_, setUser] = useLocalStorage<UserResponse>({
        key: "user",
    })

    const registerForm = useForm({
        initialValues: {
            email: "",
            username: "",
            password: "",
        },
        validate: {
            email: (value) =>
                /^\S+@\S+\.\S+$/.test(value) ? null : "Invalid email address",
            username: (value) =>
                value.length < 6
                    ? "Username should be at least 6 characters long"
                    : null,
            password: (value) => {
                if (value.length < 6) {
                    return "Password should be at least 6 characters long"
                }
                if (!/\d/.test(value)) {
                    return "Password should contain at least one digit"
                }
                if (!/[a-z]/.test(value)) {
                    return "Password should contain at least one lowercase letter"
                }
                if (!/[A-Z]/.test(value)) {
                    return "Password should contain at least one uppercase letter"
                }
                if (!/\W/.test(value)) {
                    return "Password should contain at least one special character"
                }
                return null
            },
        },
    })

    const [popoverOpened, { open: openPopover, close: closePopover }] =
        useDisclosure(false)

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(registerForm.values.password)}
        />
    ))

    const strength = getStrength(registerForm.values.password)
    const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red"
    const [loading, { close: closeLoading, open: openLoading }] =
        useDisclosure()

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        openLoading()
        closePopover()

        registerForm.validate()
        if (!registerForm.isValid()) {
            closeLoading()
            return
        }

        try {
            const data: AuthResponse = await instance
                .post("auth/register", {
                    json: registerForm.values as RegisterRequest,
                })
                .json()
            setUser(data.user)
            router.push("/auth/verify")
        } catch (error) {
            console.log(error)

            notifications.show({
                title: "Error",
                message: getServerErrorNoti(error),
                color: "red",
            })
        } finally {
            closeLoading()
        }
    }

    return (
        <>
            <Head>
                <title>Register | Qizz</title>
            </Head>
            <Flex align={"center"} justify={"center"} w={"100%"} h={"100vh"}>
                <Container size="xl">
                    <Paper
                        withBorder
                        shadow="md"
                        p={30}
                        mt={20}
                        radius="md"
                        w={"400px"}
                    >
                        <Title mb={16} order={2}>
                            <Link href="/">Qizz - Register</Link>
                        </Title>
                        <form onSubmit={handleRegister}>
                            <TextInput
                                label="Email"
                                placeholder="email@qizz.tech"
                                required
                                {...registerForm.getInputProps("email")}
                            />
                            <TextInput
                                label="Username"
                                placeholder="Your username"
                                required
                                mt="md"
                                {...registerForm.getInputProps("username")}
                            />
                            <Popover
                                opened={popoverOpened}
                                position="bottom"
                                width="target"
                                transitionProps={{ transition: "pop" }}
                            >
                                <Popover.Target>
                                    <div
                                        onFocusCapture={openPopover}
                                        onBlurCapture={closePopover}
                                    >
                                        <PasswordInput
                                            label="Password"
                                            placeholder="Your password"
                                            required
                                            mt="md"
                                            {...registerForm.getInputProps(
                                                "password"
                                            )}
                                        />
                                    </div>
                                </Popover.Target>
                                <Popover.Dropdown>
                                    <Progress
                                        color={color}
                                        value={strength}
                                        size={5}
                                        mb="xs"
                                    />
                                    <PasswordRequirement
                                        label="Includes at least 6 characters"
                                        meets={
                                            registerForm.values.password
                                                .length > 5
                                        }
                                    />
                                    {checks}
                                </Popover.Dropdown>
                            </Popover>
                            <Button
                                fullWidth
                                mt="xl"
                                mb={12}
                                loading={loading}
                                type="submit"
                            >
                                Register
                            </Button>
                        </form>
                        <Divider label="Or continue with" />
                        <Button
                            fullWidth
                            my="md"
                            variant="default"
                            leftSection={
                                <IconBrandGoogleFilled size={"1rem"} />
                            }
                            onClick={() =>
                                notifications.show({
                                    title: "Error",
                                    message:
                                        "This feature is not available yet",
                                    color: "red",
                                })
                            }
                        >
                            Google
                        </Button>
                        <Text c="dimmed" size="sm" ta="center" mt={5}>
                            Have account?{" "}
                            <Anchor
                                size="sm"
                                component={Link}
                                href={
                                    r ? ` /auth/login?r=${r} ` : "/auth/login"
                                }
                            >
                                Login now
                            </Anchor>
                        </Text>
                    </Paper>
                </Container>
            </Flex>
        </>
    )
}

export default RegisterPage
