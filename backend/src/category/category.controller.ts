import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CategoryService } from './category.service'
import { CategoryDto } from './dto/category.dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@Get('by-slug/:slug')
	async bySlug(@Param('slug') slug: string) {
		return this.categoryService.bySlug(slug)
	}

	@Get(':id')
	@Auth()
	async byId(@Param('id') id: string) {
		return this.categoryService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.updateCategory(+id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Post()
	async createCategory() {
		return this.categoryService.createCategory()
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async deleteCategory(@Param('id') id: string) {
		return this.categoryService.deleteCategory(+id)
	}
}
