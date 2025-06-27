import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Container,
  Box,
  Button,
  Paper,
} from "@mui/material";
import { showToast } from "../../lib/utils";
import SectionAnim from "../../assets/lottie/SectionAnim";
import API from "../../api";

const Sales = () => {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
  });

  const handleSearch = async () => {
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number");
      setShowForm(false);
      return;
    }

    setMobileError("");

    try {
      const res = await API.searchSales(mobile);
      const salesUser = res?.data?.data?.[0] || res?.data;

      if (salesUser && typeof salesUser === "object" && Object.keys(salesUser).length > 0) {
        setFormData({
          name: salesUser.name ? String(salesUser.name) : "",
          contactNumber: salesUser.contactNumber ? String(salesUser.contactNumber) : String(mobile),
        });
        setShowForm(true);
      } else {
        showToast("error", "User not found for this mobile number.");
        setFormData({ name: "", contactNumber: "" });
        setShowForm(false);
      }
    } catch {
      showToast("error", "Something went wrong while searching");
      setFormData({ name: "", contactNumber: "" });
      setShowForm(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography
          sx={{ mb: 3, fontWeight: "bold", display: "flex", gap: 1 }}
          variant="h4"
        >
          <SectionAnim type="sales" shouldPlay={true} /> Sales
        </Typography>

<Paper elevation={2} sx={{ p: 5, mb: 3 }}>
  <Typography variant="h5" sx={{mb:2, fontWeight:"bold"}} gutterBottom>
              Search Sales
            </Typography>
        {/* Search Field */}
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Mobile Number"
              variant="outlined"
              size="small"
              fullWidth
              value={mobile}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setMobile(val);
              }}
              error={Boolean(mobileError)}
              helperText={mobileError}
              inputProps={{ maxLength: 10 }}
              type="tel"
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </Grid>
        </Grid>
</Paper>

<Paper elevation={2} sx={{ p: 1, mb: 1, background:"lightgray" }}>
  <Typography variant="h5" sx={{mb:0, fontWeight:"bold"}} gutterBottom>Overview Sales Details</Typography>
</Paper>
{!showForm && (
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography color="error" fontWeight="bold">
              User not found for this mobile number.
            </Typography>
          </Paper>
        )}

        {/* Form Display */}
        {showForm && (
          <Paper elevation={2} sx={{ p: 3, mt:3 }}>
             <Typography variant="h5" sx={{mb:2, fontWeight:"bold"}} gutterBottom>Sales Details</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mobile Number"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.contactNumber}
                disabled
              />
            </Grid>
          </Grid>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Sales;
