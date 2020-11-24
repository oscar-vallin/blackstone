// __tests__/index.test.js
const {authenticateUser, userAuthenticated} = require('../controller/authControler');

test('get token', () => {
  expect(typeof authenticateUser()).toBe('object');
});

test('get user', () => {
  expect(typeof userAuthenticated()).toBe('object')
})

