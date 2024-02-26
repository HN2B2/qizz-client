import { UserResponse, UserStats } from "@/types/user"
import { getServerErrorNoti, instance } from "@/utils"
import {
    Button,
    Divider,
    Flex,
    Group,
    Input,
    Select,
    Stack,
    TextInput,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { IconChevronDown, IconEdit } from "@tabler/icons-react"
import { log } from "console"
import React from "react"
interface UserProfileProps {
    user: UserResponse | null
}
const EditProfileForm = ({ user }: UserProfileProps) => {
    const editProfileForm = useForm({
        initialValues: {
            displayName: "",
            username: "",
            sex: "",
            birthDate: new Date(),
            phone: "",
        },
        validate: {
            displayName: (value) => {
                if (value.length < 6) {
                    return "Display name should be at least 6 characters long"
                }

                return null
            },
            username: (value) => {
                if (value.length < 6) {
                    return "Username should be at least 6 characters long"
                }
                if (value.includes(" ")) {
                    return "Username should not contain spaces"
                }
                return null
            },
            sex: (value) => {
                if (value != "male" && value != "female") {
                    return "Please select your gender"
                }
                return null
            },
            birthDate: (value) => {
                if (!value) {
                    return "Please select your birthdate"
                }
                return null
            },
            phone: (value) => {
                if (value.length != 10) {
                    return "Phone number should be 10 characters long"
                }
                if (!/^\d{10}$/.test(value)) {
                    return "Phone number should only contain number"
                }
                return null
            },
        },
    })

    const [loading, { open: openLoading, close: closeLoading }] =
        useDisclosure(false)

    const handleEditProfile = async () => {
        openLoading()
        editProfileForm.validate()
        if (!editProfileForm.isValid()) {
            closeLoading()
            return
        }
        const body = {
            displayName: editProfileForm.values.displayName,
            username: editProfileForm.values.username,
            metadata: [
                {
                    key: "sex",
                    value: editProfileForm.values.sex.toLowerCase(),
                },
                {
                    key: "birthDate",
                    value: editProfileForm.values.birthDate.toISOString(),
                },
                {
                    key: "phoneNumber",
                    value: editProfileForm.values.phone,
                },
            ],
        }

        try {
            const { data } = await instance.put("/user", body)
            notifications.show({
                color: "green",
                title: "Success",
                message: "Update profile successfully",
            })
            modals.closeAll()
        } catch (error) {
            notifications.show({
                color: "red",
                title: "Error",
                message: getServerErrorNoti(error),
            })
            console.log(error)
        } finally {
            closeLoading()
        }
    }
    return (
        <>
            <Stack>
                <Divider my="sm" mb={0} />
                <TextInput
                    variant="default"
                    label="Email"
                    defaultValue={user?.email}
                    disabled
                    w={"100%"}
                />
                <Group grow gap={8}>
                    <TextInput
                        variant="default"
                        label="Display Name"
                        placeholder={user?.displayName}
                        {...editProfileForm.getInputProps("displayName")}
                    />
                    <TextInput
                        variant="default"
                        label="Username"
                        placeholder={user?.username}
                        {...editProfileForm.getInputProps("username")}
                    />
                </Group>
                <DateInput
                    variant="default"
                    label="Date of birth"
                    {...editProfileForm.getInputProps("birthDate")}
                />
                <Input
                    component="select"
                    rightSection={<IconChevronDown size={14} stroke={1.5} />}
                    pointer
                    mt="md"
                    {...editProfileForm.getInputProps("sex")}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Input>

                <TextInput
                    variant="default"
                    label="Phone"
                    {...editProfileForm.getInputProps("phone")}
                />

                <Group justify="end" mt={"md"}>
                    <Button onClick={() => modals.closeAll()} variant="light">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleEditProfile}
                        variant="gradient"
                        gradient={{
                            from: "blue",
                            to: "cyan",
                            deg: 90,
                        }}
                        loading={loading}
                    >
                        Confirm
                    </Button>
                </Group>
            </Stack>
        </>
    )
}
const EditProfileBtn = ({ user }: UserProfileProps) => {
    const editProfileModal = () =>
        modals.open({
            title: "Edit your profile",
            children: <EditProfileForm user={user} />,
        })
    return (
        <Button
            variant="light"
            leftSection={<IconEdit size={14} />}
            onClick={editProfileModal}
            mt={10}
        >
            Edit profile
        </Button>
    )
}

export default EditProfileBtn
