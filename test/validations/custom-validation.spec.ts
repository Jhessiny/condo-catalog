import { CustomValidation } from '@/validations/validators/custom-validation/custom-validation'
import { faker } from '@faker-js/faker'

const makeSut = (
  value: unknown,
  property: string,
  pattern: RegExp,
  message?: string,
): CustomValidation => new CustomValidation(value, property, pattern, message)

describe('test CustomValidation', () => {
  it('should return error for invalid uuid', async () => {
    const sut = makeSut(
      'asasas',
      'id',
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
      'Value should be a uuid',
    )
    const error = sut.validate()
    expect(error).toBeInstanceOf(Error)
    expect(error?.message).toBe('Value should be a uuid')
  })
  it('should return null for empty uuid', async () => {
    const sut = makeSut(
      '',
      'id',
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
      'Value should be a uuid',
    )
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
  it('should return null for valid uuid', async () => {
    const sut = makeSut(
      faker.string.uuid(),
      'id',
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,
      'Value should be a uuid',
    )
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
})
