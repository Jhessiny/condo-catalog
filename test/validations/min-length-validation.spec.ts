import { MinLengthValidation } from '@/validations/validators/min-length/min-length-validation'
import { faker } from '@faker-js/faker'

const makeSut = (
  value: unknown,
  property: string,
  length: number,
  message?: string,
): MinLengthValidation =>
  new MinLengthValidation(value, property, length, message)

describe('first', () => {
  it('Should return falsy if value is valid', () => {
    const value = faker.word.noun(6)
    const property = faker.database.column()
    const length = 5
    const message = faker.word.words()
    const sut = makeSut(value, property, length, message)
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
  it('Should return falsy if value is empty', () => {
    const property = faker.database.column()
    const length = 5
    const message = faker.word.words()
    const sut = makeSut('', property, length, message)
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
  it('Should return error if string value length is under the limit', () => {
    const value = faker.word.noun(3)
    const property = faker.database.column()
    const length = 4
    const message = faker.word.words()
    const sut = makeSut(value, property, length, message)
    const error = sut.validate()
    expect(error?.error.message).toEqual(message)
  })
  it('Should return error if array value length is over the limit', () => {
    const length = 5
    const value = Array.from({ length: length - 1 })
    const property = faker.database.column()
    const message = faker.word.words()
    const sut = makeSut(value, property, length, message)
    const error = sut.validate()
    expect(error?.error.message).toEqual(message)
  })
  it('Should return error if not array nor string', () => {
    const length = 5
    const value = 12
    const property = faker.database.column()
    const message = faker.word.words()
    const sut = makeSut(value, property, length, message)
    const error = sut.validate()
    expect(error?.error.message).toEqual('Unable to validate input value.')
  })
})
