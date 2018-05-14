import Immutable from 'immutable';

import { serializer } from '../serializer';

let serialize = serializer.serialize;
let deserialize = serializer.deserialize;

describe('serialize', () => {
  it('serialize and deserialize plain object', () => {
    // arrange
    let obj = { id: 1, name: 'testing' };

    // sut
    let json = serialize(obj);
    let deserializedObj = deserialize(json);

    // expect
    expect(json).to.equal(JSON.stringify(obj));
    expect(deserializedObj).to.eql(obj);
  });

  it('serialize and deserialize immutable object', () => {
    // arrange
    let obj = Immutable.fromJS({ id: 1, name: 'testing' });

    // sut
    let json = serialize(obj);
    let deserializedObj = deserialize(json);

    // expect
    expect(json).to.equal(JSON.stringify(Object.assign({}, obj.toJS(), { $immutable: true })));
    assert.equal(deserializedObj, obj);
  });

  it('serialize and deserialize mixed object properties', () => {
    // arrange
    let objImmutable = Immutable.fromJS({ id: 1, name: 'testing' });
    let obj = { email: 'abc@localhost.com', objImmutable };
    let tempObj = { email: obj.email, objImmutable: obj.objImmutable.toJS() };

    tempObj.objImmutable.$immutable = true;
    let expectedJson = JSON.stringify(tempObj);

    // sut
    let json = serialize(obj);
    let deserializedObj = deserialize(json);
    let failedDeserializedObj = deserialize();

    // expect
    assert.deepEqual(json, expectedJson);
    assert.deepEqual(failedDeserializedObj, null);
    assert.equal(deserializedObj.email, obj.email);
    assert.equal(deserializedObj.objImmutable, obj.objImmutable);
  });

});
