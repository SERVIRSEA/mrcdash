import React from 'react'
import { Box, Typography } from '@mui/material'
import FFGSBulletinSummary from './FFGSBulletinSummary'
import FFGSSummaryTable from './FFGSSummaryTable'
import FFGSRiskList from './FFGSRiskList'

export default function FFGSContent() {
    return (
        <Box p={2} sx={{ overflow: 'auto', height: '65vh'}}>
            <Typography>
                FFGS Summary
            </Typography>
            <FFGSBulletinSummary />
            <FFGSSummaryTable />
            <FFGSRiskList />
        </Box>
    )
}
