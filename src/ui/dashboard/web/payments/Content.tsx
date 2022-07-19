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
  Spinner,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { toast } from "react-toastify";
import { PaymentDTO } from "../../../../dto/PaymentDTO";
import { makeDonationApi } from "../../../../api/donate.api";

export default function PaymentContent({}) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cancelRef = React.useRef();
  const onPaymentModalClose = () => {
    setIsOpen(false);
  };

  const clickedPay = () => {
    var emailRGEX = /^\S+@\S+\.\S+$/;
    var emailResult = emailRGEX.test(email);

    if (!emailResult) {
      return toast.error("Invalid Email Address");
    }

    if (amount.trim() === "") {
      return toast.error("Invalid Amount");
    }
    setIsOpen(true);
  };

  const processPayment = async () => {
    try {
      if (paymentOption.trim() === "") {
        return toast.error("Select Payment Method", {
          position: "top-right",
        });
      }
      if (firstName.trim() === "") {
        return toast.error("First name is required", {
          position: "top-right",
        });
      }
      if (lastname.trim() === "") {
        return toast.error("Last name is required", {
          position: "top-right",
        });
      }

      const payload: PaymentDTO = new PaymentDTO();
      payload.emailAddress = email;
      payload.amount = +amount;
      payload.paymentType = 3;
      payload.paymentMode = +paymentOption;
      payload.name = `${firstName} ${lastname}`;
      payload.phoneNumber = "";
      payload.productId = 0;
      payload.quantity = 1;

      setIsLoading(true);

      console.log("payload: ", payload);
      const response = await makeDonationApi(payload);
      setIsLoading(false);
      console.log("response: ", response);

      setIsOpen(false);

      if (paymentOption === "1") {
        return (window.location = response.data.data);
      }
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
      return toast.error("Something went wrong", {
        position: "top-right",
      });
    }
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
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
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
                      <input
                        type="number"
                        className="amount_input"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Flex>
                  </div>
                </Grid>
              </div>
            </div>
          </div>

          <Flex alignSelf="flex-end" onClick={clickedPay}>
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
                {amount}
              </Text>
            </Flex>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <h3>Select Payment Method</h3>
            <Flex gap="2rem" mb={8}>
              <Flex gap={2} alignItems="center">
                <input
                  type="radio"
                  name="payment-method"
                  id="flutter"
                  value="1"
                  onChange={(e) => setPaymentOption(e.target.value)}
                  checked={paymentOption === "1"}
                />
                <Text>Flutter wave</Text>
              </Flex>

              <Flex gap={2} alignItems="center">
                <input
                  type="radio"
                  name="payment-method"
                  id="offline"
                  value="2"
                  onChange={(e) => setPaymentOption(e.target.value)}
                  checked={paymentOption === "2"}
                />
                <Text>Paystack</Text>
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
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
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
                  value={email}
                  disabled
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
                &#8358; {amount}
              </Text>
            </Flex>
          </AlertDialogBody>
          <AlertDialogFooter>
            <button
              type="button"
              id="donate"
              className="button"
              onClick={processPayment}
            >
              {isLoading ? (
                <span style={{ padding: "0 8px" }}>
                  <Spinner />
                </span>
              ) : (
                <>
                  <i
                    className="fa fa-gift"
                    aria-hidden="true"
                    style={{ marginRight: ".5rem" }}
                  ></i>{" "}
                  Pay
                </>
              )}
            </button>
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
