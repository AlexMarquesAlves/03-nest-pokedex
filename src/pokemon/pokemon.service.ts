import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreatePokemonDto } from './dtos/create-pokemon.dto'
import { UpdatePokemonDto } from './dtos/update-pokemon.dto'
import { Pokemon } from './entities/pokemon.entity'

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase()

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)

      return pokemon
    } catch (error) {
      this.handleExceptions(error)
    }
  }

  async findAll() {
    return `This action returns all pokemon`
  }

  async findOne(id: number) {
    return `This action returns a #${id} pokemon`
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`
  }

  async remove(id: number) {
    return `This action removes a #${id} pokemon`
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error.keyValue)}`,
      )
    }
    console.log(error)
    throw new InternalServerErrorException(
      `Can't create Pokemon - Check server logs`,
    )
  }
}
