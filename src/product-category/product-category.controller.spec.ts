import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryController } from './product-category.controller';
import { ProductCategoryService } from './product-category.service';

describe('ProductCategoryController', () => {
  let controller: ProductCategoryController;
  let service: ProductCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCategoryController],
      providers: [
        {
          provide: ProductCategoryService,
          useValue: {
            findAllCategories: jest.fn(),
            findCategoryById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductCategoryController>(
      ProductCategoryController,
    );
    service = module.get<ProductCategoryService>(ProductCategoryService);
  });

  it('should return all categories', async () => {
    const result = [{ id: 1, name: 'Test Category' }];

    jest.spyOn(service, 'findAllCategories').mockResolvedValue(result as any);

    expect(await controller.getAllCategories()).toEqual({
      message: 'Product categories fetched',
      status: 'success',
      data: result,
    });
  });

  it('should return a category by ID', async () => {
    const result = { id: 1, name: 'Test Category' };

    jest.spyOn(service, 'findCategoryById').mockResolvedValue(result as any);

    expect(await controller.getCategoryById(1)).toEqual({
      message: 'Product categories fetched',
      status: 'success',
      data: result,
    });
  });
});
