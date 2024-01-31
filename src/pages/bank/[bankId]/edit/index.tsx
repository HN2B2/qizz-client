import { UserLayout } from "@/components/layouts";
import Question from "@/components/questions/Question";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Combobox,
  ComboboxItem,
  Container,
  CopyButton,
  Flex,
  Grid,
  Group,
  Image,
  Input,
  InputBase,
  Menu,
  MenuDropdown,
  Modal,
  Paper,
  Pill,
  PillsInput,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  rem,
  useCombobox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconArrowsLeftRight,
  IconListCheck,
  IconLock,
  IconMessageCircle,
  IconPencil,
  IconPhoto,
  IconPlus,
  IconRectangle,
  IconSearch,
  IconSettings,
  IconSquareCheck,
  IconTrash,
  IconUpload,
  IconWorld,
  IconX,
} from "@tabler/icons-react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import React, { useState } from "react";
import { modals } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";
import Sharing from "@/components/sharing/Sharing";
import ShareButton from "@/components/sharing/ShareButton";
import { QuestionType } from "@/types/question/QuestionType";
import CreateQuestionButton from "@/components/questions/createQuestions/CreateQuestionButton";
import type { Question, Question as QuestionData } from "@/types/question";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { instance } from "@/utils";
import { Bank } from "@/types/bank";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import { log } from "console";
const groceries = [
  "🍎 Apples",
  "🍌 Bananas",
  "🥦 Broccoli",
  "🥕 Carrots",
  "🍫 Chocolate",
];

interface Props {
  bankData: Bank;
  questionData: QuestionData[];
}

const EditBank = ({ bankData, questionData }: Props) => {
  console.log(bankData);
  const form = useForm({
    initialValues: {
      quizBankId: bankData.quizBankId,
      name: bankData.name,
      featuresImage: bankData.featuresImage,
      description: bankData.description,
      quizPublicity: bankData.quizPublicity,
      publicEditable: bankData.publicEditable,
      draft: bankData.draft,
      createdBy: bankData.createdBy,
      modifiedBy: bankData.modifiedBy,
      manageBanks: bankData.manageBanks,
      totalUpvotes: bankData.totalUpVotes,
      subCategories: bankData.subCategories,
      totalQuestions: bankData.totalQuestions,
      createdAt: bankData.createdAt,
      modifiedAt: bankData.modifiedAt,
      // email: "",
      // termsOfService: false,
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });
  const router = useRouter();
  const [bank, setBank] = useState<Bank>(bankData);
  const [image, setImage] = useState<FileWithPath[]>([]);

  const previews = image.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Image
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    );
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val)
        ? current.filter((v) => v !== val)
        : [...current, val]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = groceries
    .filter((item) => !value.includes(item))
    .map((item) => (
      <Combobox.Option value={item} key={item} active={value.includes(item)}>
        {item}
      </Combobox.Option>
    ));
  const handleSubmit = async (values: Bank) => {
    try {
      const body = {
        name: values.name,
        description: values.description,
        featuresImage: values.featuresImage,
        quizPublicity: values.quizPublicity,
        publicEditable: values.publicEditable,
        draft: false,
        //2 field email and editable of manageBank: ManageBank[]
        manageBanks: values.manageBanks?.map((item) => {
          return {
            email: item.user.email,
            editable: item.editable,
          };
        }),
      };
      console.log(body);

      const { data } = await instance.put(`/bank/${bankData.quizBankId}`, body);
      notifications.show({
        title: "Success",
        message: "Bank updated successfully",
        color: "green",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserLayout>
      <Container size="lg" bg={"transparent"}>
        <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
          <Grid.Col span={{ base: 12, sm: 8 }} order={{ base: 3, sm: 2 }}>
            <Group justify="space-between">
              <Flex p="sm">
                <IconListCheck></IconListCheck>
                <Text>{questionData.length} Questions</Text>
              </Flex>
              <CreateQuestionButton></CreateQuestionButton>
            </Group>
            {questionData.map((question) => (
              <Question
                key={question.questionId}
                type={question.type}
                data={question}
              />
            ))}
            {/* <Question
              type={QuestionType.MULTIPLE_CHOICE}
              data={dataQuestions[0]}
            />
            <Question
              type={QuestionType.FILL_IN_THE_BLANK}
              data={dataQuestions[1]}
            /> */}
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 4 }} order={{ base: 1, sm: 3 }}>
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
              <Dropzone
                accept={IMAGE_MIME_TYPE}
                onDrop={setImage}
                {...form.getInputProps("featuresImage")}
              >
                <Text ta="center">Drop images here</Text>
              </Dropzone>

              <SimpleGrid
                // cols={{ base: 1, sm: 4 }}
                mt={previews.length > 0 ? "xl" : 0}
              >
                {previews}
              </SimpleGrid>
              <TextInput
                label="Quiz Name"
                placeholder="Quiz Name"
                leftSection={<IconPencil size={"1rem"}></IconPencil>}
                variant="filled"
                {...form.getInputProps("name")}
                my={"md"}
              />

              <ShareButton bank={form.values} setBank={setBank}></ShareButton>
              <Text fw={500}>Choose sub category</Text>
              <Combobox
                store={combobox}
                onOptionSubmit={handleValueSelect}
                withinPortal={false}
              >
                <Combobox.DropdownTarget>
                  <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
                    <Pill.Group>
                      {values.length > 0 ? (
                        values
                      ) : (
                        <Input.Placeholder>
                          Pick one or more values
                        </Input.Placeholder>
                      )}

                      <Combobox.EventsTarget>
                        <PillsInput.Field
                          type="hidden"
                          onBlur={() => combobox.closeDropdown()}
                          onKeyDown={(event) => {
                            if (event.key === "Backspace") {
                              event.preventDefault();
                              handleValueRemove(value[value.length - 1]);
                            }
                          }}
                        />
                      </Combobox.EventsTarget>
                    </Pill.Group>
                  </PillsInput>
                </Combobox.DropdownTarget>

                <Combobox.Dropdown>
                  <Combobox.Options>
                    {options.length === 0 ? (
                      <Combobox.Empty>All options selected</Combobox.Empty>
                    ) : (
                      options
                    )}
                  </Combobox.Options>
                </Combobox.Dropdown>
              </Combobox>

              <Group justify="flex-end" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Grid.Col>
        </Grid>
      </Container>
    </UserLayout>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req, query } = context;
    // const { page = PAGE, keyword } = query;
    const res = await instance.get(`/bank/${query.bankId}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });
    const res1 = await instance.get(`/question/all/bankId/${query.bankId}`, {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie || "",
      },
    });
    const bankData = res.data;
    const questionData = res1.data;
    return {
      props: {
        bankData,
        questionData,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default EditBank;
