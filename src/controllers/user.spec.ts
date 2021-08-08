import { expect } from 'chai';

import * as User from './user';
import * as myMongoose from '../my-mongoose';

const fixture = {
  name: 'John Doe',
  hobbies: []
};

let userId: string;

myMongoose.connect();

describe('controllers/user', () => {
  it('create', async () => {
    const user = await User.create(fixture);
    expect(user.name).to.equal(fixture.name);
    expect(user.hobbies).to.deep.equal([]);
    userId = user._id;
  });

  it('retrieve by id', async () => {
    const user = await User.retrieve(userId);
    expect(user.name).to.equal(fixture.name);
    expect(user.hobbies).to.deep.equal([]);
  });

  it('update by id', async () => {
    const newName = 'John Smith';
    await User.update({ name: newName, _id: userId });
    const user: User.StoredUserType = await User.retrieve(userId);
    expect(user.name).to.equal(newName);
    expect(user.hobbies).to.deep.equal([]);
  });

  it('delete by id', async () => {
    await User.del(userId);
    const user = await User.retrieve(userId);
    expect(user).to.be.null;
  });

});

