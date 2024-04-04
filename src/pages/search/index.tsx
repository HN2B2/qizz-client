export const runtime = "experimental-edge";
import Head from "next/head";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import {
  ActionIcon,
  Checkbox,
  Divider,
  Grid,
  Group,
  Paper,
  Title,
} from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";
import { Breadcrumbs, Anchor } from "@mantine/core";
import { UseListStateHandlers, useListState } from "@mantine/hooks";
import { instance, removeEmpty } from "@/utils";
import { BreadCrumbsItem, UserLayout } from "@/components/layouts";
import { BankResponse } from "@/types/bank";
import {
  CategoryFilter,
  Filter,
  OrderBank,
  SearchBar,
  SearchTable,
  SortBank,
} from "@/components/search";

export const PAGE_SIZE = 2;
const breadcrumbsItems: BreadCrumbsItem[] = [
  { title: "Home", link: "/" },
  { title: "Search", link: "/search" },
];

interface Bank {
  data: BankResponse[];
  total: number;
}

interface BankPageProps {
  bankData: Bank;
}

interface Context {
  bankList: BankResponse[];
  handlers: UseListStateHandlers<BankResponse>;
  total: number;
}

export const BankDataContext = createContext<Context>({
  bankList: [],
  handlers: {} as UseListStateHandlers<BankResponse>,
  total: 0,
});

const BankPage = ({ bankData }: BankPageProps) => {
  const [bankList, handlers] = useListState(bankData.data);
  const [total, setTotal] = useState(bankData.total);
  console.log(total);

  const router = useRouter();
  const {
    page = "1",
    keyword,
    order,
    sort,
    subCategoryIds,
    mi,
    ma,
  } = router.query;

  const handleFetchBankData = async () => {
    try {
      const res: Bank = await instance
        .get(`bank`, {
          searchParams: removeEmpty({
            limit: PAGE_SIZE.toString(),
            page: page.toString(),
            keyword: keyword as string,
            order: order as string,
            sort: sort as string,
            subCategoryIds: subCategoryIds as string,
            mi: mi as string,
            ma: ma as string,
          }),
        })
        .json();
      const bankData = res;
      handlers.setState(bankData.data);
      setTotal(bankData.total);
    } catch (error) {
      console.error(error);
      // Consider showing an error message to the user here
    }
  };

  useEffect(() => {
    handleFetchBankData();
  }, [page, keyword, order, sort, subCategoryIds, mi, ma]);

  const handleReset = () => {
    router.push({
      pathname: "/search",
    });
  };

  return (
    <BankDataContext.Provider value={{ bankList, handlers, total }}>
      <UserLayout title="Bank" breadcrumbs={breadcrumbsItems}>
        <Paper p={"md"} my={"md"} shadow="sm">
          <Group justify="space-between">
            <SearchBar />
            <Group>
              <Group>
                <OrderBank />
                <SortBank />
                <ActionIcon color="red" size={"lg"} onClick={handleReset}>
                  <IconX size={"1rem"} />
                </ActionIcon>
              </Group>
            </Group>
            <Group />
          </Group>
        </Paper>
        <Grid>
          <Grid.Col span={2}>
            <Paper p={"md"} my={"md"} shadow="sm">
              <Group justify="space-between">
                <Group>
                  <Filter />
                  <CategoryFilter />
                </Group>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={10}>
            <Paper p={"md"} my={"md"} shadow="sm">
              <Group justify="space-between">
                <Group>
                  <SearchTable />
                </Group>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>
      </UserLayout>
    </BankDataContext.Provider>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { page = "1", keyword, order, sort, subCategoryIds } = context.query;
    const res: Bank = await instance
      .get(`manageBanks`, {
        searchParams: removeEmpty({
          limit: PAGE_SIZE.toString(),
          page: page as string,
          keyword: keyword as string,
          order: order as string,
          sort: sort as string,
          subCategoryIds: subCategoryIds as string,
        }),
        headers: {
          Cookie: context.req.headers.cookie || "",
        },
      })
      .json();
    const bankData = res.data;
    return {
      props: {
        bankData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
};
export default BankPage;
