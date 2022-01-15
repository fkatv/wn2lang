import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const {lang, setLang} = props

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Idioma</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          label="Lang"
          onChange={handleChange}
        >
          <MenuItem value={'es'}>Español</MenuItem>
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'fr'}>Francoise</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
