import React from 'react'

import { ListItem } from '@material-ui/core'

const ListItemLink = (props) => {
  return (
    <ListItem button component="a" {...props} />
  )
}

export default ListItemLink