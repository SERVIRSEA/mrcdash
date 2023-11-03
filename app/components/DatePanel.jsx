import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePanel() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker sx={{ marginTop: '10px' }} />
    </LocalizationProvider>
  );
}