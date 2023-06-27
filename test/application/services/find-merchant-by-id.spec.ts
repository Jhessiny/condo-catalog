import { CreateMerchantService } from '@/application/services'
import { FindMerchantByIdService } from '@/application/services/find-merchant-by-id/find-merchant-by-id'
import { type CreateMerchantDTO } from '@/domain/merchant'
import { MemoryMerchantRepository } from '@/infra/merchant-memory-repository/memory-merchant-repository'
import { faker } from '@faker-js/faker'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const makeSut = () => {
  const merchantMemoryRepository = new MemoryMerchantRepository()
  const createMerchantService = new CreateMerchantService(
    merchantMemoryRepository,
  )
  const findNewMerchantByIdService = new FindMerchantByIdService(
    merchantMemoryRepository,
  )
  return {
    createMerchantService,
    findNewMerchantByIdService,
  }
}
describe('Test CreateMerchantService', () => {
  it('should return success on execute with correct params', async () => {
    const createParams: CreateMerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      miniBio: faker.word.words(5),
      phone: faker.phone.number('41 9#### ####'),
    }
    const { createMerchantService, findNewMerchantByIdService } = makeSut()
    const { value } = await createMerchantService.execute(createParams)
    const res = await findNewMerchantByIdService.execute({
      id: (value as { id: string }).id,
    })
    expect(res.isSuccess()).toBeTruthy()
    expect(res.value.name).toBe(createParams.name)
  })
  it('should return success on execute with correct params', async () => {
    const id = faker.string.uuid()
    const { findNewMerchantByIdService } = makeSut()
    const res = await findNewMerchantByIdService.execute({ id })
    expect(res.isError()).toBeTruthy()
  })
  it('should return success on execute with correct params', async () => {
    const createParams: CreateMerchantDTO = {
      name: faker.word.noun(),
      category: faker.word.noun(),
      subCategory: faker.word.noun(),
      miniBio: faker.word.words(5),
      phone: faker.phone.number('41 9#### ####'),
    }
    const { createMerchantService, findNewMerchantByIdService } = makeSut()
    await createMerchantService.execute(createParams)
    const res = await findNewMerchantByIdService.execute({
      id: faker.string.uuid(),
    })
    expect(res.isError()).toBeTruthy()
  })
})
