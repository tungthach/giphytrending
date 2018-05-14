import Immutable, { Iterable } from 'immutable';

const isPrimivtive = (value) => {
  let type = typeof value;

  return Number.isFinite(value) || Array.isArray(value) || type === 'string' || value instanceof String;
};

const isImmutable = (obj) => {
  return obj && Iterable.isIterable(obj);
};

class Serializer {
  serialize = (obj, isRoot = true) => {
    if (!obj) {
      return null;
    }

    if (isImmutable(obj)) {
      return this.seiralizeImmutable(obj, isRoot);
    }

    return this.seiralizePlainObj(obj, isRoot);
  }

  seiralizePlainObj = (plainObj, isRoot) => {
    if (isPrimivtive(plainObj)) {
      return plainObj;
    }

    let newObj = {};

    for (const key in plainObj) {
      if (plainObj.hasOwnProperty(key)) {
        let value = plainObj[key];

        newObj[key] = this.serialize(value, false);
      }
    }

    return isRoot ? JSON.stringify(newObj) : newObj;
  }

  seiralizeImmutable = (plainObj, isRoot) => {
    let newObj = plainObj.toJS();

    newObj.$immutable = true;

    return isRoot ? JSON.stringify(newObj) : newObj;
  }

  deserialize = (objString) => {
    if (!objString) {
      return null;
    }

    try {
      let obj = JSON.parse(objString);

      return this.deserializeObj(obj);
    } catch (e) {
      return null;
    }
  }

  deserializeObj = (obj) => {
    if (obj.$immutable) {
      return this.deserializeImmutable(obj);
    }

    return this.deserializePlainObj(obj);
  }

  deserializePlainObj = (plainObj) => {
    if (isPrimivtive(plainObj)) {
      return plainObj;
    }

    let newObj = {};

    for (const key in plainObj) {
      if (plainObj.hasOwnProperty(key)) {
        let value = plainObj[key];

        newObj[key] = this.deserializeObj(value);
      }
    }

    return newObj;
  }

  deserializeImmutable = (immutableObj) => {
    Reflect.deleteProperty(immutableObj, '$immutable');

    return Immutable.fromJS(immutableObj);
  }
}

export const serializer = new Serializer();
