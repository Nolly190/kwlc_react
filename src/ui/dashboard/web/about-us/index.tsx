import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react";
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
import bannerImage from "../../../../../public/images/donation-hero-banner.png";

const About = () => {
  return (
    <>
      <Layout
        externalStyles={[""]}
        navbar={"web"}
        title={"Single Event"}
        withFooter={true}
      >
        <Box
          height="45vh"
          width={"100vw"}
          position="relative"
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            src={bannerImage}
            alt="branch image"
            layout="fill"
            objectFit="cover"
            style={{
              zIndex: "-10",
            }}
          />
          <Text color={"white"} fontSize={40} fontWeight={700}>
            We are happy to tell you more about ourself
          </Text>
        </Box>
        <Box py={10} px="70px" pb={20}>
          <Heading
            as="h1"
            size="4xl"
            noOfLines={1}
            mb="44px"
            textAlign={"center"}
          >
            About us
          </Heading>
          <Center textAlign={"center"}>
            Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse. Dolor sit amet, consectetur
            adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamo laboris nisi ut aliquip ex ea commodo consequat. Dolor sit
            amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo
            consequat. Dolor sit amet, consectetur adipiscing elit, sed do
            eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse. Dolor sit amet, consectetur
            adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse. Dolor sit
            amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo
            consequat.
          </Center>
          <Grid templateColumns="1fr 1fr" gap={10} mt="76px">
            <Box position="relative" height={"500px"}>
              <Image
                src={bckImage}
                alt="events"
                layout="fill"
                objectFit="cover"
              />
            </Box>
            <Box position="relative" height={"500px"}>
              <Image
                src={bckImage}
                alt="events"
                layout="fill"
                objectFit="cover"
              />
            </Box>
          </Grid>
        </Box>
      </Layout>
    </>
  );
};

export default About;
