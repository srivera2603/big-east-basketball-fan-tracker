export class PostgresError extends Error {
  constructor(message: string) {
    super(`PostgresError: ${message}`);
    this.name = 'PostgresError';
  }
}
