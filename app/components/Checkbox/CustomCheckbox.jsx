import React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
    '&.Mui-checked': {
        color: theme.palette.primary.main,
    },
}));

const CustomCheckbox = ({ label, id, ...props }) => (
    <label htmlFor={id} style={{ cursor: 'pointer' }}>
        <StyledCheckbox id={id} {...props} />
        {label}
    </label>
);

export default CustomCheckbox;
