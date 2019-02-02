import React, { Component } from "react";
import "./App.css";
import '@shopify/polaris/styles.css';
import { AppProvider, Page, Card, Button } from '@shopify/polaris';

class App extends Component {
  render(){
    return(
      <AppProvider apiKey="YOUR_API_KEY">
        <Page title="Example app">
          <Card sectioned>
            <Button onClick={() => alert('Button clicked!')}>Example button</Button>
          </Card>
        </Page>
      </AppProvider>
    ) 
  }
}

export default App;