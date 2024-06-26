import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { CreatePokemonDto } from './dtos/create-pokemon.dto'
import { UpdatePokemonDto } from './dtos/update-pokemon.dto'
import { PokemonService } from './pokemon.service'

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto)
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.pokemonService.findAll()
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term)
  }

  @Patch(':term')
  update(
    @Param('term') term: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ) {
    return this.pokemonService.update(term, updatePokemonDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.remove(id)
  }
}
