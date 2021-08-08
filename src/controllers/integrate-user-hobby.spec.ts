import { expect } from 'chai';

import * as User from './user';
import * as Hobby from './hobby';
import * as myMongoose from '../my-mongoose';

const hobbyFixtures = [
  {
    name: 'Flamenco',
    year: 2027,
    passionLevel: 3,
  }, {
    name: 'Stamp Collecting',
    year: 1979,
    passionLevel: 1,
  },
];

const userFixture = {
  name: 'John Doe',
  hobbies: []
};


let userId: string;

myMongoose.connect();

describe('controller/integrate user-hobby', () => {
  describe('hobby', () => {
    it('creates some hobbies', async () => {
      for (let hobbyFixture of hobbyFixtures) {
        const hobby = await Hobby.create(hobbyFixture);
        expect(hobby.name).to.equal(hobbyFixture.name);
        userFixture.hobbies.push(hobby._id);
      }
    });
  });

  describe('user with hobbies', () => {
    it('create', async () => {
      const user = await User.create(userFixture);
      expect(user.name).to.equal(userFixture.name);
      expect(user.hobbies).to.have.length(hobbyFixtures.length);
      // Needed? expect(user.hobbies.map(v => v.name)).length.to.deep.equal(hobbyFixtures.map(v => v.name));
    });

  });
});

