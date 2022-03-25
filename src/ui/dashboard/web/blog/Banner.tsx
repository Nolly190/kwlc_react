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
        <input
          className="search"
          type="search"
          placeholder="search..."
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </div>
    </div>
  );
}
