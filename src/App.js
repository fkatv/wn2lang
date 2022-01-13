import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Wn from './utils/weon.js'

const wn = new Wn()

function App() {
  const [frase, setFrase] = useState('')
  const [traduccion, setTrad] = useState('')

  const assignText = (e) => {
    setFrase(e.target.value)
  }

  useEffect(() => {
    if (frase.length > 2){
      let trad = wn.translate(frase)
      setTrad(trad)
    } else {
      setTrad('')
    }
  }, [frase])

  return (
    <div className="App">
      <Box p={4} className="App-header">
        <h1>Traduce weás.</h1>
        <p> <sub> Primer traductor de español chileno. </sub>
        <Chip label="pre-alfa" color="primary" size="small" variant="outlined" /></p>

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
              editable={false}
              value = {traduccion}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default App;
