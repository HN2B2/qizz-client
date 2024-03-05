import { BankResponse } from "@/types/bank";
import { Combobox, Loader, TextInput, useCombobox } from "@mantine/core";
import { getHotkeyHandler, useDisclosure, useListState } from "@mantine/hooks";
import React, { useRef, useState } from "react";
import AddSharingModal from "./AddSharingModal";
import { instance } from "@/utils";
import { UserResponse } from "@/types/user";
interface Prop {
  bank: BankResponse;
  setBank: React.Dispatch<React.SetStateAction<BankResponse>>;
  closee: () => void;
}

function getAsyncData(
  searchQuery: string,
  signal: AbortSignal,
  manageBanks: string
) {
  return new Promise<string[]>((resolve, reject) => {
    signal.addEventListener("abort", () => {
      reject(new Error("Request aborted"));
    });

    setTimeout(async () => {
      try {
        const { data, status } = await instance.get(
          `/users/email?keyword=${searchQuery}${
            manageBanks === "" || manageBanks === undefined
              ? ""
              : `&manageBanks=${manageBanks}`
          }`
        );
        resolve(data.data.map((item: UserResponse) => item.email));
      } catch (error) {}
    }, Math.random() * 1000);
  });
}

const AddSharing = ({ bank, setBank, closee }: Prop) => {
  const [shareData, shareDataHandler] = useListState<string>([]);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | null>(null);
  const [value, setValue] = useState("");
  const [empty, setEmpty] = useState(false);
  const abortController = useRef<AbortController>();
  const [opened, { open, close }] = useDisclosure(false);
  const [manageBanks, setManageBanks] = useState(
    (bank.manageBanks !== undefined &&
      bank.manageBanks.length > 0 &&
      bank.manageBanks.map((item) => item.user.email).join(",")) ||
      ""
  );

  console.log(manageBanks);

  const fetchOptions = (query: string) => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    setLoading(true);
    setManageBanks(
      (prev) =>
        (bank.manageBanks !== undefined &&
          bank.manageBanks.length > 0 &&
          bank.manageBanks.map((item) => item.user.email).join(",")) ||
        ""
    );

    getAsyncData(query, abortController.current.signal, manageBanks)
      .then((result) => {
        setData(result);
        setLoading(false);
        setEmpty(result.length === 0);
        abortController.current = undefined;
      })
      .catch(() => {});
  };

  const options = (data || []).map((item) => (
    <Combobox.Option value={item} key={item} onClick={() => open()}>
      {item}
    </Combobox.Option>
  ));

  return (
    <>
      <Combobox
        onOptionSubmit={(optionValue) => {
          setValue(optionValue);
          combobox.closeDropdown();
        }}
        withinPortal={false}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            // label="Pick value or type anything"
            placeholder="Add people to send the link to"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              fetchOptions(event.currentTarget.value);
              combobox.resetSelectedOption();
              combobox.openDropdown();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => {
              combobox.openDropdown();
              if (data === null) {
                fetchOptions(value);
              }
            }}
            onBlur={() => combobox.closeDropdown()}
            rightSection={loading && <Loader size={18} />}
            onKeyDown={getHotkeyHandler([
              [
                "Enter",
                () => {
                  open();
                },
              ],
            ])}
          />
        </Combobox.Target>

        <Combobox.Dropdown hidden={data === null}>
          <Combobox.Options>
            {options}
            {empty && <Combobox.Empty>No results found</Combobox.Empty>}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>

      {opened && (
        <AddSharingModal
          opened={opened}
          email={value}
          bank={bank}
          setBank={setBank}
        ></AddSharingModal>
      )}
    </>
  );
};

export default AddSharing;
