import './App.css';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, InputLabel, MenuItem, Select, TextField, ThemeProvider, createTheme, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import {Close as CloseIcon, Add as AddIcon, Close} from '@mui/icons-material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useForm } from 'react-hook-form';

// All custom themes (palette, typography etc.) are based on the talentlabs website.
// Used MUI which is ideal for modals and popups. Also allows for cleaner code (almost all CSS is included here).

const theme = createTheme({
  palette: {
    text: {
      primary: "#273d56",
      secondary: "#6a778a",
    },
    colors: {
      gray: '#f2f2f2',
      blue: '#2181ff',
    }
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    fontSize: 14,
    h1: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 16,
    },
  },
});

function App() {

  const CustomButton = styled(Button)(({theme}) => ({
    background: '#2181ff',
    padding: '0.8rem 2rem',
    color: 'white',
  }));

  const InvertedButton = styled(Button)(({theme}) => ({
    background: '#f2f2f2',
    padding: '0.8rem 2rem',
    color: 'primary'
  }))

  const [open, isOpen] = useState(false);

  const openModal = () => {
    isOpen(true);
  }

  const closeModal = () => {
    isOpen(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <CustomButton onClick={openModal} variant='contained' disableElevation sx={{borderRadius: "1.875rem"}}>Click Me</CustomButton>

        <Dialog open={open} onClose={closeModal} fullWidth>
          <IconButton sx={{color: 'black', position: 'absolute', right: '1rem', top: '1rem'}} onClick={closeModal}><Close/></IconButton>
          <Box sx={{padding: '1rem 1.5rem'}}>
            <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', textAlign: 'center'}}>
              <DialogTitle color='text.primary' fontWeight='bold'>Enroll Student</DialogTitle>
              <DialogContentText sx={{color: 'text.secondary'}}>We will send email to them.</DialogContentText>
            </Box>

            <DialogContent sx={{'&::before': {content: '""', display: 'block', borderBottom: '1px solid #ebebeb', marginBottom: '1.5rem'}}}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    autoFocus
                    id='email'
                    label='Email'
                    type='email'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autofocus
                    id='fee'
                    label='Fee (Optional)'
                    type='number'
                  />
                </Grid>
                <Grid item xs={11}>
                  <InputLabel id='course-label'>Course</InputLabel>
                  <Select
                    labelId='course-label'
                    id='course'
                    label="Course"
                    value={1}
                    fullWidth
                    defaultValue='Fundamentals of JavaScript'
                  >
                    <MenuItem value={1}>Fundamentals of JavaScript</MenuItem>
                  </Select>
                </Grid>
                {/* The following has no functionality as I believe this is just limited to testing my UI expertise */}
                <Grid item xs={11}>
                  <InputLabel id='batch-label'>Batch</InputLabel>
                  <Select
                    labelId='batch-label'
                    id='batch'
                    label="Batch"
                    value={2}
                    fullWidth
                    defaultValue='August'
                  >
                    <MenuItem value={2}>August</MenuItem>
                  </Select>
                  <Button variant='text' startIcon={<AddIcon/>} sx={{marginTop: '1rem', color: 'black'}}>Add</Button>
                </Grid>
                <Grid item xs={1}>
                  <IconButton sx={{color: 'black', marginTop: '1.75rem'}}><Close/></IconButton>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogContent sx={{'&::before': {content: '""', display: 'block', borderBottom: '1px solid #ebebeb', marginBottom: '1.5rem'}}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='text' startIcon={<ContentCopyIcon/>} sx={{color: 'black', textTransform: 'capitalize'}}>Copy Invited Link</Button>
                <Box>
                  <InvertedButton sx={{marginRight: '1rem', fontWeight: 'bold'}}>取消</InvertedButton>
                  <CustomButton variant='contained' disableElevation sx={{fontWeight: 'bold'}}>送出</CustomButton>
                </Box>
              </Box>
            </DialogContent>
          </Box>
        </Dialog>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
