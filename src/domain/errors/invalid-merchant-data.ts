import { AggregateError } from '@/shared/error-aggregator'

export class InvalidMerchantDataError extends AggregateError {
  public readonly name = 'InvalidMerchantDataError'
}
