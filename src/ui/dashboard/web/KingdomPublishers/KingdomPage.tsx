import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ConfirmPayment, getUserHistory } from "../../../../api/familyArea.api";
import DualRing from "../../../../components/loader";
import { KingdomPublisherConfirmPaymentDto } from "../../../../dto/familyArea.dto";
import { LoaderWrapper } from "../../admin/blog/getall";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Stack,
  Box,
  Flex,
} from "@chakra-ui/react";
import Layout from "../layout";
import moment from "moment";

interface Props {
  user: {
    uniqueId: string;
    amount: number;
    fullName: string;
    emailAddress: string;
    occupation: string;
    phone: number;
    currency: string;
  };
  contributions: {
    amountPaid: number;
    id: number;
    monthPaid: string;
    status: string;
  }[];
}

const KingdomPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [data, setData] = useState<Props>();

  const router = useRouter();

  const handlePayNow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsBtnLoading(true);
    const payload: KingdomPublisherConfirmPaymentDto = {
      uniqueId: data.user.uniqueId,
      amount: data.user.amount,
      date: new Date(),
    };
    const response = await ConfirmPayment(payload);
    if (response.status) {
      toast.success("Payment Successful");
    } else {
      toast.error(response.responseMessage);
    }
    setIsBtnLoading(false);
  };

  const fetch = async () => {
    try {
      setIsLoading(true);
      const res = await getUserHistory();
      const data = res.data.data;
      setData(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch();
    if (localStorage.getItem("kingdomData") === null) router.push("/web");
  }, [router]);
  return (
    <Layout
      externalStyles={[""]}
      navbar={"web"}
      title={"Kingdom Publisher"}
      withFooter={true}
    >
      <div className="live">
        <Box bg={"whitesmoke"} width="100vw" pt={10}>
          <Flex
            flexDir={"column"}
            justifyContent="space-between"
            boxShadow="base"
            bg={"white"}
            m={10}
            mt={0}
            borderRadius="lg"
          >
            <Stack
              bg="teal"
              borderRadius={"sm"}
              marginTop="-20px"
              padding={"15px"}
              mx={8}
            >
              <Flex
                justifyContent={"space-between"}
                color="white"
                // flexDir="column"
              >
                <Box color={"white"}>Kingdom Publisher History</Box>
                <Flex
                  justifyContent={"space-between"}
                  color="white"
                  flexDir="column"
                >
                  <Box>
                    <Box as="span" color="inherit" fontWeight="bold">
                      Unique Id:{" "}
                    </Box>
                    {data?.user.uniqueId}
                  </Box>
                  <Box>
                    <Box as="span" color="inherit" fontWeight="bold">
                      FullName:
                    </Box>{" "}
                    {data?.user.fullName}
                  </Box>
                  <Box>
                    <Box as="span" color="inherit" fontWeight="bold">
                      {" "}
                      Email:{" "}
                    </Box>{" "}
                    {data?.user.emailAddress}
                  </Box>
                  <Box>
                    <Box as="span" color="inherit" fontWeight="bold">
                      Occupation:{" "}
                    </Box>{" "}
                    {data?.user.occupation}
                  </Box>
                  <Box>
                    <Box as="span" color="inherit" fontWeight="bold">
                      Phone:{" "}
                    </Box>{" "}
                    {data?.user.phone}
                  </Box>
                  <Box>
                    <Box as="span" color="inherit" fontWeight="bold">
                      Amount:{" "}
                    </Box>{" "}
                    {data.user.currency.toUpperCase()} {data?.user.amount}
                  </Box>
                </Flex>
              </Flex>
              <Button width={"fit-content"} onClick={(e) => handlePayNow(e)}>
                {isBtnLoading ? (
                  <DualRing width="20px" height="20px" color="black" />
                ) : (
                  "Pay Now"
                )}
              </Button>
            </Stack>
            <TableContainer px={10}>
              {isLoading ? (
                <LoaderWrapper>
                  <DualRing width="40px" height="40px" color="#0b0146" />
                </LoaderWrapper>
              ) : (
                <>
                  {data?.contributions.length ? (
                    <Table variant={"striped"}>
                      <TableCaption> Kingdom Publisher History</TableCaption>
                      <Thead>
                        <Tr>
                          <Th>id</Th>
                          <Th isNumeric>amountPaid</Th>
                          <Th isNumeric>monthPaid</Th>
                          <Th>status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {data.contributions.map((item) => (
                          <Tr key={item.id}>
                            <Td>{item.id}</Td>
                            <Td isNumeric>{item.amountPaid}</Td>
                            <Td isNumeric>
                              {moment(item.monthPaid).format("DD MMM,yyyy")}
                            </Td>
                            <Td>{item.status}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  ) : (
                    <Box textAlign={"center"} my={8}>
                      No Contribution Data Available
                    </Box>
                  )}
                </>
              )}
            </TableContainer>
          </Flex>
        </Box>
      </div>
    </Layout>
  );
};

export default KingdomPage;
