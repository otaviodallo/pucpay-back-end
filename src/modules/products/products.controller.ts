import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  NotFoundException,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Put,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dtos/create-product.dto";
import { UpdateProductDto } from "./dtos/edit-product.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("products")
export class ProductsController {
  constructor(private productsService: ProductsService) { }
  @Get("/:id")
  async findProduct(@Param("id") id: string) {
    const product = await this.productsService.findOne(parseInt(id));
    if (!product) {
      throw new NotFoundException("product not found");
    }
    return product;
  }

  @Post()
  @UseInterceptors(FileInterceptor("image", { dest: "./uploads" }))
  async createProduct(@UploadedFile() image: Express.Multer.File, @Body() body: CreateProductDto) {
    if (!image) {
      throw new BadRequestException("Imagem não foi enviada");
    }

    const product = await this.productsService.create(
      body.name,
      body.description,
      image.filename,
      body.price,
      body.idRestaurant
    );
    return product;
  }

  @Get()
  async findAllProducts() {
    return this.productsService.findAll();
  }

  @Get("/restaurant/:id")
  async findResProducts(@Param("id") id: string) {
    const products = await this.productsService.findProductsWithIdRestaurant(
      parseInt(id)
    );
    return products;
  }

  @Delete("/:id")
  removeProduct(@Param("id") id: string) {
    return this.productsService.remove(parseInt(id));
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image', { dest: './uploads' }))
  async updateProduct(@UploadedFile() image: Express.Multer.File, @Param("id") id: number, @Body() body: UpdateProductDto) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }
    if (body.name) {
      product.name = body.name;
    }
    if (body.description) {
      product.description = body.description;
    }
    if (image) {
      product.image = image.filename;
    }
    if (body.price) {
      product.price = body.price;
    }

    const updatedProduct = await this.productsService.update(product);
    return updatedProduct;
  }

  @Delete("/restaurant/:id")
  removeUser(@Param("id") id: string) {
    return this.productsService.remove(parseInt(id));
  }
}
