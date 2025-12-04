export class UserNotFoundErr extends Error {
    constructor() {
        super('User not authenticated');
        this.name = 'UserNotFoundError';
    }
}
