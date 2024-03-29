export const runtime = "experimental-edge"

import { instance } from "@/utils"
import { Button, Container, Stack, Text, Title } from "@mantine/core"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import Link from "next/link"
import React from "react"

const VerifyPage = () => {
    return (
        <>
            <Head>
                <title>Verify your account</title>
            </Head>
            <Container>
                <Stack align="center" mt={256}>
                    <Title>You have signed up successfully!</Title>
                    <Text size="lg" mb={32}>
                        Please check your email to verify your account.
                    </Text>
                    <Button size="lg" component={Link} href="/auth/login">
                        Click here to login
                    </Button>
                </Stack>
            </Container>
        </>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { token } = context.query
    if (token) {
        try {
            const response = await instance.post("auth/verify", {
                json: { token },
            })
            const setCookieHeader = response.headers.get("set-cookie")
            if (setCookieHeader) {
                context.res.setHeader("Set-Cookie", setCookieHeader)
            }
            return {
                redirect: {
                    destination: "/",
                    permanent: false,
                },
            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        props: {},
    }
}

export default VerifyPage
