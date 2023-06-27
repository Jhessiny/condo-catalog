import { CreateMerchantService } from '@/application/services'
import { FindMerchantByIdService } from '@/application/services/find-merchant-by-id/find-merchant-by-id'
import { type CreateMerchantDTO } from '@/domain/merchant'
import { MemoryMerchantRepository } from '@/infra/merchant-memory-repository/memory-merchant-repository'
import { CreateMerChantController } from '@/presentation/controllers'
import { FindMerchantByIdController } from '@/presentation/controllers/find-merchant-by-id-controller/find-merchant-by-id-controller'
import { faker } from '@faker-js/faker'

type MakeSutProps = {
  findMerchantByIdController: FindMerchantByIdController
  createMerchantController: CreateMerChantController
}

export const makeSut = (): MakeSutProps => {
  const merchantsMemoryRepository = new MemoryMerchantRepository()
  const findMerchantByIdController = new FindMerchantByIdController(
    new FindMerchantByIdService(merchantsMemoryRepository),
  )
  const createMerchantController = new CreateMerChantController(
    new CreateMerchantService(merchantsMemoryRepository),
  )
  return { findMerchantByIdController, createMerchantController }
}

describe('test FindMerchantByIdController', () => {
  it('should return found merchant', async () => {
    const { findMerchantByIdController, createMerchantController } = makeSut()
    const createParams: CreateMerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      phone: faker.phone.number('41 9#### ####'),
    }
    const createdMerchant = await createMerchantController.handle({
      body: createParams,
    })
    const res = await findMerchantByIdController.handle({
      params: { id: createdMerchant.body.id },
    })
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe(createParams.name)
  })
  it('should return 404 when no merchant was created', async () => {
    const { findMerchantByIdController } = makeSut()
    const res = await findMerchantByIdController.handle({
      params: { id: faker.string.uuid() },
    })
    expect(res.statusCode).toBe(404)
  })
  it('should return not found merchant when id is not from a created merchant', async () => {
    const { findMerchantByIdController, createMerchantController } = makeSut()
    const createParams: CreateMerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      phone: faker.phone.number('41 9#### ####'),
    }
    await createMerchantController.handle({
      body: createParams,
    })
    const res = await findMerchantByIdController.handle({
      params: { id: faker.string.uuid() },
    })
    expect(res.statusCode).toBe(404)
  })
})
