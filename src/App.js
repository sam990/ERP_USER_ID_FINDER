import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import logo from './biet_logo.png';
import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core';
import getDetails from './dataMap.js';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#ffffff',
      dark: '#ffffff',
    },

  }
});

function Heading() {
  return(
    <header className="App-header">
      <div className="Heading">
          <img src={logo} className="Logo" alt="logo" />
          <div>
            <p className="Heading-text">Training&nbsp;&&nbsp;Placement&nbsp;Cell<br/>BIET, Jhansi</p> 
          </div>
      </div>
      <hr className="Divider"/>
    </header>
  );
}


function Result(props) {
  const { rollNo } = props;
  if (rollNo.length == 0) {
    return null;
  }
  let result = getDetails(rollNo);
  if (result == null) {
    return (
      <div className="Result-holder">
        <p className="Result-error">Roll Number not found.</p>
      </div>
    );
  }
  if (result.userId.length != 0) {
    return(
      <div className="Result-holder">
        <div>Name: {result.name}</div>
        <div className="divider3vh"></div>
        <div>User ID: {result.userId} </div>
      </div>
    )
  } else {
    return (
      <div className="Result-holder">
        <div>Name: {result.name}</div>
        <div className="divider3vh"></div>
        <p className="Result-error">It seems you are not registered at AKTU's portal. Contact TPC coordinators.</p>
      </div>
    );
  }
}



function Body() {

  const [buttonState, setButtonState] = useState(true);
  const [resultState, setResultState] = useState("");
  
  let onChangeHandler = (e) => {
    if(e.target.value.length == 10) {
      setButtonState(false);
    } else {
      setButtonState(true);
    }
  };

  let buttonClickHandler = () => {
    setResultState(document.getElementById('rollNo').value);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App-body">
        <div className="Find-id">
          Get your ERP User ID
        </div>
        <TextField id="rollNo" label="Roll Number" variant="outlined" size="small" fullWidth
          onChange={onChangeHandler}
        />
        <div className="divider5vh"></div>
        <Button
          className="Button"
          variant="contained"
          color="primary"
          style={{ borderRadius: 25 }} fullWidth disabled={buttonState}
          onClick={buttonClickHandler}
          >Check</Button>
        <div className="divider10vh"></div>
        <Result rollNo={resultState}/>
      </div>
    </ThemeProvider>
    
  );
}

function Footer() {
  return (
    <div className="App-footer">
      <div className="Footer-text">© 2020 Sameer Ahmad</div>
    </div>
  );
}


function App() {
  return (
      <div className="App-root">
        <Heading/>
        <Body/>
        <Footer/>
      </div>
  );
}

export default App;
