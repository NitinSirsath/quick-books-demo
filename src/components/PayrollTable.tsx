import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Modal,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import JournalEntries from "./JournalEntries";

const initialPayrollData = [
  {
    id: 1,
    empName: "John Doe",
    dept: "Finance",
    contractPerWeek: 40,
    workedHrs: 35,
    ratePerHr: 20,
    totalAmount: 700,
    taxes: 100,
    status: "Waiting to process",
  },
  {
    id: 2,
    empName: "Jane Smith",
    dept: "Engineering",
    contractPerWeek: 40,
    workedHrs: 40,
    ratePerHr: 30,
    totalAmount: 1200,
    taxes: 150,
    status: "Waiting to process",
  },
  {
    id: 3,
    empName: "Bob Johnson",
    dept: "Marketing",
    contractPerWeek: 40,
    workedHrs: 38,
    ratePerHr: 25,
    totalAmount: 950,
    taxes: 120,
    status: "Waiting to process",
  },
  // Add more rows as needed
];

const PayrollTable = () => {
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [openModal, setOpenModal] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleProcessClick = (id: number) => {
    setProcessingId(id);
    setOpenModal(true);
    setTimeout(() => {
      setPayrollData((prevData) =>
        prevData.map((row) =>
          row.id === id ? { ...row, status: "Processed" } : row
        )
      );
      setOpenModal(false);
      setProcessingId(null);
    }, 3000); // Simulate progress
  };

  const handleInfoClick = () => {
    setShowInfo(true);
  };

  const closeInfo = () => {
    setShowInfo(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Emp Name</TableCell>
              <TableCell>Dept</TableCell>
              <TableCell>Contract per Week</TableCell>
              <TableCell>Worked Hrs</TableCell>
              <TableCell>Rate per Hr</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Taxes</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.empName}</TableCell>
                <TableCell>{row.dept}</TableCell>
                <TableCell>{row.contractPerWeek}</TableCell>
                <TableCell>{row.workedHrs}</TableCell>
                <TableCell>{row.ratePerHr}</TableCell>
                <TableCell>{row.totalAmount}</TableCell>
                <TableCell>{row.taxes}</TableCell>
                <TableCell>
                  {row.status === "Waiting to process" ? (
                    <Button
                      sx={{ textTransform: "none" }}
                      variant="contained"
                      color="primary"
                      onClick={() => handleProcessClick(row.id)}
                      disabled={processingId !== null}
                    >
                      {row.status}
                    </Button>
                  ) : (
                    <div>
                      <Button
                        sx={{ textTransform: "none" }}
                        variant="contained"
                        color="success"
                        onClick={handleInfoClick}
                      >
                        {row.status}
                      </Button>
                      <IconButton onClick={handleInfoClick}>
                        <InfoIcon />
                      </IconButton>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Progress */}
      <Modal open={openModal}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            background: "#171A1C",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Journal entry created : Status - success
            </Typography>
            <Button
              sx={{ textTransform: "none", mt: 2 }}
              variant="contained"
              onClick={() => setOpenModal(false)}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Info Modal */}
      <Modal open={showInfo} onClose={closeInfo}>
        <Box
          sx={{
            // p: 4,
            backgroundColor: "white",
            margin: "auto",
            mt: 10,
            width: "80%",
            borderRadius: 8,
          }}
        >
          <JournalEntries />
        </Box>
      </Modal>
    </>
  );
};

export default PayrollTable;
