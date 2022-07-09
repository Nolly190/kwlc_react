import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import {
  AlertDialog,
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
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  KingdomPublisherLogin,
  KingdomPublisherRegister,
} from "../../../../api/familyArea.api";
import DonateBtn from "../../../../components/donate-btn";
import DualRing from "../../../../components/loader";
import {
  KingdomPublisherLoginDto,
  KingdomPublisherRegisterDto,
} from "../../../../dto/familyArea.dto";
import PrayerPic from "../../../../../public/images/prayer.png";
import BookPic from "../../../../../public/images/book.png";
import { StyledDonateBtn } from "../../../../../public/styles/css/trying";
import { writeToLocalStorage } from "../../../../utils";

export default function HomeFamilySection() {
  // <!-- family-section-start -->

  const [isKingdomPublishDialogOpen, setIsKingdomPublishDialogOpen] =
    useState(false);
  const [isFellowshipDialogOpen, setIsFellowshipDialogOpen] = useState(false);
  const [isBibleClassDialogOpen, setIsBibleClassDialogOpen] = useState(false);
  const [isRegistrationNotifyOpen, setIsRegistrationNotifyOpen] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // login
  const [TkpID, setTkpID] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  // register
  const [fullname, setFullname] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [residentCountry, setResidentCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [currency, setCurrency] = useState("");
  const [state, setState] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  //
  const router = useRouter();
  //
  const [isKingdomPublishDialogLoginOpen, setIsKingdomPublishDialogLoginOpen] =
    useState(false);
  const [
    isKingdomPublishDialogRegisterOpen,
    setIsKingdomPublishDialogRegisterOpen,
  ] = useState(false);

  const cancelRef2 = useRef();
  const cancelRef3 = useRef();
  const cancelRef4 = useRef();
  const cancelRef5 = useRef();

  const onKingdomPublisherClose = () => {
    setIsKingdomPublishDialogOpen(false);
  };
  const onFellowshipDialogClose = () => {
    setIsFellowshipDialogOpen(false);
  };
  const onBibleClassDialogClose = () => {
    setIsBibleClassDialogOpen(false);
  };
  const onRegistrationNotifyClose = () => {
    setIsRegistrationNotifyOpen(false);
  };

  const onKingdomPublisherLoginClose = () => {
    setIsKingdomPublishDialogLoginOpen(false);
  };
  const onKingdomPublisherRegisterClose = () => {
    setIsKingdomPublishDialogRegisterOpen(false);
  };

  const handleFormRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (phone.length < 11) {
      return toast.error("phone number must be at least 11 digits");
    }

    setIsLoading(true);
    const payload: KingdomPublisherRegisterDto = {
      emailAddress: emailRegister,
      fullname,
      phone,
      amount: Number(amount),
      maritalStatus,
      residentCountry,
      occupation,
      currency,
      state,
      dateOfBirth: new Date(dateOfBirth),
    };
    const response = await KingdomPublisherRegister(payload);
    if (response.status) {
      setTkpID(response.data);
      setEmailLogin(emailRegister);
      setIsKingdomPublishDialogRegisterOpen(false);
      setIsRegistrationNotifyOpen(true);
      setIsLoading(false);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  const handleFormLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    const payload: KingdomPublisherLoginDto = {
      uniqueId: TkpID,
      email: emailLogin,
    };
    const response = await KingdomPublisherLogin(payload);
    if (response.status) {
      writeToLocalStorage("userData", JSON.stringify({ token: response.data }));
      router.push("/web/kingdom");
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  return (
    <section className="family_section_area pr">
      <div className="shape-1">
        <svg
          width="222"
          height="202"
          viewBox="0 0 222 202"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M185.516 27.5409C204.782 40.0469 222.189 58.2989 221.175 76.2129C219.992 94.2959 200.219 111.872 187.037 131.983C173.686 152.094 167.095 174.909 150.871 188.598C134.478 202.287 108.283 207.019 93.4111 195.358C78.5391 183.528 74.9901 155.474 57.0761 131.983C39.1621 108.492 7.05212 89.5639 1.64412 67.5939C-3.76387 45.6239 17.5301 20.6119 42.3731 9.11993C67.2161 -2.37207 95.6081 -0.344072 120.282 4.04993C145.125 8.44393 166.081 15.0349 185.516 27.5409Z"
            fill="#77B6D5"
            fillOpacity="0.1"
          />
        </svg>
      </div>
      <div className="shape-2">
        <svg
          width="406"
          height="432"
          viewBox="0 0 406 432"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M140.77 21.3265C189.741 0.540493 247.336 -9.23182 280.416 15.9247C313.601 41.6246 321.727 102.359 343.26 153.723C364.573 205.412 399.837 247.626 405.098 296.51C410.141 345.719 385.287 402.142 343.631 415.586C301.65 428.812 243.19 399.279 174.88 403.237C106.57 407.195 28.6274 444.319 -20.5597 426.238C-69.7468 408.156 -90.1788 334.867 -80.0554 272.282C-69.932 209.696 -29.2533 157.814 11.1508 116.135C51.7739 74.1312 91.579 42.437 140.77 21.3265Z"
            fill="#77B6D5"
            fillOpacity="0.1"
          />
        </svg>
      </div>
      <h2>Join the family</h2>
      <div className="service_posts row justify_one">
        <div className="service_image">
          <Image
            className="family_img family-left"
            src={PrayerPic}
            alt="Family Image"
            placeholder="blur"
            blurDataURL={""}
          />
        </div>

        <div className="right_text">
          <h3>
            Fellowship with us in any <br /> of our branches{" "}
          </h3>
          <Button
            size="md"
            height="3.2rem"
            width="8rem"
            fontSize="14px"
            border="1px"
            outline="#000"
            background="transparent"
            color="#000"
            borderRadius="1.675rem"
            borderColor="black.500"
            onClick={() => setIsFellowshipDialogOpen(true)}
            style={{ margin: "1rem 0", padding: "0.75rem" }}
          >
            Learn more
          </Button>
        </div>
      </div>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onFellowshipDialogClose}
        isOpen={isFellowshipDialogOpen}
        leastDestructiveRef={cancelRef2}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader> Fellowship with us</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <div className="my-4"></div>
            <article className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </article>
            <div className="my-4"></div>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <div className="service_posts row justify_two">
        <div className="service_image">
          <Image
            className="family_img"
            src={BookPic}
            alt="Book Image"
            placeholder="blur"
            blurDataURL={""}
          />
        </div>
        <div className="right_text">
          <h3>Join our bible classes today </h3>
          <Button
            size="md"
            height="3.2rem"
            width="8rem"
            fontSize="14px"
            border="1px"
            outline="#000"
            background="transparent"
            color="#000"
            borderRadius="1.675rem"
            borderColor="black.500"
            onClick={() => setIsBibleClassDialogOpen(true)}
            style={{ margin: "1rem 0", padding: "0.75rem" }}
          >
            Learn more
          </Button>
        </div>
      </div>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onBibleClassDialogClose}
        isOpen={isBibleClassDialogOpen}
        leastDestructiveRef={cancelRef2}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Bible Classes</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <div className="my-4"></div>
            <article className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </article>
            <div className="my-4"></div>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
      <div className="service_posts row justify_one">
        <div className="service_image">
          <Image
            className="family_img family-left"
            src={PrayerPic}
            alt="Family Image"
            placeholder="blur"
            blurDataURL={""}
          />
        </div>

        <div className="right_text">
          <h3>The Kingdom Publishers Forum</h3>
          <Button
            size="md"
            height="3.2rem"
            width="8rem"
            fontSize="14px"
            border="1px"
            outline="#000"
            background="transparent"
            color="#000"
            borderRadius="1.675rem"
            borderColor="black.500"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={() => setIsKingdomPublishDialogOpen(true)}
            style={{ margin: "1rem 0", padding: "0.75rem" }}
          >
            Learn more
          </Button>
        </div>
      </div>
      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onKingdomPublisherClose}
        isOpen={isKingdomPublishDialogOpen}
        leastDestructiveRef={cancelRef2}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Kingdom Publishers</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <div className="my-4"></div>
            <article className="text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum
            </article>
            <div className="my-4"></div>
          </AlertDialogBody>
          <AlertDialogFooter bg={"#f1f1f1"}>
            <Stack direction="row" spacing={4}>
              <StyledDonateBtn>
                <DonateBtn
                  className={"btn"}
                  label="Register"
                  labelStyle={{ color: "black" }}
                  style={{ marginTop: 0 }}
                  withImg={false}
                  onClick={() => {
                    setIsKingdomPublishDialogOpen(false);
                    setIsKingdomPublishDialogRegisterOpen(true);
                  }}
                />
              </StyledDonateBtn>

              <StyledDonateBtn>
                <DonateBtn
                  className={"btn"}
                  label="Login"
                  labelStyle={{ color: "black" }}
                  style={{ marginTop: 0 }}
                  withImg={false}
                  onClick={() => {
                    setIsKingdomPublishDialogOpen(false);
                    setIsKingdomPublishDialogLoginOpen(true);
                  }}
                />
              </StyledDonateBtn>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onKingdomPublisherRegisterClose}
        isOpen={isKingdomPublishDialogRegisterOpen}
        leastDestructiveRef={cancelRef3}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader> Signup to Kingdom Publishers</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody style={{ marginBottom: 20 }}>
            <Stack direction="column" spacing={"4"}>
              <Stack direction="row" spacing={"4"}>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="email">Email address</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmailRegister(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={"4"}>
                <FormControl>
                  <FormLabel htmlFor="phone">Phonenumber</FormLabel>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="DOB">Age</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    id="DOB"
                    size="md"
                    backgroundColor="#ffffff"
                    type="date"
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={"4"}>
                <FormControl>
                  <FormLabel htmlFor="city">City</FormLabel>
                  <Input
                    id="city"
                    type="text"
                    placeholder="City"
                    onChange={(e) => setState(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="country">Country</FormLabel>
                  <Input
                    id="country"
                    type="text"
                    placeholder="Country"
                    onChange={(e) => setResidentCountry(e.target.value)}
                  />
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={"4"}>
                <FormControl>
                  <FormLabel htmlFor="occupation">Occupation</FormLabel>
                  <Input
                    id="occupation"
                    type="text"
                    placeholder="Occupation"
                    onChange={(e) => setOccupation(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="maritalStatus">Marital Status</FormLabel>
                  <Select
                    placeholder="Select option"
                    id="maritalStatus"
                    onChange={(e) => setMaritalStatus(e.target.value)}
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={"4"}>
                <FormControl>
                  <FormLabel htmlFor="currency">Currency</FormLabel>
                  <Select
                    placeholder="Select option"
                    id="currency"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="Dollars">Dollars</option>
                    <option value="Euros">Euros</option>
                    <option value="Pounds">Pounds</option>
                    <option value="Naira">Naira</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="amount">Contribution Amount</FormLabel>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="messenger" onClick={handleFormRegister}>
                {isLoading ? (
                  <DualRing width="20px" height="20px" color="#fff" />
                ) : (
                  "Signup"
                )}
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onRegistrationNotifyClose}
        isOpen={isRegistrationNotifyOpen}
        leastDestructiveRef={cancelRef5}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Registeration Successful!</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody style={{ marginBottom: 20 }}>
            Your TKP ID is: {TkpID}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="telegram" onClick={handleFormLogin}>
                {isLoading ? (
                  <DualRing width="20px" height="20px" color="#fff" />
                ) : (
                  "Login Now"
                )}
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        motionPreset="slideInBottom"
        onClose={onKingdomPublisherLoginClose}
        isOpen={isKingdomPublishDialogLoginOpen}
        leastDestructiveRef={cancelRef4}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Login to Kingdom Publisher</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody style={{ marginBottom: 20 }}>
            <Stack direction="column" spacing={"4"}>
              <FormControl>
                <FormLabel htmlFor="email">TKP ID</FormLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="TKP ID"
                  onChange={(e) => setTkpID(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="email">Email address/Phone</FormLabel>
                <Input
                  id="email"
                  type="text"
                  placeholder="Email/Phone"
                  onChange={(e) => setEmailLogin(e.target.value)}
                />
              </FormControl>
            </Stack>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Stack direction="row" spacing={4}>
              <Button colorScheme="telegram" onClick={handleFormLogin}>
                {isLoading ? (
                  <DualRing width="20px" height="20px" color="#fff" />
                ) : (
                  "Login"
                )}
              </Button>
            </Stack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
