import { expect, default as chai } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import axios from 'axios';
import { createClient } from '../src';

describe('createClient', () => {

  it('is a function', () => {
    expect(createClient).to.be.an.instanceof(Function);
  });

  it('returns a rest client for that endpoint', () => {
    const client = createClient('http://localhost');
    expect(client.get).to.be.an.instanceof(Function);
    expect(client.post).to.be.an.instanceof(Function);
    expect(client.put).to.be.an.instanceof(Function);
    expect(client.patch).to.be.an.instanceof(Function);
    expect(client.delete).to.be.an.instanceof(Function);
    expect(client.options).to.be.an.instanceof(Function);
  });

  it('creates a new axios client for that baseUrl', () => {
    const spy = sinon.spy(axios, 'create');
    const baseURL = 'http://localhost';
    const client = createClient(baseURL);
    expect(spy).to.be.calledOnceWith({ baseURL });
    spy.restore();
  });

  describe('the endpoint magic methods', () => {

    let axiosClient;
    let client;
    beforeEach(() => {
      axiosClient = sinon.stub().resolves({ data: { ok: true } });
      axios.create = sinon.stub(axios, 'create').returns(axiosClient);
      client = createClient('http://localhost');
    });

    afterEach(() => {
      axios.create.restore();
    });

    describe('.get()', () => {
      it('uses axios properly', () => {
        client.get();
        expect(axiosClient).to.be.calledOnceWith({
          method: 'GET',
          url: '',
        });
      });
    });

    describe('.post()', () => {
      it('uses axios properly', () => {
        client.post({ foo: 'bar' });
        expect(axiosClient).to.be.calledOnceWith({
          method: 'POST',
          url: '',
          data: {
            foo: 'bar',
          },
        });
      });
    });

    describe('when using subpath', () => {
      it('suffixes properly', () => {
        client.entities.people.get();
        expect(axiosClient).to.be.calledOnceWith({
          method: 'GET',
          url: '/entities/people',
        });
      });
    });

    describe('when parametrizing', () => {
      it('suffixes properly', () => {
        client.entities.people(123).hobbies.get();
        expect(axiosClient).to.be.calledOnceWith({
          method: 'GET',
          url: '/entities/people/123/hobbies',
        });
      });
    });

  });
});