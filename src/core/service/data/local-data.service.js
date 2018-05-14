import { serializer } from './serializer';

let storage = localStorage;

class LocalDataService {
  get(key) {
    return serializer.deserialize(storage[key]);
  }

  set(key, data) {
    storage[key] = serializer.serialize(data);
  }
}

export const localDataService = new LocalDataService();
