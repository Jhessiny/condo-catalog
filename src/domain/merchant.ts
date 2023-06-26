import { type Either, success, error } from '@/shared/either'
import { AggregateError } from '@/shared/error-aggregator'
import { triggerValidation } from '@/validations/validators-factory'
import { ValidationBuilder } from '@/validations/validators/validation-builder/validation-builder'

export class Merchant {
  private readonly name: string
  private readonly category: string
  private readonly subCategory?: string
  private readonly phone: string
  private readonly miniBio?: string

  constructor({
    name,
    category,
    subCategory,
    phone,
    miniBio,
  }: Merchant.CreateDto) {
    this.name = name
    this.category = category
    this.subCategory = subCategory
    this.phone = phone
    this.miniBio = miniBio
    Object.freeze(this)
  }

  public static validateCreateValues({
    name,
    category,
    subCategory,
    phone,
    miniBio,
  }: Merchant.CreateDto): any[] | null {
    const errors = triggerValidation([
      ValidationBuilder.value(name, 'name').required().min(3).build(),
      ValidationBuilder.value(category, 'category').required().build(),
      ValidationBuilder.value(subCategory, 'subCategory').build(),
      ValidationBuilder.value(miniBio, 'miniBio').min(10).max(600).build(),
      ValidationBuilder.value(phone, 'phone').required().min(9).max(13).build(),
    ])
    if (errors?.length) return errors
    return null
  }

  public static create(
    dto: Merchant.CreateDto,
  ): Either<AggregateError, Merchant> {
    const errors = this.validateCreateValues(dto)
    if (errors) {
      return error(new AggregateError(errors.map((err) => err.error)))
    }
    return success(new Merchant(dto))
  }
}

export namespace Merchant {
  export type CreateDto = {
    name: string
    category: string
    subCategory?: string
    phone: string
    miniBio?: string
  }
}
