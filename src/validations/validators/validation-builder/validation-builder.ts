import { type Validator } from '@/validations/models'
import {
  MinLengthValidation,
  RequiredValidation,
  MaxLengthValidation,
  CustomValidation,
} from '../'
import { type ValidationError } from '@/validations/models/validation-error'

export class ValidationBuilder {
  private constructor(
    private readonly value: unknown,
    private readonly property: string,
    private readonly validations: Validator[],
  ) {}

  static value(value: unknown, property: string): ValidationBuilder {
    return new ValidationBuilder(value, property, [])
  }

  build(): Validator[] {
    return this.validations
  }

  min(length: number, message?: string): ValidationBuilder {
    this.validations.push(
      new MinLengthValidation(this.value, this.property, length, message),
    )
    return this
  }

  max(length: number, message?: string): ValidationBuilder {
    this.validations.push(
      new MaxLengthValidation(this.value, this.property, length, message),
    )
    return this
  }

  custom(pattern: RegExp, message?: string): ValidationBuilder {
    this.validations.push(
      new CustomValidation(this.value, this.property, pattern, message),
    )
    return this
  }

  uuid(): ValidationBuilder {
    const pattern =
      /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/
    const message = 'Value should be a uuid'
    this.validations.push(
      new CustomValidation(this.value, this.property, pattern, message),
    )
    return this
  }

  required(message?: string): ValidationBuilder {
    this.validations.push(
      new RequiredValidation(this.value, this.property, message),
    )
    return this
  }

  trigger(): ValidationError[] | null {
    const validationResult = this.validations
      .flatMap((validation) => validation.validate()?.error)
      .filter((item) => item !== undefined)
    return validationResult.length > 0
      ? (validationResult as ValidationError[])
      : null
  }
}
