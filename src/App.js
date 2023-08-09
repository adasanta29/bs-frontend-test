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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fee: '',
    course: 'Fundamentals of JavaScript',
    batch: ''
  });

  const [batchRows, setBatchRows] = useState([
    {
      id: 1,
      value: 'August',
    },
  ]);

  const onSubmit = (data) => {
    setIsSubmitted(true);
    setFormData(data);
  }

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      email: '',
      fee: '',
      course: 'Fundamentals of JavaScript',
      batch: '',
    });
    setBatchRows([
      {
        id: 1,
        value: 'August',
      }
    ]);
    setValue('email', '');
    setValue('fee', '');
    setValue('course', 'Fundamentals of JavaScript');
    setValue('batch', '');
  }

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

  const handleBatchChange = (id) => (event) => {
    const newValue = event.target.value;
    setBatchRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, value: newValue } : row))
    );
  };

  const addBatchRow = () => {
    if (batchRows.length < 3) {
      const newId = batchRows.length + 1;
      setBatchRows((prevRows) => [
        ...prevRows,
        {id: newId, value: 'August'}
      ]);
    }
  };

  const removeBatchRow = (id) => () => {
    if (batchRows.length > 1) {
      setBatchRows((prevRows) => prevRows.filter((row) => row.id !== id));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">

        <CustomButton 
          onClick={openModal} 
          variant='contained' 
          disableElevation 
          sx={{borderRadius: "1.875rem"}}
        >
          Click Me
        </CustomButton>

        <Dialog open={open} onClose={closeModal} fullWidth component="form">

          <IconButton 
            sx={{color: 'black', position: 'absolute', right: '1rem', top: '1rem'}} 
            onClick={closeModal}
          >
            <Close/>
          </IconButton>

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
                    {...register('email', {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    })}
                  />
                  {errors.email && (
                    <p>
                      {errors.email.type === 'required' && 'This field is required'}
                      {errors.email.type === 'pattern' && 'Invalid email address'}
                    </p>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    autofocus
                    id='fee'
                    label='Fee (Optional)'
                    type='text'
                    {...register('fee', {
                      pattern: (/^[0-9]+$/),
                    })}
                  />
                  {errors.fee && (
                    <p>
                      {errors.fee.type === 'pattern' && 'Please only use numbers'}
                    </p>
                  )}
                </Grid>
                <Grid item xs={11}>
                  <InputLabel id='course-label'>Course</InputLabel>
                  <Select
                    labelId='course-label'
                    id='course'
                    label="Course"
                    {...register('course')}
                    value={'Fundamentals of JavaScript'}
                    fullWidth
                    defaultValue='Fundamentals of JavaScript'
                  >
                    <MenuItem value={'Fundamentals of JavaScript'}>Fundamentals of JavaScript</MenuItem>
                  </Select>
                </Grid>
                {batchRows.map((row) => (
                <Grid item xs={11} key={row.id}>
                  <InputLabel id={`batch-label-${row.id}`}>Batch</InputLabel>
                  <Select
                    labelId={`batch-label-${row.id}`}
                    id={`batch-${row.id}`}
                    label="Batch"
                    value={row.value}
                    {...register('batch')}
                    onChange={handleBatchChange(row.id)}
                    fullWidth
                  >
                    <MenuItem value="August">August</MenuItem>
                    <MenuItem value="September">September</MenuItem>
                    <MenuItem value="October">October</MenuItem>
                  </Select>
                  {batchRows.length > 1 && (
                    <IconButton
                      sx={{ color: 'black', position: 'absolute', right: '2rem', marginTop: '0.4rem' }}
                      onClick={removeBatchRow(row.id)}
                    >
                      <Close />
                    </IconButton>
                  )}
                </Grid>
              ))}
              {batchRows.length < 3 && (
                <Grid item xs={12}>
                  <Button variant='text' startIcon={<AddIcon/>} sx={{color: 'black'}} onClick={addBatchRow}>Add</Button>
                </Grid>
              )}
              </Grid>

            </DialogContent>

            <DialogContent sx={{'&::before': {content: '""', display: 'block', borderBottom: '1px solid #ebebeb', marginBottom: '1.5rem'}}}>
              <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button variant='text' startIcon={<ContentCopyIcon/>} sx={{color: 'black', textTransform: 'capitalize'}}>Copy Invited Link</Button>
                <Box>
                  <InvertedButton sx={{marginRight: '1rem', fontWeight: 'bold'}} onClick={resetForm}>取消</InvertedButton>
                  <CustomButton variant='contained' disableElevation sx={{fontWeight: 'bold'}} onClick={handleSubmit(onSubmit)}>送出</CustomButton>
                </Box>
              </Box>
            </DialogContent>

            {isSubmitted && (
              <Box sx={{ marginTop: '1rem', textAlign: 'center'}}>
                <span style={{color: 'green'}}>Form submitted successfully!</span><br/>
                <span style={{fontWeight: 'bold'}}>Email:</span> {formData.email}<br/>
                <span style={{fontWeight: 'bold'}}>Fee:</span> {formData.fee}<br/>
                <span style={{fontWeight: 'bold'}}>Course:</span> {formData.course}<br/>
                <span style={{fontWeight: 'bold'}}>Batch:</span> {batchRows.map((row, index) => (
                  <span key={row.id}>
                    {row.value}
                    {index !== batchRows.length - 1 && ', '}
                  </span>
                ))}
              </Box>
            )}

            {Object.keys(errors).length > 0 && (
              <Box sx={{ color: 'red', marginTop: '1rem', textAlign: 'center'}}>
                Your form has some error(s).
              </Box>
            )}

          </Box>
        </Dialog>
        
      </div>
    </ThemeProvider>
  );
}

export default App;
