import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import BranchItem from "../../../../components/branch-item";
import { loadBranchData } from "../../../../controller/branch.controller";
import { BranchDTO } from "../../../../dto/Branch.dto";

export default function BranchContent() {
  const [items, setItems] = useState<BranchDTO[]>([]);
  const [filteredItems, setFilteredItems] = useState<BranchDTO[]>([]);
  const router = useRouter();
  const [searchItem, setSearchItem] = useState("");
  const [locationItem, setLocationItem] = useState("All Branches");

  useEffect(() => {
    loadBranchData(setItems, items);
  }, []);

  useEffect(() => {
    setFilteredItems(items);
  }, [items]);

  const handleChange = (value: string) => {
    setSearchItem(value);
  };

  useEffect(() => {
    if (searchItem === "") {
      setFilteredItems(items);
      setLocationItem("All Branches");
    }
  }, [searchItem]);

  console.log("locationItem", items);

  const handleFilter = () => {
    if (searchItem === "") {
      setFilteredItems(items);
      setLocationItem("All Branches");
    } else {
      const filteredArray = items.filter((x) =>
        x.location?.toLowerCase().includes(searchItem.toLowerCase())
      );
      setFilteredItems(filteredArray);
      setLocationItem(searchItem.charAt(0).toUpperCase() + searchItem.slice(1));
    }
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
          {filteredItems && filteredItems.length > 0 ? (
            filteredItems.map((x, index) => {
              return (
                <BranchItem
                  key={index}
                  description={x.location}
                  onClick={() => {
                    router.push(`/web/branch?id=${x.id}`);
                  }}
                  timers={x.services}
                  title={x.name}
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
