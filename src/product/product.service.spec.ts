import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from './models/product.model';
import { getModelToken } from '@nestjs/sequelize';

describe('ProductService', () => {
  let service: ProductService;
  let model: typeof Product;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getModelToken(Product),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    model = module.get<typeof Product>(getModelToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const createProductDto = {
        name: 'Test Product',
        price: 100,
        categoryId: 1,
      };
      const createdProduct = { id: 1, ...createProductDto };

      jest.spyOn(model, 'create').mockResolvedValue(createdProduct as any);

      const result = await service.create(createProductDto);
      expect(result).toEqual(createdProduct);
    });

    it('should throw BadRequestException if product creation fails', async () => {
      const createProductDto = {
        name: 'Test Product',
        price: 100,
        categoryId: 1,
      };
      jest
        .spyOn(model, 'create')
        .mockRejectedValue(new Error('Unable to create product'));

      await expect(service.create(createProductDto)).rejects.toThrowError(
        'Unable to create product',
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const products = [{ id: 1, name: 'Product 1', price: 100 }];
      jest.spyOn(model, 'findAll').mockResolvedValue(products as any);

      const result = await service.findAll();
      expect(result).toEqual(products);
    });
  });
});
