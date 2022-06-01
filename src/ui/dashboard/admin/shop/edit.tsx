import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DonationImageItem from "../../../../components/donation-image";
import DualRing from "../../../../components/loader";
import ShopItemImage from "../../../../components/shop-item-image";
import { BranchController } from "../../../../controller/admin/branch.controller";
import { ShopController } from "../../../../controller/admin/shop.controller";
import { ShopDTO, ShopImageDTO } from "../../../../dto/ShopItem.dto";
import { getParam } from "../../../../utils";
import AdminLayout from "../admin.layout";
import { LoaderWrapper } from "../blog/getall";
import { ImageWrapper } from "../events/add";

export default function EditShopItem() {
  const _tmp: ShopDTO[] = [];
  const _tmpImages: ShopImageDTO[] = [];
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getItem = () => {
    const id = getParam("id");
    if (!id) {
      router.push("/admin/");
    } else {
      setIdParam(parseInt(id));
      controller.read(
        {
          setDescription: setDescription,
          setDimension: setDimension,
          setImgs: setImgs,
          setPrice: setPrice,
          setQuantity: setQuantity,
          setTitle: setTitle,
          setWeight: setWeight,
          setIsLoading: setIsLoading,
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

  const onAddImageURL = (e: any) => {
    e.preventDefault();
    setImgs([...imgs, {
      imageUrl: img,
      id: parseInt(moment(new Date()).format('yyyyMMDDHHmmss')),
    }])
    setImg("")
  };

  const handleDelete = (index: number) => {
    const newArray = [...imgs];
    newArray.splice(index, 1);
    setImgs(newArray);
  }

  return (
    <AdminLayout
      externalStyles={[]}
      navbar={""}
      title={"Edit Product"}
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
              {isLoading ?
                <LoaderWrapper>
                  <DualRing width="40px" height="40px" color="#0b0146" />
                </LoaderWrapper> :
                <form id="form">
                  <div className="row">
                    <div className="col-md-8">
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
                    <div className="col-md-8">
                      <div className="form-group">
                        <label className="bmd-label-floating">Description </label>
                        <textarea
                          className="form-control"
                          cols={3}
                          rows={3}
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
                    <div className="col-md-12">
                      <div className="form-group">
                        <label className="bmd-label-floating">Enter Image URL</label>
                        <form>
                          <div className="row pt-3">
                            <div className="col-md-6">
                              <input
                                type="text"
                                className="form-control"
                                id="location"
                                name="location"
                                element-data="description"
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                              />
                            </div>
                            <div className="col-md-4">
                              <button
                                className="btn btn-primary pull-right"
                                onClick={(e) => onAddImageURL(e)}
                              >
                                Add URL
                              </button>
                            </div>
                          </div>
                        </form>
                        <ImageWrapper>
                          {imgs?.map((x, i) => (
                            <DonationImageItem
                              key={i}
                              id={x.id}
                              url={x.imageUrl}
                              index={i}
                              handleDelete={handleDelete}
                            />
                          ))}
                        </ImageWrapper>
                      </div>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                  <div className="row mt-5">
                    <div className="col-md-12">
                      <button
                        type="submit"
                        id="submitBtn"
                        className="btn btn-primary pull-right"
                        onClick={(e) => onClick(e)}
                      >
                        Edit Item
                      </button>
                      <div className="clearfix"></div>
                    </div>
                  </div>
                </form>
              }
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
