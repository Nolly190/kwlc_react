import { useRef } from "react";
import DonateBtn from "../../../../components/donate-btn";

export default function ShopPay({
  price,
  onEmailTextChange,
  onPhoneTextChange,
  onClick,
}: {
  price: number;
  onEmailTextChange: Function;
  onPhoneTextChange: Function;
  onClick: Function;
}) {
  const formRef = useRef();

  return (
    <section className="content">
      {/* <h3>PAY FOR YOUR TITHE AND OFFERINGS EASILY</h3> */}
      <h3>PAY FOR YOUR PRODUCTS EASILY</h3>

      <form ref={formRef} id="pay-form">
        <div className="row w-100">
          <div className="col row">
            <label htmlFor="payment-type">Select Action</label>
            <select name="payment-type" id="">
              <option value="product">PRODUCT</option>
            </select>
          </div>
          <div className="col row">
            <label htmlFor="payment-option">Payment option</label>
            <select name="payment-option" id="">
              {/* <option value="offline" selected>Offline</option> */}
              <option value="online" selected>
                Online
              </option>
            </select>
          </div>
        </div>

        <div className="row w-100">
          <div className="input col">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={(e) =>
                onEmailTextChange && onEmailTextChange(e.target.value)
              }
              required={true}
            />
          </div>

          <div className="input col">
            <label htmlFor="email">Phone</label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="Phone"
              onChange={(e) =>
                onPhoneTextChange && onPhoneTextChange(e.target.value)
              }
              required={true}
            />
          </div>

          <div className="input col">
            <div className="payment row" style={{ padding: 0 }}>
              <span
                className="mr-2 span-first"
                style={{ background: "#fff", padding: 0 }}
              >
                <input
                  type="text"
                  style={{ background: "#fff" }}
                  placeholder={price.toString()}
                />
              </span>
              {/* <span className="row span-last" ><span>#</span> <span>{price}</span></span> */}
            </div>
          </div>
        </div>

        <div className="btn-container" onClick={(e) => onClick && onClick(e)}>
          <DonateBtn
            label="Pay"
            style={{ color: "black" }}
            onClick={() => {}}
          />
        </div>
      </form>
    </section>
  );
}
