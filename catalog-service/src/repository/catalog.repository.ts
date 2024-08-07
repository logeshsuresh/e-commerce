import { ICatalogRepository } from "../interface/catalogRepository";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {

    create(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }
    
    update(data: Product): Promise<Product> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): boolean {
        throw new Error("Method not implemented.");
    }

    find(): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }

    findOne(id: number): Promise<Product> {
        throw new Error("Method not implemented.");
    }
  
}