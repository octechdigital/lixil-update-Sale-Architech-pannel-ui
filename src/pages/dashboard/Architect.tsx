/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from "react";
import {
  Grid,
  TextField,
  Typography,
  Container,
  MenuItem,
  Box,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { showToast } from "../../lib/utils";
import SectionAnim from "../../assets/lottie/SectionAnim";
import API from "../../api";

type ArchitectFormData = {
  architectId: string;
  firstName: string;
  lastName: string;
  firmName: string;
  gender: string;
  contactNumber: string;
  email: string;
  address1: string;
  address2: string;
  landmark: string;
  city: string;
  state: string;
  region: string;
  pincode: string;
  spocName: string;
  spocMobile: string;
  spocManagerName: string;
  spocManagerMobile: string;
  regionalManagerMobile: string;
};

type FormErrors = Partial<Record<keyof ArchitectFormData, string>>;

const defaultFormData: ArchitectFormData = {
  architectId: "",
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
  spocMobile: "",
  spocManagerName: "",
  spocManagerMobile: "",
  regionalManagerMobile: "",
};

const GENDER_OPTIONS = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
  { value: "O", label: "Other" },
];

const FORM_FIELDS = [
  { label: "First Name", key: "firstName", required: true },
  { label: "Last Name", key: "lastName", required: true },
  { label: "Firm Name", key: "firmName", fullWidth: true, required: true },
  { label: "Gender", key: "gender", select: true, options: GENDER_OPTIONS, required: true },
  { label: "Contact Number", key: "contactNumber", type: "tel", required: true },
  { label: "Email ID", key: "email", type: "email", fullWidth: true, required: true },
  { label: "Address - Line 1", key: "address1", fullWidth: true, required: true },
  { label: "Address - Line 2", key: "address2", fullWidth: true },
  { label: "Landmark", key: "landmark", fullWidth: true },
  { label: "City", key: "city", required: true },
  { label: "State", key: "state", required: true },
  { label: "Region", key: "region" },
  { label: "Pincode", key: "pincode", type: "number", required: true },
  { label: "SPOC Name", key: "spocName" },
  { label: "SPOC Contact No.", key: "spocMobile", type: "tel" },
  { label: "SPOC Manager's Name", key: "spocManagerName" },
  { label: "SPOC Manager's Contact No.", key: "spocManagerMobile", type: "tel" },
  { label: "Regional Manager Contact No.", key: "regionalManagerMobile", type: "tel", fullWidth: true },
];

const Architect = () => {
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [formData, setFormData] = useState<ArchitectFormData>(defaultFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSearching, setIsSearching] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dataFound, setDataFound] = useState<boolean | null>(null); // null = untouched, true = found, false = not found
  

  const safeString = (value: unknown): string =>
    value !== undefined && value !== null ? String(value) : "";

  const handleSearch = async () => {
    if (!/^\d{10}$/.test(mobile)){
      setMobileError("Enter a valid 10-digit mobile number");
      return;
    }

    setIsSearching(true);
    try {
      const res = await API.searchArchitect(mobile);
      const architect = res?.data?.data?.[0] || res?.data?.data || res?.data;

      if (architect && typeof architect === "object" && Object.keys(architect).length > 0) {
        setFormData({
          architectId: safeString(architect.architectId),
          firstName: safeString(architect.firstName),
          lastName: safeString(architect.lastName),
          firmName: safeString(architect.firmName),
          gender: safeString(architect.gender),
          contactNumber: safeString(architect.contactNumber),
          email: safeString(architect.email),
          address1: safeString(architect.address1),
          address2: safeString(architect.address2),
          landmark: safeString(architect.landmark),
          city: safeString(architect.city),
          state: safeString(architect.state),
          region: safeString(architect.region),
          pincode: safeString(architect.pincode),
          spocName: safeString(architect.spocName),
          spocMobile: safeString(architect.spocMobile),
          spocManagerName: safeString(architect.spocManagerName),
          spocManagerMobile: safeString(architect.spocManagerMobile),
          regionalManagerMobile: safeString(architect.regionalManagerMobile),
        });
        setDataFound(true);
        setMobileError("");
      } else {
        showToast("error", "User not found for this mobile number.");
        setDataFound(false);
        
      }
    } catch {
      showToast("error", "Something went wrong while searching architect");
      setDataFound(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleChange = useCallback(
    (key: keyof ArchitectFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
      if (formErrors[key]) {
        setFormErrors((prev) => ({ ...prev, [key]: "" }));
      }
    },
    [formErrors]
  );

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);
      await API.updateArchitect({
        architectId: formData.architectId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        firmName: formData.firmName,
        gender: formData.gender,
        mobile: formData.contactNumber,
        email: formData.email,
        address1: formData.address1,
        address2: formData.address2,
        landmark: formData.landmark,
        city: formData.city,
        state: formData.state,
        region: formData.region,
        pincode: formData.pincode,
        spocName: formData.spocName,
        spocMobile: formData.spocMobile,
        spocManagerName: formData.spocManagerName,
        spocManagerMobile: formData.spocManagerMobile,
        regionalManagerMobile: formData.regionalManagerMobile,
      });
      showToast("success", "Architect data updated successfully!");
    } catch {
      showToast("error", "Failed to update architect data. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", display: "flex", alignItems: "center", gap: 1 }}>
          <SectionAnim type="architect" shouldPlay={true} /> Architect Management
        </Typography>

        <Paper elevation={2} sx={{ p: 5, mb: 3 }}>
          <Typography variant="h5" sx={{mb:2, fontWeight:"bold"}} gutterBottom>
            Search Architect
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Mobile Number"
                fullWidth
                value={mobile}
                onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setMobile(val);
              }}
                error={Boolean(mobileError)}
                helperText={mobileError}
                size="small"
                inputProps={{ maxLength: 10 }}
                type="tel"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={handleSearch}
                disabled={isSearching || mobile.length !== 10}
                startIcon={isSearching ? <CircularProgress size={20} /> : null}
                sx={{ height: 40 }}
              >
                {isSearching ? "Searching..." : "Search"}
              </Button>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={2} sx={{ p: 1, mb: 1, background:"lightgray" }}>
          <Typography variant="h5" sx={{mb:0, fontWeight:"bold"}} gutterBottom>Overview Architect Details</Typography>
        </Paper>

        {!dataFound && (
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography color="error" fontWeight="bold">
              User not found for this mobile number.
            </Typography>
          </Paper>
        )}

        {dataFound === true && (
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h5" sx={{mb:2, fontWeight:"bold"}}gutterBottom>Architect Details</Typography>
            <Grid container spacing={2}>
              {FORM_FIELDS.map(({ label, key, type = "text", select = false, options = [], fullWidth = false }) => (
                <Grid item xs={12} sm={fullWidth ? 12 : 6} key={key}>
                  {select ? (
                    <TextField
                      select
                      fullWidth
                      size="small"
                      label={label}
                      value={formData[key as keyof ArchitectFormData]}
                      onChange={(e) => handleChange(key as keyof ArchitectFormData, e.target.value)}
                    >
                      <MenuItem value=""><em>Select {label}</em></MenuItem>
                      {options.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      fullWidth
                      size="small"
                      label={label}
                      type={type}
                      value={formData[key as keyof ArchitectFormData]}
                      onChange={(e) => handleChange(key as keyof ArchitectFormData, e.target.value)}
                    />
                  )}
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    startIcon={isUpdating ? <CircularProgress size={20} /> : null}
                  >
                    {isUpdating ? "Updating..." : "Update Architect"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Architect;
