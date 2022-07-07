import Image from "next/image";
import DonationPic from "../../../../../public/images/donation-hero-banner.png";

export default function PaymentBanner() {
  return (
    <div className="hero-banner-area">
      <Image
        src={DonationPic}
        alt=""
        layout="fill"
        placeholder="blur"
        blurDataURL=""
      />
      <div className="hero-banner-area-text">
        <h2>
          “A gift opens the way and ushers the giver into the presence of the
          great.”
        </h2>
        <span>Proverbs 18:16 </span>
      </div>
    </div>
  );
}
