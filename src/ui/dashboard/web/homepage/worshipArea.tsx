import Image from "next/image";
import { BranchDTO } from "../../../../dto/Branch.dto";
import bgPic from "../../../../../public/images/worship-1.png";
import { Flex } from "@chakra-ui/react";

export default function HomeWorshipArea({ branches }) {
  return (
    // <!-- Worship-section-area-start -->
    <section className="worship_section">
      <div className="worship_text">
        <h2>Worship with us today</h2>
        <p>Choose a branch closest to you</p>
      </div>
      <div className="service_posts row">
        {(branches as BranchDTO[])?.map((branch) => (
          <div className="worship_col" key={branch.id}>
            <div className="img_text">
              <Image className="service_img" src={bgPic} alt="worship Image" />
              <h4 className="worship_head">{branch.name}</h4>
            </div>
            <div className="worship_content">
              <Flex gap="8px" alignItems="center" justifyContent="center">
                {branch.services.map((item) => (
                  <h3 key={item.id}>
                    {item.day} <br></br> {item.time}
                  </h3>
                ))}
              </Flex>
              <p>
                {branch.address + ". " + branch.state + ", " + branch.location}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* <!-- Worship-section-area-end --> */}
    </section>
  );
}
