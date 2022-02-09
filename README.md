# magicrest

The goal of this library is to make rest api clients easy and generic.

## Usage example

```javascript

import { createClient } from '@enspirit/magicrest';

const client = createClient('http://localhost');

// GET http://localhost/
await client.get();

// GET http://localhost/people
await client.people.get();

// GET http://localhost/people?filter=value
await client.people.get({ filter: 'value' });

// GET http://localhost/people/12
await client.people(12).get();

// GET http://localhost/people/12/hobbies
await client.people(12).hobbies.get();

// DELETE http://localhost/people/12/hobbies/24
await client.people(12).hobbies(24).delete();

// POST http://localhost/people/12/hobbies
// with body: { name: 'Bass playing' }
await client.people(12).hobbies.post({ name: 'Bass playing' });
```

## Close relationship with Promises

It is important to know that magicrest only triggers HTTP request when the [Promise API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is being used.

This means that http request will only be triggered when one of the following method is being called on magicrest's returned objects:

* `then()`
* `catch()`
* `finally()`

