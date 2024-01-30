import { UserResponse, UserStats } from "@/types/user";
import { Button, Divider, Flex, Stack, TextInput } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit } from "@tabler/icons-react";
import React from "react";
interface UserProfileProps {
  user: UserResponse;
  stats: UserStats;
}
const EditProfileBtn = ({ user, stats }: UserProfileProps) => {
  const editProfileModal = () =>
    modals.openConfirmModal({
      title: "Edit your profile",
      children: (
        <Stack>
          <Divider my="sm" mb={0} />
          <Flex justify={"space-between"}>
            <TextInput
              variant="default"
              label="Display Name"
              defaultValue={user.displayName}
            />
            <TextInput
              variant="default"
              label="User Name"
              defaultValue={user.username}
            />
          </Flex>
          <TextInput
            variant="default"
            label="Email"
            defaultValue={user.email}
            disabled
            w={"100%"}
          />
          {/* <Flex justify="right" gap={10}>
            <Button variant="light" onClick={close}>
              Cancel
            </Button>
            <Button
              variant="gradient"
              gradient={{
                from: "blue",
                to: "cyan",
                deg: 90,
              }}
            >
              Save
            </Button>
          </Flex> */}
        </Stack>
      ),
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  return (
    <Button
      variant="light"
      leftSection={<IconEdit size={14} />}
      onClick={editProfileModal}
      mt={10}
    >
      Edit profile
    </Button>
  );
};

export default EditProfileBtn;
