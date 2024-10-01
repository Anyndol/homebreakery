import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function AdversaryTable({adversaries}) {
    const navigate= useNavigate();
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                        Menace
                    </TableCell>
                    <TableCell>
                        Rank
                    </TableCell>
                    <TableCell>
                        Author
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {adversaries.map((s) => (
                    <TableRow sx={{cursor:'pointer'}} onClick={() => navigate(`/adversaries/${s._id}`)}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.menace === 3 ? 'COLOSSAL' : s.menace === 2 ? 'MEGA BOSS' : s.menace === 1 ? 'BOSS' : 'MOOK'}</TableCell>
                        <TableCell>{s.rank}</TableCell>
                        <TableCell>{s.author}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}