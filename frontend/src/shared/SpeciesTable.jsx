import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SpeciesTable({species}) {
    const navigate= useNavigate();
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Name
                    </TableCell>
                    <TableCell>
                        Size
                    </TableCell>
                    <TableCell>
                        Author
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {species.map((s) => (
                    <TableRow sx={{cursor:'pointer'}} onClick={() => navigate(`/species/${s._id}`)}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.size}</TableCell>
                        <TableCell>{s.author}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}