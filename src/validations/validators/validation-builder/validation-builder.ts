import { type Validator } from '@/validations/models'
import { RequiredValidation } from '../required-field/required-field-validation'
import { MinLengthValidation } from '../min-length/min-length-validation'
import { MaxLengthValidation } from '../max-length/max-length-validation'

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

  required(message?: string): ValidationBuilder {
    this.validations.push(
      new RequiredValidation(this.value, this.property, message),
    )
    return this
  }
}
