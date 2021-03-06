import { expect, default as chai } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

import { Request } from '../src';

describe('Request', () => {

  let axiosClient;
  beforeEach(() => {
    axiosClient = sinon.stub().resolves({ data: {} });
  });

  it('is a class', () => {
    expect(Request).to.be.an.instanceof(Function);
    expect(new Request).to.be.an.instanceof(Request);
  });

  describe('get options()', () => {
    it('returns the request options', () => {
      const options = {
        method: 'POST',
        url: 'http://localhost/some/request',
      };
      const request = new Request(options, axiosClient);
      expect(request.options).to.deep.equal(options);
    });
  });

  describe('with()', () => {
    it('allows changing any option', () => {
      const options = {
        method: 'POST',
        url: 'http://localhost/some/request',
      };
      const request = new Request(options, axiosClient)
        .with({ url: 'http://another/url' });

      expect(request.options).to.deep.equal({
        ...options,
        url: 'http://another/url',
      });
    });
  });

  describe('withHeaders()', () => {
    it('allows changing headers', () => {
      const options = {
        method: 'POST',
        url: 'http://localhost/some/request',
        headers: {
          'Content-Type': 'application/json',
          'Another-Header': 'default-value',
        },
      };
      const request = new Request(options, axiosClient)
        .withHeaders({ 'Another-Header': 'non-default-value' });

      expect(request.options.headers['Another-Header']).to.equal('non-default-value');
    });
  });

  describe('get promise()', () => {

    let request;
    beforeEach(() => {
      const options = {
        method: 'POST',
        url: 'http://localhost/some/request',
      };
      request = new Request(options, axiosClient)
        .with({ url: 'http://another/url' });
    });

    it('returns a Promise', () => {
      expect(request.promise).to.be.an.instanceOf(Promise);
    });

    it('consecutive calls returns the same Promise', () => {
      expect(request.promise).to.equal(request.promise);
    });
  });

});
