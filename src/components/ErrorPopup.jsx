import { Snackbar, Alert } from "@mui/material";
import { useMachine } from "../context/MachineContext";

const ErrorPopup = () => {
    const { globalError, clearError } = useMachine();

    return (
        <Snackbar
            open={!!globalError}
            autoHideDuration={6000}
            onClose={clearError}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert
                severity="error"
                variant="filled"
                sx={{ width: "100%", fontSize: "1.1rem" }}
            >
                {globalError?.message || "Bilinmeyen bir hata oluştu!"}
            </Alert>
        </Snackbar>
    );
};

export default ErrorPopup;