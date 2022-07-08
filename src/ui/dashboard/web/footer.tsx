import React, { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Image from "next/image";
import { LiveStreamController } from "../../../controller/admin/livestream.controller";
import { LiveStreamDTO } from "../../../dto/LiveStream.dto";
import { ContactDto } from "../../../dto/contact.dto";
import { submitContactForm } from "../../../api/contact.api";
import { getSocialLinks } from "../../../api/branch.api";
import Logo from "../../../../public/images/KWLClogo.svg";

export default function HomePageFooter(props) {
  const _tmp: LiveStreamDTO[] = [];
  const [items, setItems] = useState(_tmp);

  const [name, setName] = useState("");

  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    controller.list(setItems);
  }, []);

  const [mediaLinks, setMediaLinks] = useState([]);

  const getMediaLink = useCallback(async () => {
    const res = await getSocialLinks();

    const socialLinks = await res.data;

    setMediaLinks(socialLinks);
  }, []);

  useEffect(() => {
    getMediaLink();
  }, []);

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const contactDto = new ContactDto({
        emailAddress: email,
        body: message,
        fullName: name,
        subject: "new subject",
      });
      const response = await submitContactForm(contactDto);

      if (!response.status) return;

      setName("");
      setEmail("");
      setMessage("");

      setIsLoading(false);

      alert("Form successfully submitted. we will be in touch shortly");
    } catch (error) {
      setIsLoading(false);
      console.log("error: ", error);
    }
  };

  const renderLinks = (media) => {
    switch (media.name.toLowerCase()) {
      case "twitter":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </a>
        );
      case "facebook":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-facebook" aria-hidden="true"></i>
          </a>
        );
      case "instagram":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-instagram" aria-hidden="true"></i>
          </a>
        );
      case "youtube":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-youtube" aria-hidden="true"></i>
          </a>
        );
      case "linkedln":
        return (
          <a href={media.link} target="_blank" rel="noreferrer">
            <i className="fa fa-linkedln" aria-hidden="true"></i>
          </a>
        );
      default:
        return null;
    }
  };

  const controller: LiveStreamController = new LiveStreamController();
  return (
    <footer className="footer_container">
      <div className="footer_col col_address">
        <div className="footer_header logo_text">
          <div className="footer_logo">
            <Image src={Logo} alt="KWLC Logo" />
          </div>
          <h5 className="section_subtitle">Kingdom Ways Living Church</h5>
        </div>
        <div className="contact_info">
          <div className="contact_row">
            <label className="label_icon">
              <i className="fa fa-phone" aria-hidden="true"></i>
            </label>
            <p className="contact_text">+ 234 70 433 2832</p>
          </div>

          <div className="contact_row">
            <label className="label_icon">
              <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
            </label>
            <p className="contact_text">
              24 Prince Ibrahim Eletu Avenue, Shoprite Circle Mall Road Jakande
              Bus Stop, Osapa London,Lagos
            </p>
          </div>

          <div className="contact_row">
            <label className="label_icon">
              <i className="fa fa-envelope" aria-hidden="true"></i>
            </label>
            <p className="contact_text">info@kwlchq.org</p>
          </div>
        </div>
      </div>

      <div className="footer_col">
        <div className="footer_header">
          <h4 className="section_title">Contact Us</h4>
        </div>
        <div className="contact_info">
          <form>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              id=""
              className="footerInput"
              value={name}
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              id=""
              className="footerInput"
              value={email}
            />
            <textarea
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              id=""
              rows={2}
              className="footerInput"
              value={message}
            ></textarea>
          </form>
          <button
            onClick={submitForm}
            className={isLoading ? "button button-deactive" : "button"}
          >
            Send
          </button>
        </div>
      </div>

      <div className="footer_col">
        <div className="footer_header">
          <h4 className="section_title">Up coming Events</h4>
        </div>

        {items.length > 0
          ? items.slice(0, 3).map((x, index) => {
              return (
                <div className="contact_col" key={index}>
                  <h4>{x.title}</h4>
                  <span className="contact_span">
                    July 7 @ 8:00 am - 10:30 am
                  </span>
                </div>
              );
            })
          : undefined}
      </div>

      <div className="footer_col">
        <div className="footer_header">
          <h4 className="section_title">Follow Us</h4>
        </div>
        <div className="contact_info txt_icons">
          {mediaLinks.map((item) => renderLinks(item))}
        </div>
      </div>
    </footer>
  );
}
