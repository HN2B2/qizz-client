import BankCard from "@/components/cards/BankCard";
import QuizCard from "@/components/cards/QuizCard";
import { UserLayout } from "@/components/layouts";
import LibraryFilterSubcategories from "@/components/my-library/LibraryFilterSubcategories";
import LibraryOrder from "@/components/my-library/LibraryOrder";
import LibraryPagination from "@/components/my-library/LibraryPagination";
import LibrarySort from "@/components/my-library/LibrarySort";
import { BankResponse } from "@/types/bank";
import { Category, SubCategory } from "@/types/category";
import { instance, removeEmpty } from "@/utils";
import {
  ActionIcon,
  AppShell,
  Box,
  Burger,
  Button,
  CloseButton,
  Grid,
  Group,
  Input,
  Modal,
  MultiSelect,
  NavLink,
  Paper,
  Pill,
  PillsInput,
  Select,
  Skeleton,
  Tabs,
  TagsInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure, useListState } from "@mantine/hooks";
import {
  IconActivity,
  IconArrowAutofitUp,
  IconFingerprint,
  IconHeart,
  IconSearch,
  IconShare,
  IconThumbUp,
  IconThumbUpFilled,
  IconUser,
  IconWallpaper,
} from "@tabler/icons-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
export const PAGE_SIZE = 2;
const data = [
  {
    icon: IconUser,
    label: "Created by me",
    // description: "Item with description",
    value: "created",
  },
  {
    icon: IconHeart,
    label: "Liked by me",
    value: "liked",
    //   rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  { icon: IconShare, label: "Shared with me", value: "shared" },
  { icon: IconThumbUp, label: "Upvoted by me", value: "upvoted" },
  { icon: IconWallpaper, label: "All my contents", value: "all" },
];

const index = () => {
  const [active, setActive] = useState(0);
  const [value, setValue] = useState("");

  const [bankList, handlers] = useListState<BankResponse>([]);
  const [total, setTotal] = useState(0);
  const [activeTab, setActiveTab] = useState<string | null>("published");

  const router = useRouter();
  const {
    page = "1",
    keyword,
    order,
    sort,
    draft,
    subCategoryIds,
    tab = "created",
  } = router.query;

  const handleFetchCategoryData = async () => {
    try {
      const res: { data: BankResponse[]; total: number } = await instance
        .get(`bank/all`, {
          searchParams: removeEmpty({
            limit: PAGE_SIZE.toString(),
            page: page.toString(),
            keyword: keyword as string,
            order: order as string,
            sort: sort as string,
            draft: draft as string,
            subCategoryIds: subCategoryIds as string,
            tab: tab as string,
          }),
        })
        .json();
      const bankData = res;
      handlers.setState(bankData.data);
      setTotal(bankData.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchCategoryData();
  }, []);

  useEffect(() => {
    handleFetchCategoryData();
  }, [page, keyword, order, sort, draft, subCategoryIds, tab]);

  const handleActive = (index: number) => {
    setActive(index);
    router.push({
      pathname: "/my-library",
      query: {
        keyword,
        order,
        sort,
        page: "1",
        draft,
        subCategoryIds,
        tab: data[index].value,
      },
    });
  };

  const handleSearch = (value: string) => {
    setValue(value);
    router.push({
      pathname: "/my-library",
      query: {
        keyword: value,
        order,
        sort,
        page: "1",
        draft,
        subCategoryIds,
        tab,
      },
    });
  };

  const handleActiveTab = (value: string | null) => {
    setActiveTab(value);
    router.push({
      pathname: "/my-library",
      query: {
        keyword,
        order,
        sort,
        page: "1",
        draft: value === "published" ? false : true,
        subCategoryIds,
        tab,
      },
    });
  };

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      //   description={item.description}
      //   rightSection={item.rightSection}
      leftSection={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => handleActive(index)}
    />
  ));
  const totalPage = Math.ceil(total / PAGE_SIZE);
  return (
    <UserLayout>
      <Grid gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}>
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <Title order={3} mb={"md"}>
            My Library {total}
          </Title>
          <Box>{items}</Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 9 }}>
          <Tabs
            defaultValue="published"
            orientation="horizontal"
            w={"100%"}
            value={activeTab}
            onChange={handleActiveTab}
          >
            <Group justify="space-between" mb={"md"}>
              <TextInput
                placeholder="Search name"
                size="md"
                value={value}
                onChange={(event) => handleSearch(event.currentTarget.value)}
                rightSectionPointerEvents="all"
                // variant="light"
                // mt="md"
                rightSection={
                  <CloseButton
                    aria-label="Clear input"
                    onClick={() => setValue("")}
                    style={{ display: value ? undefined : "none" }}
                  />
                }
                leftSection={<IconSearch />}
              />
              <LibraryFilterSubcategories></LibraryFilterSubcategories>
            </Group>
            <Group justify="space-between" mb={"md"}>
              <Tabs.List>
                <Tabs.Tab value="published">Published</Tabs.Tab>
                <Tabs.Tab value="draft">Draft</Tabs.Tab>
              </Tabs.List>

              <Group>
                <LibraryOrder></LibraryOrder>
                <LibrarySort></LibrarySort>
              </Group>
            </Group>
            <Paper withBorder>
              <Tabs.Panel value="published">
                {bankList.map((item) => (
                  <BankCard key={item.quizBankId} bank={item}></BankCard>
                ))}
              </Tabs.Panel>
              <Tabs.Panel value="draft">
                {bankList.map((item) => (
                  <BankCard key={item.quizBankId} bank={item}></BankCard>
                ))}
              </Tabs.Panel>
            </Paper>
            <Group justify="center" my={"md"}>
              <LibraryPagination total={totalPage}></LibraryPagination>
            </Group>
          </Tabs>
        </Grid.Col>
      </Grid>
    </UserLayout>
  );
};

export default index;
