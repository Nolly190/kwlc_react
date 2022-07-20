import { Box, Button, Flex, Grid, Heading, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Layout from "../layout";
import { EventsResponse } from "../../../../types/appTypes";
import {
  FaCalendarAlt,
  FaChurch,
  FaPhoneAlt,
  FaTicketAlt,
} from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { AiFillClockCircle } from "react-icons/ai";
import { ImLocation } from "react-icons/im";
import { BiWorld } from "react-icons/bi";
import moment from "moment";
import bckImage from "../../../../../public/images/pexels-luis.png";

const SingleEventPage: React.FC<{ data: EventsResponse }> = ({ data }) => {
  return (
    <>
      <Layout
        externalStyles={[""]}
        navbar={"web"}
        title={"Single Event"}
        withFooter={true}
      >
        <Box height="45vh" width={"100vw"} position="relative">
          <Image
            src={data.event_Images[0]?.imageUrl || bckImage}
            alt="branch image"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Box py={10} px="70px" pb={20}>
          <Heading as="h1" size="4xl" noOfLines={1} mb="44px">
            {data.name}
          </Heading>
          <Text>{data.description}</Text>
          <Flex gap={8} mt="47px">
            <Button
              bg="black"
              textColor={"white"}
              py={8}
              px={20}
              borderRadius="10px"
            >
              + Google Calendar
            </Button>
            <Button
              bg="white"
              py={8}
              px={20}
              borderRadius="10px"
              border="1px solid #000000"
            >
              Buy Ticket
            </Button>
          </Flex>
          <Heading mt="40px" mb="69px">
            Event Details
          </Heading>
          <Grid
            templateColumns="1fr 1fr 1fr"
            gap={6}
            color="#5A5A5A"
            fontSize="20px"
          >
            <Flex alignItems="center" gap={2}>
              <Icon
                as={FaCalendarAlt}
                fill="#77B6D5"
                width="22px"
                height="20px"
              />{" "}
              {moment(data.date).format("DD. MM. yyyy")}
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Icon as={FaChurch} fill="#77B6D5" width="22px" height="20px" />{" "}
              {data.branchName}
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Icon as={IoIosMail} fill="#77B6D5" width="22px" height="22px" />{" "}
              kingdown@livingchurch.com
            </Flex>
            {/*  */}
            <Flex alignItems="center" gap={2}>
              <Icon
                as={AiFillClockCircle}
                fill="#77B6D5"
                width="22px"
                height="20px"
              />{" "}
              8:00 am - 10:30 am
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Icon as={ImLocation} fill="#77B6D5" width="22px" height="20px" />{" "}
              {data.address}
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Icon as={BiWorld} fill="#77B6D5" width="22px" height="22px" />{" "}
              https://kingdown.com
            </Flex>
            {/*  */}
            <Flex alignItems="center" gap={2}>
              <Icon as={ImLocation} fill="#77B6D5" width="22px" height="20px" />{" "}
              {data.location}
            </Flex>
            <Flex alignItems="center" gap={2}>
              <Icon as={FaPhoneAlt} fill="#77B6D5" width="22px" height="20px" />{" "}
              {data.phone}
            </Flex>
            <Flex alignItems="center" gap={2} fontWeight="bold">
              <Icon
                as={FaTicketAlt}
                fill="#77B6D5"
                width="22px"
                height="22px"
              />{" "}
              FREE
            </Flex>
          </Grid>
          {data.event_Images.length > 0 && (
            <Grid templateColumns="1fr 1fr" gap={10} mt="76px">
              {data.event_Images.map((ev, i) => (
                <Box key={i} position="relative" height={"500px"}>
                  <Image
                    src={ev.imageUrl}
                    alt="events"
                    layout="fill"
                    objectFit="cover"
                  />
                </Box>
              ))}
            </Grid>
          )}
        </Box>
      </Layout>
    </>
  );
};

export default SingleEventPage;
