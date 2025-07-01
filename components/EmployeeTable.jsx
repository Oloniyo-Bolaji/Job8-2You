import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Paper,
} from '@mui/material'
import PropTypes from 'prop-types'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import FirstPageIcon from '@mui/icons-material/FirstPage'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import LastPageIcon from '@mui/icons-material/LastPage'
import EmployeeMenu from './EmployeeMenu'

function TablePaginationActions(props) {
  const theme = useTheme()
  const { count, page, rowsPerPage, onPageChange } = props

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0)
  }

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1)
  }

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1)
  }

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  }

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
}

const EmployeeTable = ({ applications }) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleStatus = (status) => {
    if (status === 'Pending') {
      return 'yellow'
    } else if (status === 'Accepted') {
      return 'green'
    } else {
      return 'red'
    }
  }

  return (
    <TableContainer sx={{ width: '100%', marginTop: '5px' }}>
      <Table
        size="small"
        aria-label="a dense table"
        sx={{
          minWidth: 800,
          tableLayout: 'fixed',
          borderCollapse: 'collapse',
          '& th': {
            fontWeight: 'bold',
            backgroundColor: 'e9f2ff',
          },
          '& tr:nth-of-type(even)': {
            backgroundColor: '#cccccc', // Light gray
          },
          '& tr:nth-of-type(odd)': {
            backgroundColor: '#eef4ff', // Or any color you want
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '5%' }}>S/N</TableCell>
            <TableCell sx={{ width: '20%' }}>Job Title</TableCell>
            <TableCell sx={{ width: '25%' }}>Company</TableCell>
            <TableCell sx={{ width: '20%' }}>Status</TableCell>
            <TableCell sx={{ width: '25%' }}>Application Date</TableCell>
            <TableCell sx={{ width: '5%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications?.map((application, index) => (
            <TableRow key={index}>
              <TableCell sx={{ width: '5%' }}>{index + 1}</TableCell>
              <TableCell sx={{ width: '20%', fontWeight: 'bold' }}>
                {application?.job?.title}
              </TableCell>
              <TableCell sx={{ width: '25%' }}>{application?.job?.company}</TableCell>
              <TableCell sx={{ width: '20%', color: handleStatus(application.status) }}>{application.status}</TableCell>
              <TableCell sx={{ width: '25%' }}>
                {new Date(application.appliedAt).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ width: '5%' }}>
                <EmployeeMenu />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EmployeeTable
