import React from "react"
import TextField from '@material-ui/core/TextField'

const Input = (props) => (
  <TextField
    id="text"
    style={{ margin: 8 }}
    placeholder={props.placeholder || "Type your message..."}
    fullWidth
    margin="normal"
    InputLabelProps={{
      shrink: true,
    }}
    value={props.value}
    variant="outlined"
    onChange={props.change}
  />
);

export default Input