// import { Long, serialize, deserialize } from 'bson';
import pkg from 'bson';
const { Long, serialize, deserialize, EJSON } = pkg;
// Serialize a document
const doc = { long: Long.fromNumber(100) };
const data = serialize(doc);
console.log('data:', data);

// De serialize it again
const doc_2 = deserialize(data);
console.log('doc_2:', doc_2);
