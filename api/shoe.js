export default function shoe_api(shoe_service_instance) {
  async function all_shoes(req, res) {
    try {
      let allShoes = await shoe_service_instance.get_all_shoes();
      res.json({
        status: "success",
        data: allShoes,
      });
    } catch (err) {
      console.log("error getting all shoes", err);
    }
  }

  async function shoes_by_brand(req, res) {
    const brandName = req.params.brandname;
    try {
      let shoesByBrand = await shoe_service_instance.get_shoes_by_brand(
        brandName
      );
      res.json({
        status: "success",
        data: shoesByBrand,
      });
    } catch (err) {
      console.log("error getting shoes by brand", err);
    }
  }

  async function shoes_by_size(req, res) {
    const size = req.params.size;
    try {
      let shoesBySize = await shoe_service_instance.get_shoes_by_size(size);
      res.json({
        status: "success",
        data: shoesBySize,
      });
    } catch (err) {
      console.log("error getting shoes by size", err);
    }
  }

  async function shoes_by_brand_and_size(req, res) {
    const brandName = req.params.brandname;
    const size = req.params.size;
    try {
      let shoesByBrandAndSize =
        await shoe_service_instance.get_shoe_by_brand_and_size(brandName, size);
      res.json({
        status: "success",
        data: shoesByBrandAndSize,
      });
    } catch (err) {
      console.log("error getting shoes by brand and size", err);
    }
  }

  async function sold_shoes(req, res) {
    const shoeId = req.params.id;
    try {
      await shoe_service_instance.update_sold_shoes(shoeId);
      res.json({
        status: "success",
        message: "Shoe sold",
      });
    } catch (err) {
      console.log("error updating sold shoes", err);
    }
  }

  async function insert(req, res) {
    const {
      brand_name,
      shoe_name,
      shoe_size,
      stock_quantity,
      color,
      price,
      image_url,
      description,
    } = req.body;
    try {
      const insertShoes = await shoe_service_instance.insert_shoes(
        brand_name,
        shoe_name,
        shoe_size,
        stock_quantity,
        color,
        price,
        image_url,
        description
      );
      res.status(201).json({
        status: "success",
        data: insertShoes,
      });
    } catch (err) {
      console.log("error inserting shoes", err);
    }
  }

  return {
    all_shoes,
    shoes_by_brand,
    shoes_by_size,
    shoes_by_brand_and_size,
    sold_shoes,
    insert,
  };
}
