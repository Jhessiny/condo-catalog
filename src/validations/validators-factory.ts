import { type Validator } from './models'
import { type ValidationsCompositor } from './types/validations-compositor'
import { ValidationBuilder } from './validators/validation-builder/validation-builder'
import { ValidationsComposite } from './validators/validation-composite'

export const triggerValidation = (
  validations: Validator[][],
): ValidationsCompositor.Return => {
  return ValidationsComposite.build(validations.flat()).validateValues()
}

export const valueValidation = (
  value: unknown,
  property: string,
): ValidationBuilder => {
  return ValidationBuilder.value(value, property)
}
