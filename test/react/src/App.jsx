import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = {
    details: [],
  };

  componentDidMount() {
    axios.get('http://localhost:8000')
      .then(res => {
        const data = res.data;
        this.setState({
          details: data
        });
      })
      .catch(err => {
        console.error('Error fetching data:', err);
      });
  }

  render() {
    return (
      <div>
        <header>Data Generated from Django</header>
        <hr />
        {this.state.details.map((output, id) => (
          <div key={id}>
            <div>
              <h2>{output.employee}</h2>
              <h3>{output.department}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
