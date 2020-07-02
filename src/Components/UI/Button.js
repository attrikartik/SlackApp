import React from 'react'
import Button from '@material-ui/core/Button'

const NewButton = props => (
  <Button variant="contained" style={{backgroundColor: `${props.color}`, color: 'white'}} onClick={props.click} size={props.fontSize}>
    {props.title}
  </Button>
)

export default NewButton