import pactum from 'pactum';
import { expect } from 'chai';

import { config } from '../../config';

pactum.request.setBaseUrl('http://localhost:' + config.httpPort);

const state = {
  user: {
    id: null
  },
};

const fixture = {
  user: {
    name: 'John Doe',
    hobbies: [],
  }
};

describe('routes/user', () => {
  it('Create', async () => {
    await pactum.spec().post('/user')
      .withJson(fixture.user)
      .expectStatus(201)
      .expect((ctx) => {
        // Pactum can validate against scheme, but I've not installed that yet
        expect(ctx.res.body).to.be.an('object');
        expect(ctx.res.body).to.have.ownProperty('user');
        expect(ctx.res.body.user).to.have.ownProperty('hobbies');
        expect(ctx.res.body.user).to.have.ownProperty('name');
        expect(ctx.res.body.user).to.have.ownProperty('_id');
        expect(ctx.res.body.user._id).not.to.be.null;
        state.user.id = ctx.res.body.user._id;
        console.log('Created user id', state.user.id);
      });
  });

  describe('Retrieve', async () => {
    it('upsetting param', async () => {
      await pactum.spec().get('/user/%*&%!')
        .expectStatus(500);
    });

    it('non existant', async () => {
      await pactum.spec().get('/user/9').expectStatus(404);
    });

    it('extant', async () => {
      expect(state.user.id).not.to.be.null;
      await pactum.spec().get('/user/' + state.user.id)
        .expectStatus(200)
        .expect((ctx) => {
          expect(ctx.res.body).not.to.be.null;
          expect(ctx.res.body).to.be.an('object');
          expect(ctx.res.body).to.have.ownProperty('user');
          expect(ctx.res.body.user).to.have.ownProperty('hobbies');
          expect(ctx.res.body.user).to.have.ownProperty('name');
          expect(ctx.res.body.user).to.have.ownProperty('_id');
          expect(ctx.res.body.user.name).to.equal(fixture.user.name);
        });
    });
  });
});