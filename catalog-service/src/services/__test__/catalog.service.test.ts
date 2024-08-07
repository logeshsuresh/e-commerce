import { ICatalogRepository } from "../../interface/catalogRepository";
import { Product } from "../../models/product.model";
import { CatalogRepository } from "../../repository/catalog.repository";
import { CatalogService } from "../catalog.service";
import { faker } from "@faker-js/faker";
import { Factory } from "rosie";

const productFactory = new Factory<Product>()
                    .attr("id", faker.number.int({min: 1, max: 50}))
                    .attr("name", faker.commerce.productName)
                    .attr("description", faker.commerce.productDescription)
                    .attr("stock", faker.number.int({ min : 10, max : 100 }))
                    .attr("price", +faker.number.int({ min : 10, max : 100 }));

const mockProduct = (rest: any) => {
    return  {
        name: faker.commerce.productName(), 
        description: faker.commerce.productDescription(),
        stock: faker.number.int({ min : 10, max : 100 }),
        ...rest
    };
} 

describe("catalogService", () => {

    let repository: ICatalogRepository;

    beforeEach(() => {
        repository = new CatalogRepository();
    });

    afterEach(() => {
        repository = {} as CatalogRepository;
    });

    describe("createProduct", () => {
        test("should create product", async () => {
            const service: CatalogService = new CatalogService(repository);

            const requestBody = mockProduct({
                price: +faker.commerce.price
            });

            const result = await service.createProduct(requestBody);

            expect(result).toMatchObject({
                id: expect.any(Number),
                description: expect.any(String),
                name: expect.any(String),
                price: expect.any(Number),
                stock: expect.any(Number)
            });
        });

        test("should throw error when unable to create product", async () => {
            const service: CatalogService = new CatalogService(repository);

            const requestBody = mockProduct({
                price: +faker.commerce.price
            });
            
            jest.spyOn(repository, "create")
            .mockImplementationOnce(() => Promise.resolve({} as Product));

            await expect(service.createProduct(requestBody)).rejects.toThrow(
                "Unable to create new product"
            );
        });

        test("should throw error when product already exists", async () => {
            const service: CatalogService = new CatalogService(repository);

            const requestBody = mockProduct({
                price: +faker.commerce.price
            });
            
            jest.spyOn(repository, "create")
            .mockImplementationOnce(() => 
                Promise.reject(new Error("Product already exists"))
            );

            await expect(service.createProduct(requestBody)).rejects.toThrow(
                "Product already exists"
            );
        });
    });

    describe("updateProduct", () => {
        test("should update product", async () => {
            const service = new CatalogService(repository);
            
            const requestBody = mockProduct({
                id: faker.number.int({ min: 10, max: 1000 }),
                price: +faker.commerce.price
            });

            const result = await service.updateProduct(requestBody);

            expect(result).toMatchObject(requestBody);
        });

        test("should throw error if product does not exist", async () => {
            const service = new CatalogService(repository);

            jest.spyOn(repository, "update")
            .mockImplementationOnce(() => 
                Promise.reject(new Error("Product does not exist"))
            );
        
            await expect(service.updateProduct({})).rejects.toThrow(
                "Product does not exist"
            );
        });
    });

    describe("getProducts", () => {
        test("should get products by offset and limit", async () => {
            const service = new CatalogService(repository);
            const randomLimit = faker.number.int({min: 1, max: 50});

            const products = productFactory.buildList(randomLimit);

            jest.spyOn(repository, "find").mockImplementationOnce(() => Promise.resolve(products));

            const result = await service.getProducts(randomLimit, 0);

            expect(result.length).toEqual(randomLimit);
            expect(result).toMatchObject(products);
        });

        test("should throw error when products do not exist", async () => {
            const service = new CatalogService(repository);

            jest.spyOn(repository, "find")
            .mockImplementationOnce(() => Promise.reject(new Error("Products does not exist")));

            await expect(service.getProducts(0, 0)).rejects.toThrow(
                "Products does not exist"
            );
        });
    });

    describe("getProduct", () => {
        test("should get product by id", async () => {
            const service = new CatalogService(repository);
            const id = faker.number.int({min: 1, max: 50});

            const product = productFactory.build();

            jest.spyOn(repository, "findOne").mockImplementationOnce(() => Promise.resolve(product as Product));

            const result = await service.getProduct(id);

            expect(result).toMatchObject(product);
        });

        test("should throw error when product does not exist", async () => {
            const service = new CatalogService(repository);

            const id = faker.number.int({min: 1, max: 50});

            jest.spyOn(repository, "findOne")
            .mockImplementationOnce(() => Promise.reject(new Error("Product does not exist")));

            await expect(service.getProduct(id)).rejects.toThrow(
                "Product does not exist"
            );
        });
    });

    describe("deleteProduct", () => {
        test("should delete product by id", async () => {
            const service = new CatalogService(repository);
            const id = faker.number.int({min: 1, max: 50});

            const product = productFactory.build();

            jest.spyOn(repository, "delete").mockImplementationOnce(() => Promise.resolve(id));

            const result = await service.deleteProduct(product.id!);

            expect(result).toMatchObject({
                id: product.id
            });
        });
    });

});