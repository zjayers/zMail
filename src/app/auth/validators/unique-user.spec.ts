import { UniqueUser } from './unique-user';
import { AuthService } from '../auth.service';

describe('UniqueUser', () => {
  it('should create an instance', () => {
    expect(new UniqueUser()).toBeTruthy();
  });
});
