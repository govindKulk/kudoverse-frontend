import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Application } from '../../types/type';
import { formatDistanceToNow } from 'date-fns';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineEdit } from 'react-icons/md';
import Apply from '../../routes/Apply';



export default function ApplicationTable({
    applications
}: {
    applications: Array<Application>
}) {

    const [showModal, setShowModal] = React.useState(false);
    const [coverLetter, setCoverLetter] = React.useState<string>();
    const navigate = useNavigate();

    return (
        <div><TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, maxWidth: 900, margin: '0 auto' }} aria-label="simple table">
            <TableHead>
                <TableRow
                    sx={{ '&:last-child th': { border: 0 } }}
                >
                    <TableCell
                        className='!font-bold !text-lg'
                    >Role/Job</TableCell>
                    <TableCell
                        className='!font-bold !text-lg'
                    >Comapany </TableCell>
                    <TableCell
                        className='!font-bold !text-lg'
                    >Location </TableCell>
                    <TableCell
                        className='!font-bold !text-lg'
                    > Date </TableCell>
                    <TableCell
                        className='!font-bold !text-lg'
                    >Cover Letter</TableCell>
                    <TableCell
                        className='!font-bold !text-lg'
                    >Status</TableCell>


                </TableRow>
            </TableHead>
            <TableBody>
                {applications.map((row, i) => (
                    <TableRow
                        key={i}
                        sx={{
                            '&:last-child td, &:last-child th': { border: 0 },


                        }}

                    >
                        <TableCell component="th" scope="row">
                            {row.jobListing.title}
                        </TableCell>
                        <TableCell >{row.jobListing.company}</TableCell>
                        <TableCell >{row.jobListing.location}</TableCell>
                        <TableCell >{
                            formatDistanceToNow(new Date(row.createdAt))
                        }</TableCell>
                        <TableCell > {row.coverLetter} </TableCell>
                        <TableCell

                        >
                            <span
                                className={`${row.status === 'PENDING' ? 'bg-yellow-500' : row.status === 'REJECTED' ? 'bg-red-500' : 'bg-green-500'
                                    } p-1 rounded-lg text-white font-bold`}
                            >
                                {row.status}
                            </span>

                        </TableCell>

                        <TableCell><Link className="text-blue-500 font-bold text-sm text-nowrap" to={`/job/${row.jobListing.id}`}>View Job</Link></TableCell>

                        <TableCell>
                            <Link to={`/applications/${row.jobListing.id}`} className="cursor-pointer" onClick={
                                () => {
                                    setCoverLetter(row.coverLetter);
                                    setShowModal(true);
                                }
                            }><MdOutlineEdit size={20}/></Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    
    <Apply isOpen={showModal} coverLetter={coverLetter} onClose={() => {
        
        setShowModal(false)
        navigate('.', { replace: true });
        }} isEdit={true}/>
    </div>
    
    );
}
