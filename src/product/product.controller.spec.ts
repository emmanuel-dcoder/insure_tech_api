import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: ProductService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a success response when creating a product', async () => {
      const createProductDto: CreateProductDto = {
        name: 'Test Product',
        price: 100,
        categoryId: 1,
      };
      const result = { id: 1, ...createProductDto };

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      const response = await controller.create(createProductDto);
      expect(response).toEqual({
        message: 'Product created successfully',
        status: 'success',
        data: result,
      });
    });
  });

  describe('getAllProducts', () => {
    it('should return a success response when products are found', async () => {
      const products = [{ id: 1, name: 'Product 1', price: 100 }];
      jest.spyOn(service, 'findAll').mockResolvedValue(products as any);

      const response = await controller.getAllProducts();
      expect(response).toEqual({
        message: 'Product retrieve successfully',
        status: 'success',
        data: products,
      });
    });

    it('should return a message when no products are found', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue([]);

      const response = await controller.getAllProducts();
      expect(response).toEqual({
        message: 'Product not found',
        status: 'success',
        data: [],
      });
    });
  });
});
