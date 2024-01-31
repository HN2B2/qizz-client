import { getServerErrorNoti, instance } from "@/utils";
import { Button, Divider, Group, PasswordInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import React from "react";

const ChangePasswordForm = () => {
  const changePassWordForm = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      oldPassword: (value) => {
        if (value.length < 6) {
          return "Password should be at least 6 characters long";
        }
        if (!/\d/.test(value)) {
          return "Password should contain at least one digit";
        }
        if (!/[a-z]/.test(value)) {
          return "Password should contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password should contain at least one uppercase letter";
        }
        if (!/\W/.test(value)) {
          return "Password should contain at least one special character";
        }
        return null;
      },
      newPassword: (value) => {
        if (value.length < 6) {
          return "Password should be at least 6 characters long";
        }
        if (!/\d/.test(value)) {
          return "Password should contain at least one digit";
        }
        if (!/[a-z]/.test(value)) {
          return "Password should contain at least one lowercase letter";
        }
        if (!/[A-Z]/.test(value)) {
          return "Password should contain at least one uppercase letter";
        }
        if (!/\W/.test(value)) {
          return "Password should contain at least one special character";
        }
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.newPassword ? "Passwords did not match" : null,
    },
  });
  const handleChangePassword = async () => {
    changePassWordForm.validate();
    if (!changePassWordForm.isValid()) {
      return;
    }
    try {
      const { data } = await instance.put("/user/change-password", {
        oldPassword: changePassWordForm.values.oldPassword,
        newPassword: changePassWordForm.values.newPassword,
      });
      notifications.show({
        color: "green",
        title: "Success",
        message: "Change password successfully",
      });
      modals.closeAll();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: getServerErrorNoti(error),
      });
    }
  };
  return (
    <>
      <Stack>
        <Divider my="sm" mb={0} />
        <PasswordInput
          label="Old Password"
          {...changePassWordForm.getInputProps("oldPassword")}
        />
        <PasswordInput
          label="New Password"
          {...changePassWordForm.getInputProps("newPassword")}
        />
        <PasswordInput
          label="Confirm new password"
          {...changePassWordForm.getInputProps("confirmPassword")}
        />
      </Stack>
      <Group justify="end" mt={"md"}>
        <Button onClick={() => modals.closeAll()} variant="light">
          Cancel
        </Button>
        <Button
          onClick={handleChangePassword}
          variant="gradient"
          gradient={{
            from: "blue",
            to: "cyan",
            deg: 90,
          }}
        >
          Confirm
        </Button>
      </Group>
    </>
  );
};
const ChangePasswordBtn = () => {
  const changePasswordModal = () =>
    modals.open({
      title: "Change Password",
      children: <ChangePasswordForm />,
    });
  return (
    <Button
      variant="gradient"
      gradient={{
        from: "blue",
        to: "cyan",
        deg: 90,
      }}
      onClick={changePasswordModal}
    >
      Change Password
    </Button>
  );
};

export default ChangePasswordBtn;
