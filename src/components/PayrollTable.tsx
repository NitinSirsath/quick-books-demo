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
  Chip,
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
];

const PayrollTable = () => {
  const [payrollData, setPayrollData] = useState(initialPayrollData);
  const [openModal, setOpenModal] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loadingState, setLoadingState] = useState(true);

  const handleProcessClick = (id: number) => {
    setProcessingId(id);
    setOpenModal(true);
    setLoadingState(true);
    setTimeout(() => {
      setPayrollData((prevData) =>
        prevData.map((row) =>
          row.id === id ? { ...row, status: "Processed" } : row
        )
      );
      setLoadingState(false);
      setProcessingId(null);
    }, 3000);
  };

  const handleInfoClick = () => {
    setShowInfo(true);
  };

  const closeInfo = () => {
    setShowInfo(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileName(event.target.files[0].name);
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload CSV from Kelio
          <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        {selectedFileName && <Chip label={selectedFileName} />}
      </div>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
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
            background: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            sx={{
              textAlign: "left",
              background: "#fff",
              p: 3,
              borderRadius: 2,
              maxWidth: 400,
              width: "100%",
            }}
          >
            <Typography sx={{ color: "black", mb: 2 }} variant="h6">
              Connecting to QAD:
              {loadingState ? (
                <CircularProgress size={20} sx={{ ml: 1 }} />
              ) : (
                " Success"
              )}
            </Typography>
            <Typography sx={{ color: "black", mb: 2 }} variant="h6">
              Writing Journal entry:
              {loadingState ? (
                <CircularProgress size={20} sx={{ ml: 1 }} />
              ) : (
                " Success"
              )}
            </Typography>
            <Typography sx={{ color: "black", mb: 2 }} variant="h6">
              Checking any errors:
              {loadingState ? (
                <CircularProgress size={20} sx={{ ml: 1 }} />
              ) : (
                " No errors found"
              )}
            </Typography>
            <Button
              sx={{ textTransform: "none", mt: 2, width: "100%" }}
              variant="outlined"
              onClick={() => setOpenModal(false)}
              disabled={loadingState}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Info Modal */}
      <Modal open={showInfo} onClose={closeInfo}>
        <Box
          sx={{
            p: 4,
            backgroundColor: "white",
            margin: "auto",
            mt: 10,
            width: "80%",
            borderRadius: 2,
          }}
        >
          <Typography sx={{ color: "black" }} variant="h4">
            Data from QAD
          </Typography>
          <JournalEntries />
        </Box>
      </Modal>
    </>
  );
};

export default PayrollTable;
