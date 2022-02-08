import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react';

function Home() {
  const history = useHistory();

  return (
    <Segment inverted textAlign='center' vertical className='msthead'>
      <Container>
        <Header as='h1' inverted>
          Edemy
        </Header>
        <Button size='huge' inverted onClick={() => history.push('/courses')}>
          Get Started
          <Icon name='arrow right' inverted />
        </Button>
      </Container>
    </Segment>
  );
}

export default Home;
