import React from 'react';
import { Message } from 'semantic-ui-react';

export default (): Element<any> => (
  <Message info>
    <Message.Header>
      Please, verify your email to unlock awesomeness
    </Message.Header>
  </Message>
);
