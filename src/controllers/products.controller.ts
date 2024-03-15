import { Request, Response } from "express";
import productService from "../services/products.service";
import fs from "fs";
import csvParser from "csv-parser";
import { ProductModel } from "../interface/products.interface";
import { removeOldFile } from "../middleware/fileUtils";

// Create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newProduct = await productService.createProduct(data);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Get product by id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    const updatedProduct = await productService.updateProduct(productId, data);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

// Handle CSV file upload and data insertion
export const uploadCSV = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No CSV file uploaded' });
      return;
    }
    const filePath = req.file.path;
    const products: ProductModel[] = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        const price = parseFloat(row.price);
        const originalPrice = parseFloat(row.originalPrice);

        const product: ProductModel = {
          price: price,
          discount: originalPrice - price,
          tag: row.tag,
          flashSale: row.flashSale,
          status: row.status,
          description: row.description,
          image: row.image,
          originalPrice: originalPrice,
          parent: row.parent,
          quantity: parseInt(row.quantity),
          slug: row.slug,
          title: row.title,
          type: row.type,
          unit: row.unit,
          sku: row.sku,
        };
        products.push(product);
      })
      .on('end', async () => {
        try {
          console.log("myd");
          await productService.createBulkProducts(products, filePath);
          removeOldFile(filePath);

          res.status(200).json({ message: 'CSV file successfully processed' });
        } catch (error) {
          res.status(400).json({ error: (error as Error).message });
        }
      });

  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await productService.deleteProduct(productId);
    res.status(200).json(deletedProduct);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

//Delete all products
export const deleteAllProducts = async (req: Request, res: Response) => {
  try {
    const deletedProducts = await productService.deleteAllProducts();
    res.status(200).json(deletedProducts);
  } catch (error) {
    res.status(404).json({ error: (error as Error).message });
  }
};

// export const createBulkProducts = async (req: Request, res: Response) => {
//   try {
//     const productsData: ProductModel[] = req.body;
//     const oldFilePath: string = req.file ? req.file.filename : '';

//     const createdProducts = await productService.createBulkProducts(
//       productsData,
//       oldFilePath
//     );

//     res.status(201).json(createdProducts);
//   } catch (error) {
//     res.status(400).json({ error: (error as Error).message });
//   }
// };

// // Get products by category
// export const getProductsByCategory = async (req: Request, res: Response) => {
//   try {
//     const category = req.params.category;
//     const products = await productService.getProductsByCategory(category);
//     res.status(200).json(products);
//   } catch (error) {
//     res.status(400).json({ error: (error as Error).message });
//   }
// };
