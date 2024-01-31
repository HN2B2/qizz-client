import { Button, TagsInput, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import React, { useState } from "react";
interface Props {
  value: string;
}
const AddSharing = () => {
  const [value, setValue] = useState("");
  const openModal = () =>
    modals.openConfirmModal({
      title: "Please confirm your action",
      children: <TagsInput defaultValue={[value]} clearable></TagsInput>,
      labels: { confirm: "Confirm", cancel: "Cancel" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  const handleSubmit = () => {
    // const manageBanks = [
    //   ...(bankData.manageBanks || []),
    //   {
    //     manageBankId: 1,
    //     createdAt: "",
    //     modifiedAt: "",
    //     user: {
    //       id: 1,
    //       email: value,
    //       displayName: "",
    //       createdAt: "",
    //       modifiedAt: "",
    //       role: UserRole.USER,
    //       username: "",
    //     },
    //     editable: true,
    //   },
    // ];
    // // Update bankData with the new manageBanks array
    // setBankData({ ...bankData, manageBanks });
    // console.log(bankData); // Logging immediately after setBankData might not reflect the updated state
    // // openModal();
    // <AddSharing></AddSharing>;
  };
  return (
    <>
      <TextInput
        variant="default"
        placeholder="Add email or username"
        // value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={getHotkeyHandler([
          [
            "Enter",
            () => {
              //   handleSubmit();
              console.log("Enter pressed");
              //   modals.close;
            },
          ],
        ])}
      ></TextInput>
    </>
  );
};

export default AddSharing;
