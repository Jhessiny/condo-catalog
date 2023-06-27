import { MemoryMerchantRepository } from '@/infra/merchant-memory-repository/memory-merchant-repository'
import { CreateMerchantService } from '@/application/services/create-merchant/create-merchant'
import { faker } from '@faker-js/faker'
import { ListMerchantService } from '@/application/services/list-merchants/list-merchants'
import { type CreateMerchantDTO } from '@/domain/merchant'

describe('Test ListMerchantService', () => {
  it('should empty list when no merchant was created', async () => {
    const merchantRepository = new MemoryMerchantRepository()
    const res = await new ListMerchantService(merchantRepository).execute()
    expect(res.isSuccess()).toBeTruthy()
    expect(res.value).toHaveLength(0)
  })
  it('should return list of two merchants', async () => {
    const merchantRepository = new MemoryMerchantRepository()
    const createService = new CreateMerchantService(merchantRepository)
    const createParams: CreateMerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      miniBio: faker.word.words(5),
      phone: faker.phone.number('41 9#### ####'),
    }
    await createService.execute(createParams)
    await createService.execute(createParams)

    const res = await new ListMerchantService(merchantRepository).execute()
    expect(res.isSuccess()).toBeTruthy()
    expect(res.value).toHaveLength(2)
  })
})
