import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import BranchItem from "../../../../components/branch-item";
import { loadBranchData } from "../../../../controller/branch.controller";

export default function BranchContent() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [searchItem, setSearchItem] = useState("");
  const [locationItem, setLocationItem] = useState("All Branches");

  useEffect(() => {
    loadBranchData(setItems, items);
  }, []);

  const handleChange = (value: string) => {
    setSearchItem(value);
  };

  console.log("item", items);

  const handleFilter = () => {
    const filteredItems = items.filter((x) =>
      x.location?.toLowerCase().includes(searchItem.toLowerCase())
    );
    setItems(filteredItems);
    setLocationItem(searchItem.charAt(0).toUpperCase() + searchItem.slice(1));
  };

  return (
    <>
      <section className="search_wrapper">
        <h3 className="search_wrapper_subtitle">City</h3>

        <div className="location_search">
          <input
            className="event_searcher"
            type="search"
            name="search"
            id="search"
            value={searchItem}
            onChange={(e) => handleChange(e.target.value)}
          />
          <a className="button" onClick={handleFilter}>
            Search
          </a>
        </div>
        <span className="grey_text">
          <p>Search for branches near you </p>
        </span>
      </section>
      <section className="locate_wrapper">
        <h2>
          <span>
            <i className="fa fa-map-marker" aria-hidden="true">
              {" "}
              {locationItem}
            </i>
          </span>
        </h2>
        <hr />
      </section>
      <section className="branch_wrapper">
        <span>
          {locationItem !== "All Branches" && (
            <h5> Branches in {locationItem}</h5>
          )}
        </span>

        <div className="branch_box">
          {items && items.length > 0 ? (
            items.map((x, index) => {
              return (
                <BranchItem
                  key={index}
                  description={x.description}
                  onClick={() => {
                    router.push(`/web/branch?id=${x.id}`);
                  }}
                  timers={x.timers}
                  title={x.title}
                />
              );
            })
          ) : (
            <div className="no_content">No branch Found</div>
          )}
        </div>
      </section>
    </>
  );
}
