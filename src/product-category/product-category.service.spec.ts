import { Test, TestingModule } from '@nestjs/testing';
import { ProductCategoryService } from './product-category.service';
import { getModelToken } from '@nestjs/sequelize';
import { ProductCategory } from './models/product-category.model';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';

describe('ProductCategoryService', () => {
  let service: ProductCategoryService;
  let model: typeof ProductCategory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductCategoryService,
        {
          provide: getModelToken(ProductCategory),
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findByPk: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductCategoryService>(ProductCategoryService);
    model = module.get<typeof ProductCategory>(getModelToken(ProductCategory));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCategory', () => {
    it('should create a product category', async () => {
      const dto: CreateProductCategoryDto = { name: 'Test Category' };
      const result = { id: 1, name: 'Test Category' };

      jest.spyOn(model, 'create').mockResolvedValue(result as any);

      expect(await service.createCategory(dto)).toEqual(result);
      expect(model.create).toHaveBeenCalledWith(dto);
    });

    it('should throw an error if creation fails', async () => {
      const dto: CreateProductCategoryDto = { name: 'Test Category' };

      jest
        .spyOn(model, 'create')
        .mockRejectedValue(new Error('Creation failed'));

      await expect(service.createCategory(dto)).rejects.toThrow(
        'Creation failed',
      );
    });
  });

  describe('findAllCategories', () => {
    it('should return an array of categories', async () => {
      const result = [{ id: 1, name: 'Test Category' }];

      jest.spyOn(model, 'findAll').mockResolvedValue(result as any);

      expect(await service.findAllCategories()).toEqual(result);
      expect(model.findAll).toHaveBeenCalled();
    });
  });

  describe('findCategoryById', () => {
    it('should return a category by ID', async () => {
      const result = { id: 1, name: 'Test Category' };

      jest.spyOn(model, 'findByPk').mockResolvedValue(result as any);

      expect(await service.findCategoryById(1)).toEqual(result);
      expect(model.findByPk).toHaveBeenCalledWith(1, { include: ['products'] });
    });

    it('should throw an error if category is not found', async () => {
      jest.spyOn(model, 'findByPk').mockResolvedValue(null);

      await expect(service.findCategoryById(1)).rejects.toThrow(
        'Category not found',
      );
    });
  });
});
