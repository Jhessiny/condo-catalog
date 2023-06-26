import { RequiredValidation } from '@/validations/validators/required-field/required-field-validation'
import { faker } from '@faker-js/faker'

const makeSut = (
  value: unknown,
  property: string,
  message?: string,
): RequiredValidation => new RequiredValidation(value, property, message)

describe('first', () => {
  it('Should return falsy if value is valid', () => {
    const value = faker.word.noun(6)
    const property = faker.database.column()
    const message = faker.word.words()
    const sut = makeSut(value, property, message)
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
  it('Should return error if not array nor string', () => {
    const value = ''
    const property = faker.database.column()
    const message = faker.word.words()
    const sut = makeSut(value, property, message)
    const error = sut.validate()
    expect(error?.error.message).toEqual(message)
  })
})
