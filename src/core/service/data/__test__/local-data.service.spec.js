import { localDataService } from '../';
import { serializer } from '../serializer';

/**
 * Test get()
 * @return {Void}
 */
const testGet = () => {
  it('get', () => {
    // arrange
    const deserializeSpy = sinon.spy(serializer, 'deserialize');

    // sut
    localDataService.get();

    // expect
    assert.isTrue(deserializeSpy.called);
  });
};

/**
 * Test set()
 * @return {Void}
 */
const testSet = () => {
  it('get', () => {
    // arrange
    const serializeSpy = sinon.spy(serializer, 'serialize');

    // sut
    localDataService.set();

    // expect
    assert.isTrue(serializeSpy.called);
  });
};

describe('scroll-top.component.spec.js', () => {
  testGet();
  testSet();
});