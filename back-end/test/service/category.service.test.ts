import categoryService from "../../service/category.service";
import categoryDb from "../../repository/category.db";

jest.mock("../../repository/category.db");

describe("Category Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should get all categories", async () => {
        const mockCategories = [{ id: 1, name: "Category 1" }, { id: 2, name: "Category 2" }];
        (categoryDb.getAllCategories as jest.Mock).mockResolvedValue(mockCategories);

        const categories = await categoryService.getAllCategories();

        expect(categories).toEqual(mockCategories);
        expect(categoryDb.getAllCategories).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when getting all categories", async () => {
        const mockError = new Error("Database error");
        (categoryDb.getAllCategories as jest.Mock).mockRejectedValue(mockError);

        await expect(categoryService.getAllCategories()).rejects.toThrow("Database error");
        expect(categoryDb.getAllCategories).toHaveBeenCalledTimes(1);
    });
});