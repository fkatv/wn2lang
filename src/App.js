import './App.css';
import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Wn from './utils/weon4.js'
import firebase from 'firebase';
import firebaseConfig from "./fconfig.js"

const a_style={textDecoration: "none",}

function App() {
  const [wn, setWn] = useState(null)
  const [frase, setFrase] = useState('')
  const [lenfrase, setLenFrase] = useState("0/500")
  const [lang, setLang] = useState('es')
  const [ortografia, setOrto] = useState('')
  const [traduccion, setTrad] = useState('')

  const assignText = (e) => {
    setFrase(e.target.value)
  }

  const isStringNotNull = (st) => {
    return st.split(" ").join("") !== ""
  }

  function initFirebase(){
    if (wn === null) {
      if (firebaseConfig){
        const app = firebase.initializeApp(firebaseConfig);
        const analytics = firebase.analytics();
      }
      setWn(false) // lanza el useEffect de carga de instancia de weon
    }
  }

  useEffect(() => {
    if (wn === false){
      const _wn = new Wn()
      setWn(_wn)
    }
  }, [wn])

  useEffect(() => {
    initFirebase()
  },[])

  useEffect(() => {
    async function traduccion () {
      let t = await wn.translate(frase)
      setOrto(t[0])
      setTrad(t[1])
      setLenFrase(frase.length + "/500")
    }

    let tam = frase.length > 500 ? 500 : frase.length

    if (2 <= tam <= 500){
      if (wn && isStringNotNull(frase)) {
        traduccion()
      }
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

        {!wn && (
          <p>Loading this weas...</p>
        )}

        {wn && (
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
              helperText={lenfrase}
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
        )}
        <Box mt={6}>

          <footer>Developed with 💖
            by <a style={a_style} href="https://github.com/fkatv">Fkatv </a>
            | <a style={a_style} href="https://github.com/fkatv/wn2lang">Wn2Lang Project </a>
          | <a style={a_style} href="https://github.com/fkatv/weon4js">weon4js Project </a>
          | <a style={a_style} href="https://github.com/fkatv/pyweon">pyWeon Project </a>
          </footer>
        </Box>
      </Box>
  );
}

export default App;
