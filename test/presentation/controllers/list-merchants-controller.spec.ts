import { MemoryMerchantRepository } from '@/infra/merchant-memory-repository/memory-merchant-repository'
import { faker } from '@faker-js/faker'
import { type Controller } from '@/presentation/models'
import {
  ListMerchantController,
  CreateMerChantController,
} from '@/presentation/controllers'
import {
  ListMerchantService,
  CreateMerchantService,
} from '@/application/services'
import { type CreateMerchantDTO } from '@/domain/merchant'

type MakeSutProps = {
  listMerchantsController: Controller
  createMerchantController: Controller
}

export const makeSut = (): MakeSutProps => {
  const merchantsMemoryRepository = new MemoryMerchantRepository()
  const listMerchantsController = new ListMerchantController(
    new ListMerchantService(merchantsMemoryRepository),
  )
  const createMerchantController = new CreateMerChantController(
    new CreateMerchantService(merchantsMemoryRepository),
  )
  return { listMerchantsController, createMerchantController }
}

describe('Test CreateMerChantController', () => {
  it('should return success with empty array when none were created', async () => {
    const { listMerchantsController } = makeSut()
    const res = await listMerchantsController.handle({})
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveLength(0)
  })
  it('should return success with array of 2', async () => {
    const { listMerchantsController, createMerchantController } = makeSut()
    const createParams: CreateMerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      miniBio: faker.word.words(5),
      phone: faker.phone.number('41 9#### ####'),
    }
    await createMerchantController.handle({ body: createParams })
    const res = await listMerchantsController.handle({})
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveLength(1)
  })
})
