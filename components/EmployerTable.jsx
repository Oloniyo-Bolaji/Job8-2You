import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'
import Menu from './EmployerMenu'
import Link from 'next/link'

const EmployerTable = ({ applications, changeStatus }) => {
  const handleStatus = (status) => {
    if (status === 'Pending') {
      return 'black'
    } else if (status === 'Accepted') {
      return 'green'
    } else {
      return 'red'
    }
  }

    const linkToProfile = async (id) => {
    const res = await fetch(`/api/users/${id}/profileview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: job.user.id,
      }),
    })
    const result = await res.json()
  }

  return (
    <TableContainer sx={{ width: '100%' }}>
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
            backgroundColor: 'white', 
          },
          '& tr:nth-of-type(odd)': {
            backgroundColor: '#eef4ff', 
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '5%' }} align="center">S/N</TableCell>
            <TableCell sx={{ width: '20%' }} align="center">Applicant Name</TableCell>
            <TableCell sx={{ width: '25%' }} align="center">Job Title</TableCell>
            <TableCell sx={{ width: '15%' }} align="center">Resume</TableCell>
            <TableCell sx={{ width: '10%' }} align="center">Status</TableCell>
            <TableCell sx={{ width: '20%' }} align="center">Application Date</TableCell>
            <TableCell sx={{ width: '5%' }} align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications?.map((application, index) => (
            <TableRow key={index}>
              <TableCell sx={{ width: '5%' }} align="center">{index + 1}</TableCell>
              <TableCell sx={{ width: '20%' }} align="center">
                <Link
                  href={`/userprofile/${application?.user?.id}`}
                  onClick={() => {linkToProfile(application?.user?.id)}}
                  className="underline text-[blue]"
                >
                  {application?.user?.name}
                </Link>
              </TableCell>
              <TableCell sx={{ width: '25%', fontWeight: 'bold' }} align="center">
                {application?.job?.title}
              </TableCell>
              <TableCell sx={{ width: '15%' }} align="center">
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[blue]"
                >
                  View Resume
                </a>
              </TableCell>
              <TableCell sx={{ width: '10%', color: handleStatus(application.status) }} align="center">
                {application.status}
              </TableCell>
              <TableCell sx={{ width: '20%' }} align="center">
                {new Date(application.appliedAt).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ width: '5%' }} align="center">
                <Menu application={application} changeStatus={changeStatus} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default EmployerTable
