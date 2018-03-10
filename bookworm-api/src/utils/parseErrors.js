import _ from 'lodash';

export default function parseError(errors: {}): {} {
  const result = {};
  _.forEach(errors, ({ message }: { message: string }, key: string) => {
    resultkey[key] = message;
  });
  return result;
}
