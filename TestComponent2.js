/* eslint react/prop-types:0 */
import React from 'react';

class TestComponent2 extends React.Component {
  render() {
    return <div className="test-class"><span>Hi! {this.props.name}</span></div>;
  }
}

export default TestComponent2;
