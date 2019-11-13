import ApplicationError from './ApplicationError';

export default class NotAuthenticated extends ApplicationError {
    constructor(message?: string) {
        super(message || 'Not Authenticated.', 404);
      }
}