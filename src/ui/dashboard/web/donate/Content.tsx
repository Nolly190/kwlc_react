import React, { useEffect, useState } from "react";
import DonateBtn from "../../../../components/donate-btn";
import { getParam } from "../../../../utils";
import DonateItemDTO from "../../../../dto/Donate.dto";
import { loadSingleDonation } from "../../../../controller/donation.controller";
import { useRouter } from "next/router";
import {
  AlertDialog,
  Button,
  AlertDialogOverlay,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  RadioGroup,
  Stack,
  Radio,
  useToast,
} from "@chakra-ui/react";
import { makeDonationApi } from "../../../../api/donate.api";
import { PaymentDTO } from "../../../../dto/PaymentDTO";

export let DonationsModel: DonateItemDTO[] = [
  {
    title: "Build church school",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/build-church-schools.jpg",
    id: 1,
    images: [
      "/images/project-1.jpg",
      "/images/project-2.jpg",
      "/images/project-2.jpg",
      "/images/project-1.jpg",
    ],
    raised: 2300000,
    target: 4300000,
  },
  {
    title: "Church building project",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/build-church-schools.jpg",
    id: 2,
    images: [
      "/images/project-1.jpg",
      "/images/project-2.jpg",
      "/images/project-2.jpg",
      "/images/project-1.jpg",
    ],
    target: 2300000,
    raised: 4300000,
  },
  {
    title: "Hospital building project",
    description:
      "Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse. Dolor sit amet, consectetur adipiscing elit, sed do eiusmo temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamo laboris nisi ut aliquip ex ea commodo consequat.",
    image: "/images/church-building.jpg",
    id: 3,
    images: [
      "/images/project-1.jpg",
      "/images/project-2.jpg",
      "/images/project-2.jpg",
      "/images/project-1.jpg",
    ],
    target: 2300000,
    raised: 5000000,
  },
];

export default function DonateContent() {
  const [item, setItem] = useState(new DonateItemDTO());
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const cancelRef = React.useRef();
  const cancelRef2 = React.useRef();

  const onPaymentModalClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const id: string = getParam("id");
    if (!id || id == undefined) {
      router.push("/web/");
    } else {
      loadSingleDonation(setItem, id);
    }
  }, []);

  const latestDonations: DonateItemDTO[] = DonationsModel;

  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentOption, setPaymentOption] = useState("1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSuccessModalOpen, setISuccessModalOpen] = useState(false);

  const toast = useToast({
    position: "top-right",
  });

  const [message, setMessage] = useState("");

  const processPayment = async () => {
    try {
      if (firstName.trim() === "") {
        return toast({
          status: "warning",
          isClosable: true,
          variant: "top-accent",
          title: "First name is required",
        });
      }
      if (lastName.trim() === "") {
        return toast({
          status: "warning",
          isClosable: true,
          variant: "top-accent",
          title: "Last name is required",
        });
      }
      if (email.trim() === "") {
        return toast({
          status: "warning",
          isClosable: true,
          variant: "top-accent",
          title: "Email is required",
        });
      }
      if (phoneNumber.trim() === "") {
        return toast({
          status: "warning",
          isClosable: true,
          variant: "top-accent",
          title: "Phone number is required",
        });
      }
      if (amount.trim() === "") {
        return toast({
          status: "warning",
          isClosable: true,
          variant: "top-accent",
          title: "Amount is required",
        });
      }
      if (!/^\d+$/.test(amount)) {
        return toast({
          status: "warning",
          isClosable: true,
          variant: "top-accent",
          title: "Amount is invalid",
        });
      }
      const payload: PaymentDTO = new PaymentDTO();
      payload.emailAddress = email;
      payload.amount = +amount;
      payload.paymentType = 3;
      payload.paymentMode = +paymentOption;
      payload.name = `${firstName} ${lastName}`;
      payload.phoneNumber = phoneNumber;
      payload.productId = 0;
      payload.quantity = 1;

      setIsLoading(true);

      console.log("payload: ", payload);
      const response = await makeDonationApi(payload);
      setIsLoading(false);
      console.log("response: ", response);

      setIsOpen(false);

      if (paymentOption === "1") {
        window.location = response.data.data;
        // setMessage("Your payment is successful ");
        // setISuccessModalOpen(true);
      }
      {
        setMessage(
          "Your payment is successful. Use this transaction references to complete payment: " +
            response.data.data
        );

        setISuccessModalOpen(true);
      }
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
      toast({
        status: "error",
        isClosable: true,
        variant: "top-accent",
        title: "Something went wrong",
      });
    }
  };

  const onPaymenSuccessModalClose = () => {
    setISuccessModalOpen(false);
  };

  return (
    <>
      <section className="content">
        <div className="grid">
          <div className="col image">
            <img src={item.image} alt="" srcSet="" />
          </div>
          <div className="main-content">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="btn-container">
              <DonateBtn
                className={"button"}
                style={{ color: "white" }}
                labelStyle={{ color: "white" }}
                onClick={() => setIsOpen(true)}
              />
              <DonateBtn
                className={"btn"}
                label="Share"
                labelStyle={{ color: "black" }}
                withImg={false}
                onClick={(e) => alert("clicked, do seomthing")}
              />
            </div>
          </div>
        </div>

        <div className="project_container">
          <h4>Pictures from the project</h4>
          <div className="project row">
            {item.images.length > 0
              ? item.images.map((x, index) => {
                  return <img key={index} src={x} alt="" />;
                })
              : undefined}
          </div>
        </div>
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
            <div className="donation-amount-header">
              <div className="donation-amount-header-currency">
                <span> &#8358; </span>
              </div>
              <h3 className="donation-amount-header-amount">
                {item.amount || "---"}
              </h3>
            </div>
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <h3>Select Payment Method</h3>

            <div className="my-4">
              <RadioGroup
                color="black"
                onChange={(value) => setPaymentOption(value)}
                defaultValue="1"
              >
                <Stack direction="row">
                  <Radio color={"black"} value="1">
                    <span style={{ color: "#6c6c6c" }}>Flutterwave</span>
                  </Radio>

                  <Radio color={"black"} value="2">
                    <span style={{ color: "#6c6c6c" }}>Pay Offline</span>
                  </Radio>
                </Stack>
              </RadioGroup>
            </div>
            <h3>Personal Info</h3>

            <form className="my-4">
              <Stack direction="row">
                <div className="donation-form-element">
                  <label>First name</label>
                  <input
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="donation-form-element">
                  <label>Last name</label>
                  <input
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </Stack>
              <div className="donation-form-element">
                <label>Phone number</label>
                <input
                  type={"tel"}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+234817111001"
                />
              </div>
              <div className="donation-form-element">
                <label>Email Address</label>
                <input
                  type={"email"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@yahoo.com"
                />
              </div>
              <div className="donation-amount-header">
                <div className="donation-amount-header-currency">
                  <span>Donation Amount</span>
                </div>
                <h3 className="donation-amount-header-amount">
                  &#8358;
                  <input
                    style={{
                      backgroundColor: "#f1f1f1",
                      outline: "none",
                      paddingLeft: 10,
                      fontSize: 15,
                    }}
                    type="number"
                    placeholder=""
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </h3>
              </div>
            </form>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onPaymentModalClose}>Close</Button>
            <DonateBtn
              className={"button"}
              style={{ color: "white", padding: "12px 16px" }}
              labelStyle={{ color: "white" }}
              onClick={() => processPayment()}
              isLoading={isLoading}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onPaymenSuccessModalClose}
        isOpen={isSuccessModalOpen}
        leastDestructiveRef={cancelRef2}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader></AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <h3 style={{ textAlign: "center" }}>
              We Thank You <br /> For Your Donation
            </h3>
            <div className="my-4"></div>
            <article className="text-center">{message}</article>
            <div className="my-4"></div>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onPaymenSuccessModalClose}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/* <section className="latest_container">
        <h3>LATEST DONATION</h3>
        <div className="latest_donation">
          {latestDonations.length > 0
            ? latestDonations
                .reverse()
                .slice(0, 2)
                .map((x, index) => {
                  return (
                    <DonantionItem
                      key={index}
                      img={x.image}
                      title={x.title}
                      target={x.target}
                      raised={x.raised}
                    />
                  );
                })
            : undefined}
        </div>
      </section> */}
    </>
  );
}

export const DonantionItem = ({ img, title, target, raised }) => {
  return (
    <div className="latest_card">
      <div className="image">
        <img src={img} alt="" />
      </div>

      <div className="project_content">
        <h3>{title}</h3>

        {/* <div className="row">
          <h4>Target:</h4>
          <span style={{ fontSize: 16 }}>
            <p>N {target}</p>
          </span>
        </div> */}

        {/* <div className="row">
          <h4>Target:</h4>
          <span style={{ fontSize: 16 }}>
            <p>N {target}</p>
          </span>
        </div> */}

        {/* <div className="row">
          <h4>Raised:</h4>
          <span style={{ fontSize: 16 }}>
            <p>N {raised}</p>
          </span>
        </div> */}
      </div>
    </div>
  );
};
