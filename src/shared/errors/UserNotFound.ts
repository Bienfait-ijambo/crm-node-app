export class UserNotFound extends Error {
    constructor(message?: string) {
      super(message || 'NotFoundError');
      this.name = 'NotFoundError';

    }
  }
  