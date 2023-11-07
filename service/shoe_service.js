
const shoe_service = (db) => {
  
  const insert_shoes = async (brand_name, shoe_name, shoe_size, stock_quantity, color, price, image_url, description) => {
    return await db.one(
      'INSERT INTO shoes (brand_name, shoe_name, shoe_size, stock_quantity, color, price, image_url, description) ' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [brand_name, shoe_name, shoe_size, stock_quantity, color, price, image_url, description]
    );
  };
  
  const get_all_shoes = async () => {
    return await db.manyOrNone("SELECT * from shoes");
  };

  const get_shoes_by_brand = async (brand_name) => {
    return await db.any('SELECT * FROM shoes WHERE brand_name = $1', [brand_name]);
  };

  const get_shoes_by_size = async (shoe_size) => {
    return await db.any('SELECT * FROM shoes WHERE shoe_size = $1', [shoe_size]);
  };

  const get_shoe_by_brand_and_size = async (brand_name, shoe_size) => {
    return await db.any('SELECT * FROM shoes WHERE brand_name = $1 AND shoe_size = $2', [brand_name, shoe_size]);
  };

  const update_sold_shoes = async (shoe_id) => {
    return await db.none('UPDATE shoes SET stock_quantity = stock_quantity - 1 WHERE shoe_id = $1', [shoe_id]);
  };

  return {
    insert_shoes, 
    get_all_shoes,
    get_shoes_by_brand,
    get_shoe_by_brand_and_size,
    get_shoes_by_size,
    update_sold_shoes,
  };
};
export default shoe_service;

