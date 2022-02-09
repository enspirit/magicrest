# magicrest

The goal of this library is to make rest api clients easy and generic.

## Usage example

```javascript

import { createClient } from '@enspirit/magicrest';

const client = createClient('http://localhost');

// GET http://localhost/
client.get();

// GET http://localhost/people
client.people.get();

// GET http://localhost/people?filter=value
client.people.get({ filter: 'value' });

// GET http://localhost/people/12
client.people(12).get();

// GET http://localhost/people/12/hobbies
client.people(12).hobbies.get();

// GET http://localhost/people/12/hobbies/24
client.people(12).hobbies(25).delete();

// POST http://localhost/people/12/hobbies
// with body: { name: 'Bass playing' }
client.people(12).hobbies(25).post({ name: 'Bass playing' });
```
