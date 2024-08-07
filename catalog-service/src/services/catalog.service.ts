import { ICatalogRepository } from "../interface/catalogRepository";

export class CatalogService {

    private _repository: ICatalogRepository;

    constructor(repository: ICatalogRepository) {
        this._repository = repository;
    }

    async createProduct(input: any) {
        const data = await this._repository.create(input);
        if (!data.id) {
            throw new Error("Unable to create new product");
        }
        return data;
    }
    
    async updateProduct(input: any) {
        const data = await this._repository.update(input);
        // emit event to update record in Elastic Search
        return data;
    }

    // instead of this, we will get products from Elastic Search
    async getProducts(limit: number, offset: number) {
        const products = await this._repository.find(limit, offset);
        return products;
    }

    async getProduct(id: number) {
        const product = await this._repository.findOne(id);
        return product;
    }

    async deleteProduct(id: number) {
        const result = await this._repository.delete(id);
        return {
            id: result
        };
    }

}