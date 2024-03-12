import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useState } from "react";
import {
  Button,
  CheckIcon,
  Combobox,
  Flex,
  Group,
  Loader,
  Modal,
  Pill,
  PillsInput,
  Select,
  Stack,
  useCombobox,
} from "@mantine/core";
import { UserResponse } from "@/types/user";
import { instance } from "@/utils";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { BankResponse } from "@/types/bank";

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

const AddSharingModal = ({
  opened,
  email,
  bank,
  setBank,
}: {
  opened: boolean;
  email: string;
  bank: BankResponse;
  setBank: Dispatch<SetStateAction<BankResponse>>;
}) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string[]>([email]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[] | null>(null);
  const [empty, setEmpty] = useState(false);
  const abortController = useRef<AbortController>();
  const [editable, setEditable] = useState(true);
  const [openedd, { open, close }] = useDisclosure(opened);
  const [manageBanks, setManageBanks] = useState(
    (bank.manageBanks !== undefined &&
      bank.manageBanks.length > 0 &&
      bank.manageBanks.map((item) => item.user.email).join(",")) ||
      ""
  );
  useEffect(() => {
    opened ? open() : close();
  }, [opened]);

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
  const handleValueSelect = (val: string) => {
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );
  };
  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = (data || []).map((item) => (
    <Combobox.Option value={item} key={item} active={value.includes(item)}>
      <Group gap="sm">
        {value.includes(item) ? <CheckIcon size={12} /> : null}
        <span>{item}</span>
      </Group>
    </Combobox.Option>
  ));
  const handleSave = async () => {
    //post request using instance.post
    try {
      for (const iterator of value) {
        await instance.post(`/manageBank/bankId/${bank.quizBankId}`, {
          email: iterator,
          editable: editable,
        });
      }

      const { data } = await instance.get(`/bank/${bank.quizBankId}`);
      setBank(data);
      notifications.show({
        color: "green",
        title: "SUCCESS",
        message: "Save successfully",
      });
      close();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "ERROR",
        message: "Failed to save",
      });
    }
  };
  return (
    <Modal opened={openedd} onClose={close} title="Authentication">
      <Flex justify="space-between">
        <Combobox
          store={combobox}
          onOptionSubmit={handleValueSelect}
          // withinPortal={false}
        >
          <Combobox.DropdownTarget>
            <PillsInput onClick={() => combobox.openDropdown()}>
              <Pill.Group>
                {values}

                <Combobox.EventsTarget>
                  <PillsInput.Field
                    // onFocus={() => combobox.openDropdown()}
                    onFocus={(event) => {
                      combobox.openDropdown();
                      if (data === null) {
                        fetchOptions(event.currentTarget.value);
                      }
                    }}
                    onBlur={() => combobox.closeDropdown()}
                    value={search}
                    placeholder="Search values"
                    onChange={(event) => {
                      //   setValue([...value, event.currentTarget.value]);
                      fetchOptions(event.currentTarget.value);
                      combobox.updateSelectedOptionIndex();
                      setSearch(event.currentTarget.value);
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Backspace" && search.length === 0) {
                        event.preventDefault();
                        handleValueRemove(value[value.length - 1]);
                      }
                    }}
                  />
                </Combobox.EventsTarget>
                {loading && <Loader size={18} />}
              </Pill.Group>
            </PillsInput>
          </Combobox.DropdownTarget>

          <Combobox.Dropdown>
            <Combobox.Options>
              {options}
              {empty && <Combobox.Empty>No results found</Combobox.Empty>}
            </Combobox.Options>
          </Combobox.Dropdown>
        </Combobox>
        <Select
          w={90}
          variant="filled"
          placeholder="Pick value"
          data={["Edit", "View"]}
          defaultValue={"Edit"}
          allowDeselect={false}
          onChange={(value) => {
            if (value === "Edit") {
              setEditable(true);
            } else {
              setEditable(false);
            }
          }}
        />
      </Flex>

      <Group mt={"lg"} justify="space-between">
        <Button
          onClick={() => {
            close();
          }}
        >
          Cancel
        </Button>
        <Button onClick={() => handleSave()}>Save</Button>
      </Group>
    </Modal>
  );
};

export default AddSharingModal;
