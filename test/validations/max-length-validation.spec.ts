import { MaxLengthValidation } from '@/validations/validators/max-length/max-length-validation'
import { faker } from '@faker-js/faker'

const makeSut = (
  value: unknown,
  property: string,
  length: number,
  message?: string,
): MaxLengthValidation =>
  new MaxLengthValidation(value, property, length, message)

describe('first', () => {
  it('Should return falsy if value is valid', () => {
    const value = faker.word.noun(4)
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
  it('Should return error if string value length is over the limit', () => {
    const value = faker.word.noun(3)
    const property = faker.database.column()
    const length = 2
    const message = faker.word.words()
    const sut = makeSut(value, property, length, message)
    const error = sut.validate()
    expect(error?.error.message).toEqual(message)
  })
  it('Should return error if array value length is over the limit', () => {
    const length = 5
    const value = Array.from({ length: length + 1 })
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
