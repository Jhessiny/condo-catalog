export class AggregateError extends Error {
  errors: Error[]
  constructor(errors: Error[], message?: string) {
    super(message)
    this.errors = errors
  }
}
