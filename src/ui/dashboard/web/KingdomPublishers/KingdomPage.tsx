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
  Tfoot,
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

const KingdomPage = ({ data }) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  const [items, setItems] = useState([]);
  const router = useRouter();

  const handlePayNow = async (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    // const payload: KingdomPublisherConfirmPaymentDto = {
    //   uniqueId: string,
    // amount: 0,
    //   date: new Date()
    // };
    // const response = await ConfirmPayment(payload);
    // console.log(response, payload, "ppp loogg");
    // if (response.status) {
    //   toast.success(response.responseMessage);
    // } else {
    //   toast.error(response.responseMessage);
    // }
    setIsLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("userData") === null) router.push("/web");
  }, [router]);
  return (
    <Box bg={"whitesmoke"} width="100vw" height={"100vh"} pt={10}>
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
          <Box color={"white"}>Kingdom Publisher History</Box>
          <Button width={"fit-content"}>Pay Now</Button>
        </Stack>
        <TableContainer px={10}>
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
              <Tr>
                <Td>inches</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td>millimetres (mm)</Td>
              </Tr>
              <Tr>
                <Td>inches</Td>
                <Td isNumeric>25.4</Td>
                <Td isNumeric>25.4</Td>
                <Td>millimetres (mm)</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Box>

    // <div className="row">
    //   <div className="col-md-12">
    //     <div className="card">
    //       <div className="card-header card-header-primary">
    //         <div className="nav-tabs-navigation">
    //           <div className="nav-tabs-wrapper">
    //             <span className="nav-tabs-title">
    //               Kingdom Publisher History
    //             </span>
    //             <ul className="nav nav-tabs" data-tabs="tabs">
    //               <li className="nav-item" onClick={(e) => handlePayNow(e)}>
    //                 <a className="nav-link active" data-toggle="tab">
    //                   Pay Now
    //                 </a>
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="card-body">
    //         <div className="col-xl-8 col-md-6" id="spinner_loader"></div>
    //         <div className="table-responsive" id="table_div">
    //           {isLoading ? (
    //             <LoaderWrapper>
    //               <DualRing width="40px" height="40px" color="#0b0146" />
    //             </LoaderWrapper>
    //           ) : (
    //             <table className="table">
    //               <thead className=" text-primary">
    //                 <th>Title</th>
    //                 <th>State</th>
    //                 <th>Pastor</th>
    //                 <th>Is HQ</th>
    //                 <th>Date Created</th>
    //                 <th></th>
    //                 <th></th>
    //               </thead>
    //               <tbody id="tbody">
    //                 {items?.length > 0 ? (
    //                   items.map((x, index) => {
    //                     return (
    //                       <tr key={index}>
    //                         <td>{x.name}</td>
    //                         <td> {x.state}</td>
    //                         <td>
    //                           yyyy
    //                           {/* {branchController.renderPastor(pastors, x.id)} */}
    //                         </td>
    //                         <td> {x.isBranchHq ? "Yes" : "No"}</td>
    //                         <td>
    //                           kjnjknnjk
    //                           {/* {moment(x.dateCreated).format("DD/MMM/yyyy")} */}
    //                         </td>
    //                       </tr>
    //                     );
    //                   })
    //                 ) : (
    //                   <div>no data available</div>
    //                 )}
    //               </tbody>
    //             </table>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default KingdomPage;
