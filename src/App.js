import React, { Component } from 'react';
import './App.css';
import data from './processed.json';
import { Button, Input, Container, Divider, Form, Header, Segment, Icon } from 'semantic-ui-react';

const Mapper = require('greek-names-mapper');
const klitiki = require('greek-name-klitiki');

class App extends Component {

  state = {
    klitiki_name: '',
    greeklish_name: '',
    transformed: '',
    transformedNew: '',
    result: '',
    mapper: new Mapper(data)
  }

  toVocativeClick = () => {
    let { klitiki_name } = this.state;
    klitiki_name = klitiki_name.trim();

    if (!klitiki_name) {
      this.setState({ transformed: 'Πρέπει πρώτα να βάλεις όνομα', transformed: '' });
      return;
    }

    const transformed = klitiki(klitiki_name, false);
    this.setState({ transformed });
  }

  toGreekClick = () => {
    let { mapper, greeklish_name } = this.state;
    greeklish_name = greeklish_name.trim();
    
    if (!greeklish_name) {
      this.setState({ result: 'Πρέπει πρώτα να βάλεις όνομα', transformed: '' });
      return;
    }

    let result = mapper.match(greeklish_name);
    if (!result) {
      result = greeklish_name;
    }

    const transformedNew = klitiki(result, false);

    this.setState({ result, transformedNew });
  }

  render() {
    const { klitiki_name, greeklish_name, result, transformed, transformedNew } = this.state;

    return (
      <div className="App">
        <header>
          <Header as='h1'><Header.Content><Icon name="star" />Greek Names Mapper and Vocative Transformation</Header.Content></Header>
        </header>
        <Segment>
          <Container text>
            <Header as='h2'>Why?</Header>
            <p>
              We Greeks are used to having our names mistyped when the vocative form of our name is used. 
              <br />
              For example, Hi Christos in Greek is "Γειά σου Χρήστο"
            </p>
            <p>When web apps 'call' us by our name, we are used to see <b>"Γειά σου Χρήστος"</b> which is incorrect.</p>
            <p>Those two packages aim to solve this issue :)</p>
          </Container>
        </Segment>
        <Segment>
          <Container>
            <Header as='h2'><a href="https://github.com/chrispanag/greek-name-klitiki"><Icon name="github" />Transform to Vocative (Κλητική)</a></Header>
            <Form onSubmit={(event) => { event.preventDefault() }}>
              <Input style={{ width: '10vw', minWidth: '200px' }} type="text" value={klitiki_name} onChange={(event) => this.setState({ klitiki_name: event.target.value })} />
              <Button type="submit" style={{ marginLeft: '10px' }} onClick={this.toVocativeClick}>GO</Button>
            </Form>
            <p style={{ paddingTop: '30px', fontSize: '15px' }}><b>Vocative (κλητική):</b> {transformed}</p>

            <Divider />

            <Header as='h2'><a href="https://github.com/chrispanag/greek-name-mapper"><Icon name="github" />Translate Greek Name from Greeklish to Greek</a></Header>
            <Form onSubmit={(event) => { event.preventDefault() }}>
              <Input style={{ width: '10vw', minWidth: '200px' }} type="text" value={greeklish_name} onChange={(event) => this.setState({ greeklish_name: event.target.value })} />
              <Button type="submit" style={{ marginLeft: '10px' }} onClick={this.toGreekClick}>GO</Button>
            </Form>
            <p style={{ paddingTop: '30px', fontSize: '15px' }}><b>Translation:</b> {result}</p>
            <p style={{ paddingTop: '5px', fontSize: '15px' }}><b>Vocative (κλητική):</b> {transformedNew}</p>

          </Container>
        </Segment>

        <footer>
          <Divider />
          <p> Copyright <Icon name="copyright outline" /><a href="https://github.com/chrispanag">Christos Panagiotakopoulos</a></p>
          <p><Icon name="github" /> You can find the code of this (very simple) demo <a href="https://github.com/chrispanag/greek-name-mapper-demo"><b>here</b></a>.</p>
        </footer>
      </div>
    );
  }
}

export default App;
