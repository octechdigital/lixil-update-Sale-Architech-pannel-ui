import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Container,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import { showToast } from "../../lib/utils";
import SectionAnim from "../../assets/lottie/SectionAnim";

const Sales = () => {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    firmName: "",
    gender: "",
    contactNumber: "",
    email: "",
  });

  const mockUserData: Record<string, typeof formData> = {
    "0000000000": {
      firstName: "John",
      lastName: "Doe",
      firmName: "JD Enterprises",
      gender: "M",
      contactNumber: "9876543210",
      email: "john.doe@example.com",
    },
  };

  const handleSearch = () => {
    if (!mobile) {
      setMobileError("Mobile number is required");
      setShowForm(false);
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Enter a valid 10-digit mobile number");
      setShowForm(false);
      return;
    }
    

    setMobileError("");

    const data = mockUserData[mobile];
    if (data) {
      setFormData(data);
      setShowForm(true);
    } else {
      showToast("error", "No data found for this mobile number");
      setShowForm(false);
      setFormData({
        firstName: "",
        lastName: "",
        firmName: "",
        gender: "",
        contactNumber: "",
        email: "",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    console.log("Updated data:", formData);
    showToast("success", "Data updated successfully!");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography sx={{ mb: 3, fontWeight:"bold", display:"flex", gap:1}} variant="h4" gutterBottom>
          <SectionAnim type="sales" shouldPlay={true} /> Sales 
        </Typography>

        {/* Mobile Search */}
        <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
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

        <Typography
          sx={{ background: "lightgray", px: 2, py: 1, mb: 2, fontWeight:"bold" }}
          variant="h6"
          gutterBottom
        >
          Overview User Data
        </Typography>

        {showForm && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleChange("firstName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleChange("lastName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Firm Name"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.firmName}
                  onChange={(e) =>
                    handleChange("firmName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Gender"
                  select
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.gender}
                  onChange={(e) =>
                    handleChange("gender", e.target.value)
                  }
                >
                  <MenuItem value="M">Male</MenuItem>
                  <MenuItem value="F">Female</MenuItem>
                  <MenuItem value="O">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contact Number"
                  type="tel"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    handleChange("contactNumber", e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email ID"
                  type="email"
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange("email", e.target.value)
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <Box textAlign="center" mt={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    size="large"
                  >
                    Update
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Sales;
