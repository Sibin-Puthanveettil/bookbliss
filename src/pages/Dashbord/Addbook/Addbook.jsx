import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { MuiFileInput } from 'mui-file-input'
import { Container, Typography } from '@mui/material';
import { Navbar,Footer } from '../../../components';






const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const Addbook = () => {


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [fileName, setFileName] = React.useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  }

  return (
  
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <>
      <Navbar/>
      </>
      <Container sx={{backgroundColor:'LightYellow',marginTop:5,borderRadius:5,marginBottom:5,paddingTop:2}}>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Book
        </Typography>
      
      </Box>
      <div>
        <TextField
          label="Name Of book"
          id="outlined-start-name"
          sx={{ m: 1, width: '35ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />
        <TextField
          label="Author"
          id="outlined-start-name"
          sx={{ m: 1, width: '35ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />

        <FormControl fullWidth sx={{ m: 1 ,width:'35ch'}}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
      </div>

      <div>
    <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Catagory</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Language</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
          label="Quantity NO.s"
          id="outlined-start-name"
          sx={{ m: 1, width: '35ch' }}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            },
          }}
        />
    
      </div>
      <div>
      <TextField
        id="outlined-multiline-static"
        label="Multiline"
        sx={{ m: 1, width: '35ch' }}
        multiline
        rows={4}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start', // Align items to the start
          justifyContent: 'center',
          padding: 2,
          border: '1px dashed #ccc',
          borderRadius: 2,
          width: '100%',
          maxWidth: 400,
          margin: 'auto',
          position: 'relative',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Upload a File
        </Typography>
        <input
          accept="*"
          style={{ display: 'none' }}
          id="file-input"
          type="file"
          onChange={handleFileChange}
        />
        <label htmlFor="file-input">
          <Button variant="contained" component="span" sx={{ marginTop: 1 }}>
            Choose File
          </Button>
        </label>
        {fileName && (
          <TextField
            variant="outlined"
            value={fileName}
            InputProps={{
              readOnly: true,
            }}
            sx={{ marginTop: 2, width: '100%' }}
          />
        )}
      </Box>
    </div>
<div>
<Stack direction="row" spacing={2} >
      {/* <Button color="secondary">Secondary</Button> */}
      <Button variant="contained" color="success" >
        Submit
      </Button>
      {/* <Button variant="outlined" color="error">
        Error
      </Button> */}
    </Stack>
</div>
    </Container>
<Footer
sx={{
  display:'flex',
}}
/>
    </Box>
  );
};

export default Addbook;


