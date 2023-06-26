import { InvalidMerchantDataError } from '@/domain/errors'
import { Merchant } from '@/domain/merchant'
import { faker } from '@faker-js/faker'

describe('Test Merchant entity', () => {
  it('should create a Merchant when passing the correct params', () => {
    const createParams: Merchant.CreateDto = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      miniBio: faker.word.words(5),
      phone: faker.phone.number('41 9#### ####'),
    }
    const merchant = Merchant.create(createParams)
    expect(merchant.isSuccess()).toBe(true)
    expect(merchant.value).toBeInstanceOf(Merchant)
  })
  it('should return error when passing longer miniBio and phone params', () => {
    const createParams: Merchant.CreateDto = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      miniBio: faker.word.words(100),
      phone: faker.phone.number('41 9#### #### #'),
    }
    const merchant = Merchant.create(createParams)
    expect(merchant.isError()).toBe(true)
    expect(merchant.value).toBeInstanceOf(InvalidMerchantDataError)
    expect((merchant.value as InvalidMerchantDataError).errors).toHaveLength(2)
  })
})
