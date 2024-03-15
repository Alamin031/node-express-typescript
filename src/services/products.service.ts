import { Product } from "../models/products.entity";
import { ProductModel } from "../interface/products.interface";
import fs from "fs";
import { removeOldFile } from "../middleware/fileUtils";

export class ProductService {
  async createProduct(productData: ProductModel): Promise<ProductModel> {
    try {
      const newProduct = await Product.create(productData);
      return newProduct;
    } catch (error: any) {
      throw new Error("Error while creating product: " + error.message);
    }
  }

  async getAllProducts(): Promise<ProductModel[]> {
    try {
      const products = await Product.find();
      return products;
    } catch (error: any) {
      throw new Error("Error while fetching products: " + error.message);
    }
  }

  async getProductById(productId: string): Promise<ProductModel | null> {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error: any) {
      throw new Error("Error while fetching product: " + error.message);
    }
  }

  async updateProduct(
    productId: string,
    productData: Partial<ProductModel>
  ): Promise<ProductModel | null> {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        productData,
        { new: true }
      );
      return updatedProduct;
    } catch (error: any) {
      throw new Error("Error while updating product: " + error.message);
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await Product.findByIdAndRemove(productId);
    } catch (error: any) {
      throw new Error("Error while deleting product: " + error.message);
    }
  }

  async deleteAllProducts(): Promise<void> {
    try {
      await Product.deleteMany({});
    } catch (error: any) {
      throw new Error("Error while deleting products: " + error.message);
    }
  }

  // async createBulkProducts(products: ProductModel[]): Promise<ProductModel[]> {
  //     try {
  //         const newProducts = await Product.insertMany(products);
  //         return newProducts;
  //     } catch (error: any) {
  //         throw new Error("Error while creating products: " + error.message);
  //     }
  //     }

  async createBulkProducts(
    products: ProductModel[],
    oldFilePath: string
  ): Promise<ProductModel[]> {
    try {
      const bulkUpdateOps = products.map((product) => ({
        updateOne: {
          filter: { title: product.title },
          update: { $set: product },
          upsert: true,
        },
      }));

      const result = await Product.bulkWrite(bulkUpdateOps, { ordered: false });

      if (result.upsertedCount > 0 || result.modifiedCount > 0) {
        const createdOrUpdatedProducts: ProductModel[] = products.map(
          (product) => ({
            ...product,
          })
        );

        if (oldFilePath && fs.existsSync(oldFilePath)) {
          removeOldFile(oldFilePath);
        }
        return createdOrUpdatedProducts;
      } else {
        if (fs.existsSync(oldFilePath)) {
          removeOldFile(oldFilePath);
        }

        return [];
      }
    } catch (error: any) {
      throw new Error("Error while creating products: " + error.message);
    }
  }
}
export default new ProductService();
