import './App.css';
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Wn from './utils/weon4.js'
import firebase from 'firebase';
import firebaseConfig from "./fconfig.js"

const wn = new Wn()

function App() {
  const [frase, setFrase] = useState('')
  const [traduccion, setTrad] = useState('')

  const assignText = (e) => {
    setFrase(e.target.value)
  }

  function initFirebase(){
    if (firebaseConfig){
      const app = firebase.initializeApp(firebaseConfig);
      const analytics = firebase.analytics();
      console.log(analytics)
    }
  }

  useEffect(() => {
    initFirebase()
  },[])

  useEffect(() => {
    async function traduccion () {
      let t = await wn.translate(frase)
      console.log('TRADUCCION: ',t)
      setTrad(t)
    }

    if (frase.length > 2){
      traduccion()
    } else {
      setTrad('')
    }
  }, [frase])

  return (
      <Box p={4} className="App-header">
        <h1>Traduce weás.</h1>
        <p> <sub> Primer traductor de español chileno. </sub>
        <Chip label="alfa" color="primary" size="small" variant="outlined" /></p>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6} >
            <TextField
              label="Frase chilena"
              fullWidth multiline
              onChange = {assignText}
              value = {frase}
              rows={4}
              variant="filled"
              placeholder="Escribe alguna weá."
            />
          </Grid>

          <Grid item item xs={12} md={6} >
            <TextField
              label="Traducción"
              multiline fullWidth
              rows={4}
              InputProps={{
                readOnly: true,
              }}
              value = {traduccion}
            />
          </Grid>
        </Grid>
      </Box>
  );
}

export default App;
