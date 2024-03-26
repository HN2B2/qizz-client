import { UserLayout } from "@/components/layouts";
import QuestionPaper from "@/components/questions/QuestionPaper";
import {
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  InputBase,
  Pill,
  SimpleGrid,
  Text,
  TextInput,
  Title,
  useCombobox,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAdjustments,
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
import ShareButton from "@/components/sharing/ShareButton";
import CreateQuestionButton from "@/components/questions/createQuestions/CreateQuestionButton";
import type { QuestionResponse as QuestionData } from "@/types/question";
import { GetServerSidePropsContext } from "next";
import { instance } from "@/utils";
import { BankResponse } from "@/types/bank";
import { useRouter } from "next/router";
import { notifications } from "@mantine/notifications";
import CategoryDrawer from "@/components/category/CategoryDrawer";
import { checkEditable } from "..";
import useUser from "@/hooks/useUser";

interface Props {
  bankData: BankResponse;
  questionData: QuestionData[];
}

const EditBank = ({ bankData, questionData }: Props) => {
  // const { user } = useUser();

  const [bank, setBank] = useState<BankResponse>(bankData);
  const [question, setQuestion] = useState<QuestionData[]>(questionData);

  const form = useForm({
    initialValues: {
      quizBankId: bank.quizBankId,
      name: bank.name,
      featuresImage: bank.featuresImage,
      description: bank.description,
      quizPublicity: bank.quizPublicity,
      publicEditable: bank.publicEditable,
      draft: bank.draft,
      createdBy: bank.createdBy,
      modifiedBy: bank.modifiedBy,
      manageBanks: bank.manageBanks,
      totalUpvotes: bank.totalUpVotes,
      subCategories: bank.subCategories,
      totalQuestions: bank.totalQuestions,
      createdAt: bank.createdAt,
      modifiedAt: bank.modifiedAt,
      // email: "",
      // termsOfService: false,
    },

    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    // },
  });
  const router = useRouter();

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

  const handleSubmit = async (values: BankResponse) => {
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

      const { data } = await instance.put(`/bank/${bankData.quizBankId}`, body);
      notifications.show({
        title: "Success",
        message: "Bank updated successfully",
        color: "green",
      });
      router.push("/");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Something went wrong",
        color: "red",
      });
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
                <Text>{question.length} Questions</Text>
              </Flex>
              <CreateQuestionButton></CreateQuestionButton>
            </Group>
            {question.map((questionn, index) => (
              <QuestionPaper
                key={questionn.questionId}
                type={questionn.type}
                data={questionn}
                bankId={bank.quizBankId}
                setQuestion={setQuestion}
                index={index}
              />
            ))}
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

              <Title order={4} mt={"xl"}>
                Quiz Name
              </Title>
              <TextInput
                placeholder="Quiz Name"
                leftSection={<IconPencil size={"1rem"}></IconPencil>}
                variant="default"
                {...form.getInputProps("name")}
                w={"100%"}
                mt={"xs"}
              />

              <Title order={4} mt={"xl"}>
                Description
              </Title>
              <TextInput
                placeholder="Description"
                leftSection={<IconPencil size={"1rem"}></IconPencil>}
                variant="default"
                {...form.getInputProps("description")}
                w={"100%"}
                mt={"xs"}
              />

              <Group mt={"xl"} align="center">
                <Title order={4}>Publicity</Title>
                <ShareButton bank={form.values} setBank={setBank}></ShareButton>
              </Group>
              <Group mt={"xl"}>
                <Title order={4}>Choose Subcategories</Title>
                <CategoryDrawer bank={bank} setBank={setBank}></CategoryDrawer>
              </Group>

              <Flex>
                {bank.subCategories && bank.subCategories.length > 0 && (
                  <InputBase component="div" multiline w={"100%"} mt={"xs"}>
                    <Pill.Group>
                      {bank.subCategories?.map((item) => (
                        <Pill key={item.id}>{item.name}</Pill>
                      ))}
                    </Pill.Group>
                  </InputBase>
                )}
              </Flex>

              <Group justify="flex-end" mt="xl">
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
    // const { user } = useUser();
    const { req, query } = context;
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
    // if (!checkEditable(user, bankData)) {
    //   return {
    //     notFound: true,
    //   };
    // }
    return {
      props: {
        bankData,
        questionData,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default EditBank;
