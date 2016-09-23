'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('play service', function() {
  it('registered the plays service', () => {
    assert.ok(app.service('plays'));
  });
});
