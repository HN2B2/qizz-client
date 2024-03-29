import { Container, Title, Text, Button, Group, rem } from "@mantine/core"
import Illustration from "./Illustration"
import Head from "next/head"
import Link from "next/link"

export default function NothingFoundBackground() {
    return (
        <>
            <Head>
                <title>404</title>
            </Head>
            <Container py={rem("80px")}>
                <div className="relative">
                    <Illustration className="absolute inset-0 opacity-75 dark:text-neutral-700 text-neutral-200" />
                    <div className="pt-[220px] relative z-10">
                        <Title className="text-center font-extrabold text-4xl">
                            Nothing to see here
                        </Title>
                        <Text
                            c="dimmed"
                            size="lg"
                            ta="center"
                            maw={rem("540px")}
                            mt={32}
                            mb={48}
                            m={"auto"}
                        >
                            Page you are trying to open does not exist. You may
                            have mistyped the address, or the page has been
                            moved to another URL. If you think this is an error
                            contact support.
                        </Text>
                        <Group justify="center">
                            <Button
                                size="md"
                                component={Link}
                                href="/auth/logout"
                            >
                                Try login to another account
                            </Button>
                        </Group>
                    </div>
                </div>
            </Container>
        </>
    )
}
