import { expect } from 'chai';
import * as myMongoose from '../my-mongoose';

import * as Hobby from './hobby';

const fixture = {
  name: 'Stamp Collecting',
  year: 1977,
  passionLevel: 1
};

let hobbyId: string;

myMongoose.connect();

describe('controllers/hobby', () => {
  it('cretae', async () => {
    const hobby = await Hobby.create(fixture);
    expect(hobby.name).to.equal(fixture.name);
    hobbyId = hobby._id;
  });

  it('retrieve by id', async () => {
    const hobby = await Hobby.retrieve(hobbyId);
    expect(hobby.name).to.equal(fixture.name);
  });

  it('update by id', async () => {
    const newName = 'John Smith';
    await Hobby.update({ name: newName, _id: hobbyId });
    const hobby: Hobby.StoredHobbyType = await Hobby.retrieve(hobbyId);
    expect(hobby.name).to.equal(newName);
  });

  it('delete by id', async () => {
    await Hobby.del(hobbyId);
    const hobby = await Hobby.retrieve(hobbyId);
    expect(hobby).to.be.null;
  });

  describe('bad input', () => {
    for (let field in ['name', 'passionLevel', 'year']) {
      it(`Create hobby using ${field} with null value`, async () => {
        try {
          await Hobby.create({ ...fixture, [field]: null });
        } catch (e) {
          expect(e).to.be.an.instanceof(Error);
          expect(e.toString()).to.equal('ValidationError: name: Path `' + field + '` is required.');
        }
      });
    }

    xit(`More validation tests`);
  });
});

