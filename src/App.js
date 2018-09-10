import React, { Component } from 'react';
import './App.css';
import data from './processed.json';
import { Button, Input } from 'semantic-ui-react';

const Mapper = require('greek-names-mapper');
const klitiki = require('greek-name-klitiki');

class App extends Component {
  
  state = {
    name: '',
    transformed: '',
    result: '',
    mapper: new Mapper(data)
  }

  onClick = () => {
    const { mapper, name } = this.state;
    if(!name) {
      this.setState({ result: 'Πρεπει να βάλεις όνομα', transformed: ''});
      return
    }
    let result = mapper.match(name);
    if(!result) {
      result = name;
    }
    const transformed = klitiki(result, false);
    this.setState({ result, transformed }); 
  }
  
  render() {
    const { name, result, transformed } = this.state;
    return (
      <div className="App">
          <h2>Απο Greeklish σε Ελληνικά</h2>
          <form onSubmit={(event) => {event.preventDefault()}}>
            <Input style={{ width: '10vw', minWidth: '200px'}} type="text" value={name} onChange={(event) => this.setState({ name: event.target.value })}/>
            <Button type="submit" style={{ marginLeft: '10px' }} onClick={this.onClick}>GO</Button>
          </form>
          <p style={{ paddingTop: '30px', fontSize: '22px'}}>Μετάφραση : {result}</p>
          <p style={{ paddingTop: '10px', fontSize: '22px'}}>Κλητική : {transformed}</p>
      </div>
    );
  }
}

export default App;
