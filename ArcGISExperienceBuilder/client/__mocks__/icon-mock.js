/**
 * we can't use 
 *   module.exports = () => null
 * because this will break enzyme.mount()
 */
var React = require('react');

module.exports = jest.fn((props) => {
  return React.createElement('svg', props);
});
