import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ShopItemImage from "../../../../components/shop-item-image";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { ShopController } from "../../../../controller/admin/shop.controller";
import { ShopDTO, ShopImageDTO } from "../../../../dto/ShopItem.dto";
import { getParam } from "../../../../utils";
import AdminLayout from "../admin.layout";

export default function EditShopItem() {
  const _tmp: ShopDTO[] = [];
  const _tmpImages: ShopImageDTO[] = [];
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("0");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [imgs, setImgs] = useState(_tmpImages);
  const [quantity, setQuantity] = useState("0");
  const [weight, setWeight] = useState("0");
  const [dimension, setDimension] = useState("0");
  const [idParam, setIdParam] = useState(0);

  useEffect(() => {
    getItem();
  }, []);

  const getItem = () => {
    //get item
    //load into page
    // edit
    // rebuild update
    // push
    const id = getParam("id");
    if (!id) {
      router.push("/admin/");
    } else {
      setIdParam(parseInt(id));
      controller.read(
        {
          setDescription: setDescription,
          setDimension: setDimension,
          setImg: setImg,
          setImgs: setImgs,
          setPrice: setPrice,
          setQuantity: setQuantity,
          setTitle: setTitle,
          setWeight: setWeight,
        },
        parseInt(id)
      );
    }
  };

  const controller: ShopController = new ShopController();

  const onClick = (e) => {
    e.preventDefault();
    controller.update(
      new ShopDTO({
        description: description,
        productImages: imgs,
        title: title,
        dimension: dimension,
        weight: weight,
        quantity: parseInt(quantity),
        price: parseFloat(price),
      }),
      idParam
    );
  };

  const onAddImageURL = (e) => {
    e.preventDefault();
    controller.addImage(setImgs, imgs, img);
  };

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Add Product"}
      withFooter={false}
      withSideBar={true}
    >
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header card-header-primary">
              <h4 className="card-title">Edit Product</h4>
            </div>
            <div className="card-body">
              <form id="form">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        element-data="name"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Price</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">Quanity</label>
                      <input
                        type="number"
                        className="form-control"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Select Weight
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Select Dimension
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={dimension}
                        onChange={(e) => setDimension(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="bmd-label-floating">Description </label>
                      <textarea
                        className="form-control"
                        id="code"
                        name="code"
                        element-data="code"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="bmd-label-floating">
                        Enter Image URL
                      </label>
                      <div className="row">
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setImg(e.target.value)}
                        />
                        <button
                          className="btn btn-primary pull-right"
                          onClick={(e) => onClick(e)}
                        >
                          Edit Item
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 mt-4">
                    <button
                      type="submit"
                      id="submitBtn"
                      className="btn btn-primary "
                      onClick={(e) => onAddImageURL(e)}
                    >
                      Add URL
                    </button>
                  </div>
                </div>
                <div className="row ml-1" style={{ maxWidth: "95%" }}>
                  {imgs.length > 0
                    ? imgs.map((x, i) => {
                        return (
                          <ShopItemImage key={i} id={x.id} url={x.imageUrl} />
                        );
                      })
                    : "No product images Added"}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
