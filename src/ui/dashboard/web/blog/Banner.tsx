import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function BlogBanner({ setSearchTerm }) {
  return (
    <div className="section_head">
      <div className="title_head">
        <h4>
          <span>Blog Page</span>
        </h4>
        <div className="ellipse"></div>
        <h4>Podcast</h4>
      </div>
      <div className="section_img">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search articles"
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </InputGroup>
      </div>
    </div>
  );
}
