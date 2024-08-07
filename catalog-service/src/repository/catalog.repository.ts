import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {

    async create(data: Product): Promise<Product> {
        const mockProduct = {
            id: 1,
            ...data 
        } as Product;
        return Promise.resolve(mockProduct);
    }
    
    async update(data: Product): Promise<Product> {
        return Promise.resolve(data as unknown as Product);
    }

    async delete(id: number): Promise<number> {
        return Promise.resolve(id);
    }

    async find(limit: number, offset: number): Promise<Product[]> {
        return Promise.resolve([]);
    }

    async findOne(id: number): Promise<Product> {
        const mockProduct = {
            id,
            description: "",
            name: "",
            stock: 1,
            price: 1 
        } as Product;
        return Promise.resolve(mockProduct);
    }
  
}