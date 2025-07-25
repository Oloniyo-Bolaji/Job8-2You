'use client'

import React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { BsThreeDots } from 'react-icons/bs'

 const EmployerMenu = ({ application, changeStatus }) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        sx={{
          minWidth: 0,
          padding: 0,
          color: 'black',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
        onClick={handleClick}
      >
        <BsThreeDots />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem
          className="text-[12px]"
          onClick={() => {
            changeStatus('Accepted', application)
          }}
        >
          Accept
        </MenuItem>
        <MenuItem
          className="text-[12px]"
          onClick={() => {
            changeStatus('Rejected', application)
          }}
        >
          Reject
        </MenuItem>
      </Menu>
    </div>
  )
}


export default EmployerMenu