import assert from 'assert';
import app from '../../src/app';
import services from '../../src/services';

describe('\'messages\' service', () => {
  it('registered the service', () => {
    const service = app.service('messages');
    assert.ok(service, 'Registered the service');
  });
  describe('\'messages\' service', () => {
    it('find messages', async () => {
      const service = app.service('messages');
      console.log('Find last num of message >>>> ');
      await service.find({
        headers: {
          type: 'lastNumMessages'
        },
        query: {
          num: 3
        }
      }).then((results) => {
        console.log(results);
      }).catch((err) => {
        console.log(err);
      });

      console.log('Find all message >>>> ');
      await service.find({}).then((results) => {
        console.log(results);
      }).catch((err) => {
        console.log(err);
      });

      assert.ok(service, 'find messages');
    });
  });

});
