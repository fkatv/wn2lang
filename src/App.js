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
  const [ortografia, setOrto] = useState('')
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
      setOrto(t[0])
      setTrad(t[1])
    }

    if (frase.length > 2){
      traduccion()
    } else {
      setOrto('')
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
          <p>{ortografia}</p>
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

        <Box mt={6}>

          <footer>Developed with 💖
            by <a href="https://github.com/fkatv">Fkatv</a>
            | <a href="https://github.com/fkatv/wn2lang">Wn2Lang Project</a>
          | <a href="https://github.com/fkatv/weon4js">weon4js Project</a>
          | <a href="https://github.com/fkatv/pyweon">pyWeon Project</a>
          </footer>
        </Box>
      </Box>
  );
}

export default App;
