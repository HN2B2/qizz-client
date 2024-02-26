import { AuthResponse } from "@/types/auth"
import { QuizResponse } from "@/types/quiz"
import { getServerErrorNoti, instance } from "@/utils"
import { Button, Paper, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconDeviceGamepad } from "@tabler/icons-react"
import { GetServerSidePropsContext } from "next"
import { useRouter } from "next/router"

interface PreparePageProps {
    quiz: QuizResponse
}

const PreparePage = ({ quiz }: PreparePageProps) => {
    const [loading, { close: closeLoading, open: openLoading }] =
        useDisclosure()
    const nameForm = useForm({
        initialValues: {
            name: "",
        },
        validate: {
            name: (value) => {
                if (value.length < 3) {
                    return "Name should be at least 3 characters long"
                }
                if (!value.match(/^[a-zA-Z0-9 ]+$/)) {
                    return "Name should contain only letters and numbers"
                }
                return null
            },
        },
    })

    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        openLoading()
        nameForm.validate()
        if (!nameForm.isValid()) {
            closeLoading()
            return
        }
        try {
            const { data }: { data: AuthResponse } = await instance.post(
                `/auth/create-guest`,
                {
                    displayName: nameForm.values.name,
                }
            )
            router.push(`/play/${quiz.code}`)
        } catch (error) {
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
        <main className="min-h-screen bg-[url('/bg/takequiz.jpg')] bg-no-repeat bg-center bg-cover flex items-center justify-center">
            <Paper p="md" radius="md" w={500}>
                <form onSubmit={handleSubmit}>
                    <TextInput
                        label="Enter your name"
                        size="xl"
                        mb={16}
                        {...nameForm.getInputProps("name")}
                    />
                    <Button
                        fullWidth
                        leftSection={<IconDeviceGamepad />}
                        size="xl"
                        color="green"
                        type="submit"
                        loading={loading}
                    >
                        Start!
                    </Button>
                </form>
            </Paper>
        </main>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { code } = context.query
    const token = context.req.cookies.user
    try {
        const { data: quiz }: { data: QuizResponse } = await instance.get(
            `/quiz/code/${code}`
        )

        if (token) {
            return {
                redirect: {
                    destination: `/play/${quiz.code}`,
                    permanent: false,
                },
            }
        }

        return {
            props: {
                quiz,
            },
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default PreparePage
