import assert from 'assert';
import app from '../src/app';

describe('authentication', () => {
  it('registered the authentication service', () => {
    assert.ok(app.service('authentication'));
  });
  
  describe('local strategy', () => {
    const userInfo = {
      email: 'someone@example.com',
      password: 'supersecret',
      id: 'dfgjkbbcdadtyuiojhjkl',
      auth0Id: 'sdfgjnbvcx45684567890',
      dateOfBirth: new Date('1988-09-13'),
      hobbies: []
    };

    before(async () => {
      try {
        await app.service('users').create(userInfo, {});
      } catch (error) {
        // Do nothing, it just means the user already exists and can be tested
      }
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo
      }, {});
      
      assert.ok(accessToken, 'Created access token for user');
      assert.ok(user, 'Includes user in authentication data');
    });
  });

});
