import React, { useEffect, useState } from "react";
import DonateBtn from "../../../../components/donate-btn";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Grid,
  Text,
  Input,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function PaymentContent({}) {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = React.useRef();
  const onPaymentModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="content">
        <h3>PAY FOR YOUR TITHE AND OFFERINGS EASILY</h3>
        <form id="pay-form">
          <div className="row w-100">
            <div className="col row">
              <Flex alignItems={"center"} mt={4}>
                <span className="select-action">Select Action</span>
                <Menu>
                  <MenuButton
                    bg={"#E3E3E7"}
                    borderRadius={0}
                    as={Button}
                    rightIcon={
                      <ChevronDownIcon color="black" fontSize="30px" />
                    }
                    px={8}
                    py={8}
                  >
                    <span className="select-action">Tithe</span>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Offering</MenuItem>
                    <MenuItem>Tithe</MenuItem>
                    <MenuItem>Donation</MenuItem>
                    <MenuItem>Product</MenuItem>
                    <MenuItem>Ticket</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </div>
            <div className="col row">
              <Flex alignItems={"center"} mt={4}>
                <span className="select-action">Payment option</span>
                <Menu>
                  <MenuButton
                    bg={"#E3E3E7"}
                    borderRadius={0}
                    as={Button}
                    rightIcon={
                      <ChevronDownIcon color="black" fontSize="30px" />
                    }
                    px={8}
                    py={8}
                  >
                    <span className="select-action">Online</span>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Offline</MenuItem>
                    <MenuItem>Online</MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </div>
          </div>

          <div className="row w-100">
            <div className="input col" style={{ marginTop: "10px" }}>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" />
            </div>

            <div className="input col" style={{ marginTop: "10px" }}>
              <div className="payment box">
                <Grid gridTemplateColumns={"150px 1fr"}>
                  <Flex justifyContent="center" alignItems="center">
                    <div className="mr-2 span-first">Amount:</div>
                  </Flex>
                  <div style={{ background: "#f1f1f1", padding: "0 1rem" }}>
                    <Flex alignItems="center">
                      <div>&#8358;</div>
                      <input type="number" className="amount_input" />
                    </Flex>
                  </div>
                </Grid>
              </div>
            </div>
          </div>

          <Flex alignSelf="flex-end" onClick={() => setIsOpen(true)}>
            <button type="button" id="donate" className="button">
              <i
                className="fa fa-gift"
                aria-hidden="true"
                style={{ marginRight: ".5rem" }}
              ></i>
              Pay
            </button>
          </Flex>
        </form>
      </section>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onPaymentModalClose}
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            <Flex
              alignItems="center"
              border="0.5px solid #D7D7D7"
              width="max-content"
            >
              <Text px={2}>&#8358;</Text>
              <Text bg="#F1F1F1" px={2} py={1}>
                1000
              </Text>
            </Flex>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <h3>Select Payment Method</h3>
            <Flex gap="2rem" mb={8}>
              <Flex gap={2} alignItems="center">
                <input type="radio" name="payment-method" id="flutter" />
                <Text>Flutter wave</Text>
              </Flex>

              <Flex gap={2} alignItems="center">
                <input type="radio" name="payment-method" id="flutter" />
                <Text>Pay Offline</Text>
              </Flex>
            </Flex>
            <h3>Personal Info</h3>

            <Grid gridTemplateColumns="1fr 1fr" gap={"1rem"} mt={4}>
              <Flex flexDir="column">
                <Text color="#6C6C6C">First Name </Text>
                <Input
                  bg="#F1F1F1"
                  p={3}
                  mt={2}
                  borderRadius="none"
                  border={0}
                  type="text"
                  name="fname"
                  id=""
                  placeholder="First Name"
                />
              </Flex>
              <Flex flexDir="column">
                <Text color="#6C6C6C">Last Name</Text>
                <Input
                  bg="#F1F1F1"
                  p={3}
                  mt={2}
                  borderRadius="none"
                  border={0}
                  type="text"
                  name="fname"
                  id=""
                  placeholder="Last Name"
                />
              </Flex>

              <Flex flexDir="column" gridColumn="1/-1">
                <Text color="#6C6C6C">Email Address</Text>
                <Input
                  bg="#F1F1F1"
                  p={3}
                  mt={2}
                  borderRadius="none"
                  border={0}
                  type="text"
                  name="email"
                  id=""
                  placeholder="Email Address"
                />
              </Flex>
            </Grid>
            <Flex
              alignItems="center"
              border="0.5px solid #D7D7D7"
              width="max-content"
              my={8}
            >
              <Text px={2}>Donation Amount:</Text>
              <Text bg="#F1F1F1" px={2} py={1}>
                &#8358; 1000
              </Text>
            </Flex>
          </AlertDialogBody>
          <AlertDialogFooter>
            <button type="button" id="donate" className="button">
              <i
                className="fa fa-gift"
                aria-hidden="true"
                style={{ marginRight: ".5rem" }}
              ></i>
              Pay
            </button>
            {/* <DonateBtn
              className={"button"}
              style={{ color: "white", padding: "12px 16px" }}
              labelStyle={{ color: "white" }}
              onClick={() => {}}
            /> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <div id="success__modal" className="success__modal">
              <div className="image">
                <img src="/images/donation-thanks.png" alt="" srcSet="" />
              </div>
              <h5>We Thank You For Donation </h5>
              <p>
                Dolor sit amet, consectetur adipiscing elit, sed do eiusmo
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamo laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse.
              </p>
              <div className="btn-container mt-2">
                <button id="close-modal">
                  <span>Continue</span>
                </button>
              </div>
            </div> */}
    </>
  );
}
