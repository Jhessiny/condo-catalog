import { type Either, success } from '@/shared/either'
import { type InvalidMerchantDataError } from './errors/invalid-merchant-data'

export class Merchant {
  private readonly id: string
  private readonly name: string
  private readonly category: string
  private readonly subCategory: string
  private readonly phone: string
  private readonly miniBio?: string

  public static create(
    params: Merchant.Data,
  ): Either<InvalidMerchantDataError, Merchant> {
    return success(new Merchant(params))
  }

  constructor({ category, name, subCategory, phone, miniBio }: Merchant.Data) {
    this.name = name
    this.category = category
    if (subCategory) this.subCategory = subCategory
    this.phone = phone
    this.miniBio = miniBio
    Object.freeze(this)
  }
}

export namespace Merchant {
  export type Data = {
    name: string
    category: string
    subCategory?: string
    phone: string
    miniBio?: string
  }
}
