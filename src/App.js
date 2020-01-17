import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      hideList: true,
      items: [],
      id: -1,
      showWindowPortal: false,
    };
    this.toggleWindowPortal = this.toggleWindowPortal.bind(this);
    this.closeWindowPortal = this.closeWindowPortal.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/items")
      .then(resp => resp.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            items: data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleChange(id) {
    this.setState(state => ({
      hideList: !state.hideList,
      id: id
    }));

    window.addEventListener('beforeunload', () => {
      this.closeWindowPortal();
    });

  }

  toggleWindowPortal() {
    this.setState(state => ({
      ...state,
      showWindowPortal: !state.showWindowPortal,
    }));
  }

  closeWindowPortal() {
    this.setState({ showWindowPortal: false})
  }

  render() {
    const { error, isLoaded, items, id } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>

          <ul>{items.map((post, index) => (
            <li key={index} onClick={this.handleChange.bind(this, index)}>{index + 1} - {post.brand}: {post.model}
              <div class="buttons">
                <button onClick={this.toggleWindowPortal}>{this.state.showWindowPortal ? 'Close link' : 'Open link'}</button>
              </div>
              <ul style={this.state.hideList && (id === index) ? { display: 'block' } : { display: 'none' }}>
                <li>Price: {post.price}</li>
                <li>Screen size: {post.screenSize}</li>
                <li>Price: {post.price}</li>
                <li>Screen width: {post.screenWidth}</li>
                <li>Unit: {post.unit}</li>
                <li>Weight: {post.weight}</li>
              </ul>
            </li>
          ))}
          </ul>
          {this.state.showWindowPortal && (
            <MyWindowPortal closeWindowPortal={this.closeWindowPortal} >


              <div>{items.map((post, index) => (
                <ul style={(id === index) ? { display: 'block' } : { display: 'none' }}><b>{index + 1} - {post.brand}: {post.model}</b>
                  <li>Price: {post.price}</li>
                  <li>Screen size: {post.screenSize}</li>
                  <li>Price: {post.price}</li>
                  <li>Screen width: {post.screenWidth}</li>
                  <li>Unit: {post.unit}</li>
                  <li>Weight: {post.weight}</li>
                </ul>
              ))}
              </div>

              <button onClick={() => this.closeWindowPortal()} >
                Back to results
              </button>
            </MyWindowPortal>
          )}

        </div>
      );
    }
  }
}

class MyWindowPortal extends React.PureComponent {
  constructor(props) {
    super(props);
    // STEP 1: create a container <div>
    this.containerEl = document.createElement('div');
    this.externalWindow = null;
  }

  componentDidMount() {
    // STEP 3: open a new browser window and store a reference to it
    this.externalWindow = window.open('', '', 'width=600,height=400,left=200,top=200');

    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    this.externalWindow.document.body.appendChild(this.containerEl);
    this.externalWindow.document.title = 'Additional info of clicked Item';
    copyStyles(document, this.externalWindow.document);

    // update the state in the parent component if the user closes the 
    // new window
    this.externalWindow.addEventListener('beforeunload', () => {
      this.props.closeWindowPortal();
    });
  }

  componentWillUnmount() {
    // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
    // So we tidy up by closing the window
    this.externalWindow.close();
  }

  render() {
    // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }
}

function copyStyles(sourceDoc, targetDoc) {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // for <style> elements
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

export default App; 