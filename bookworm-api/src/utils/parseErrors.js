import _ from 'lodash';

export default function parseError() {
  const result = {};
  _.forEach(errors, (val key) => {
    resultkey[key] = val.message
  })
  return result;
}
