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
import { showToast } from "../../lib/utils"; // Optional: use your toast logic
import SectionAnim from "../../assets/lottie/SectionAnim";

const Architect = () => {
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
    address1: "",
    address2: "",
    landmark: "",
    city: "",
    state: "",
    region: "",
    pincode: "",
    spocName: "",
    spocContact: "",
    spocManagerName: "",
    spocManagerContact: "",
    regionalManagerContact: "",
  });

  const mockUserData: Record<string, typeof formData> = {
    "1111111111": {
      firstName: "Ravi",
      lastName: "Verma",
      firmName: "Design Hub",
      gender: "M",
      contactNumber: "9876543210",
      email: "ravi@designhub.com",
      address1: "123 Street",
      address2: "Near Park",
      landmark: "Big Tower",
      city: "Mumbai",
      state: "Maharashtra",
      region: "West",
      pincode: "400001",
      spocName: "Arun",
      spocContact: "9000000000",
      spocManagerName: "Kiran",
      spocManagerContact: "9111111111",
      regionalManagerContact: "9222222222",
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
      showToast("error", "No architect found for this mobile number");
      setShowForm(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = () => {
    console.log("Updated architect data:", formData);
    showToast("success", "Data updated successfully!");
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Typography sx={{ mb: 3, fontWeight:"bold", display:"flex", gap:1}} variant="h4" gutterBottom>
          <SectionAnim type="architect" shouldPlay={true} loop={true} /> Architect
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
          sx={{
            background: "lightgray",
            px: 2,
            py: 1,
            mb: 2,
            fontWeight: "bold",
          }}
          variant="h6"
          gutterBottom
        >
          Overview User Data
        </Typography>

        {showForm && (
          <Grid container spacing={2}>
            {/* Basic Details */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Firm Name"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.firmName}
                onChange={(e) => handleChange("firmName", e.target.value)}
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
                onChange={(e) => handleChange("gender", e.target.value)}
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
                onChange={(e) => handleChange("contactNumber", e.target.value)}
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
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Grid>

            {/* Address Section */}
            <Grid item xs={12}>
              <TextField
                label="Address - Line 1"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.address1}
                onChange={(e) => handleChange("address1", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address - Line 2"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.address2}
                onChange={(e) => handleChange("address2", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Landmark"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.landmark}
                onChange={(e) => handleChange("landmark", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.state}
                onChange={(e) => handleChange("state", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Region"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.region}
                onChange={(e) => handleChange("region", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Pincode"
                type="number"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.pincode}
                onChange={(e) => handleChange("pincode", e.target.value)}
              />
            </Grid>

            {/* SPOC Section */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="SPOC Name"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.spocName}
                onChange={(e) => handleChange("spocName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="SPOC Contact No."
                fullWidth
                variant="outlined"
                size="small"
                value={formData.spocContact}
                onChange={(e) => handleChange("spocContact", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="SPOC Manager's Name"
                fullWidth
                variant="outlined"
                size="small"
                value={formData.spocManagerName}
                onChange={(e) =>
                  handleChange("spocManagerName", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="SPOC Manager's Contact No."
                fullWidth
                variant="outlined"
                size="small"
                value={formData.spocManagerContact}
                onChange={(e) =>
                  handleChange("spocManagerContact", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Regional Manager Contact No."
                fullWidth
                variant="outlined"
                size="small"
                value={formData.regionalManagerContact}
                onChange={(e) =>
                  handleChange("regionalManagerContact", e.target.value)
                }
              />
            </Grid>

            {/* Update Button */}
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
        )}
      </Box>
    </Container>
  );
};

export default Architect;
