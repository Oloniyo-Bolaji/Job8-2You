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
      return 'yellow'
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
            <TableCell sx={{ width: '20%' }}>Applicant Name</TableCell>
            <TableCell sx={{ width: '25%' }}>Job Title</TableCell>
            <TableCell sx={{ width: '15%' }}>Resume</TableCell>
            <TableCell sx={{ width: '10%' }}>Status</TableCell>
            <TableCell sx={{ width: '20%' }}>Application Date</TableCell>
            <TableCell sx={{ width: '5%' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications?.map((application, index) => (
            <TableRow key={index}>
              <TableCell sx={{ width: '5%' }}>{index + 1}</TableCell>
              <TableCell sx={{ width: '20%' }}>
                <Link
                  href={`/userprofile/${application?.user?.id}`}
                  onClick={() => {linkToProfile(application?.user?.id)}}
                  className="underline text-[blue]"
                >
                  {application?.user?.name}
                </Link>
              </TableCell>
              <TableCell sx={{ width: '25%', fontWeight: 'bold' }}>
                {application?.job?.title}
              </TableCell>
              <TableCell sx={{ width: '15%' }}>
                <a
                  href={application.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[blue]"
                >
                  View Resume
                </a>
              </TableCell>
              <TableCell sx={{ width: '10%', color: handleStatus(application.status) }}>
                {application.status}
              </TableCell>
              <TableCell sx={{ width: '20%' }}>
                {new Date(application.appliedAt).toLocaleDateString()}
              </TableCell>
              <TableCell sx={{ width: '5%' }}>
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
