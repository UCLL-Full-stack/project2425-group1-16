import categoryDb from "../repository/category.db";

const getAllCategories = async () => await categoryDb.getAllCategories();

export default { getAllCategories };