import React from 'react'
import Typography from '@material-ui/core/Typography'


const SingleMessage = props => (
    <div>
        <Typography color='primary' style={{marginLeft: '3px', display: 'flex', flexWrap: 'wrap'}}>
         {props.message}
        </Typography>
    </div>
)

export default SingleMessage