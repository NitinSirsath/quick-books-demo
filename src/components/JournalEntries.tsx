import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const journalData = [
  {
    date: "2024-08-19",
    num: "12345",
    name: "John Doe",
    accountNum: "001",
    accountName: "Sales",
    debit: 1000,
    credit: 1000,
  },
  // More rows here
];

const JournalEntries = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Num</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Account Num</TableCell>
            <TableCell>Account Name</TableCell>
            <TableCell>Debit</TableCell>
            <TableCell>Credit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {journalData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.num}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.accountNum}</TableCell>
              <TableCell>{row.accountName}</TableCell>
              <TableCell>{row.debit}</TableCell>
              <TableCell>{row.credit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default JournalEntries;
