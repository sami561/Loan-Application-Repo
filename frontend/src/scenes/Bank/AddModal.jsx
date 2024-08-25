import React, { useEffect } from "react";
import { CloseOutlined } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Modal,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"; // Use axios directly
import { toast } from "react-toastify";
import { useGetGovernorateQuery } from "state/apiSpring";
import store from "state/store";

// Define the validation schema using zod
const formSchema = z.object({
  nom: z.string().nonempty({ message: "Name is required" }),
  contactEmail: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),
  contactPhone: z.string().nonempty({ message: "Phone is required" }),
  governorateId: z
    .number()
    .nonnegative()
    .int({ message: "Governorate is required" }),
  image: z
    .any()
    .refine((files) => files.length === 1, { message: "File is required" }),
});

const AddModal = ({ open, handleClose }) => {
  const { data, isLoading, refetch } = useGetGovernorateQuery();
  console.log(data);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (formData) => {
    console.log("🚀 ~ onSubmit ~ formData:", formData.governorateId);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append(
        "bank",
        new Blob(
          [
            JSON.stringify({
              nom: formData.nom,
              contactEmail: formData.contactEmail,
              contactPhone: formData.contactPhone,
            }),
          ],
          { type: "application/json" }
        )
      );
      formDataToSend.append("file", formData.image[0]);

      const token = store.getState().auth.token;

      const response = await axios.post(
        `http://localhost:8088/api/v1/bank/add?gauvernoratId=${formData.governorateId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Bank added successfully!");
        handleClose();
        reset();
      }
    } catch (error) {
      toast.error("Failed to add bank: " + error.message);
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setValue("governorateId", data[0].id);
    }
  }, [data, setValue]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
          outline: "none",
        }}
      >
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseOutlined />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Bank
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            {...register("nom")}
            error={!!errors.nom}
            helperText={errors.nom?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Email"
            {...register("contactEmail")}
            error={!!errors.contactEmail}
            helperText={errors.contactEmail?.message}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact Phone"
            {...register("contactPhone")}
            error={!!errors.contactPhone}
            helperText={errors.contactPhone?.message}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal" error={!!errors.governorateId}>
            <InputLabel>Governorate</InputLabel>
            <Controller
              name="governorateId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Governorate"
                  defaultValue={data?.[0]?.id || ""}
                  onChange={(e) =>
                    setValue("governorateId", parseInt(e.target.value, 10))
                  }
                >
                  {data?.map((governorate) => (
                    <MenuItem key={governorate.id} value={governorate.id}>
                      {governorate.nom}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.governorateId && (
              <Typography color="error">
                {errors.governorateId.message}
              </Typography>
            )}
          </FormControl>
          <input
            type="file"
            {...register("image")}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload File
            </Button>
          </label>
          {errors.image && (
            <Typography color="error">{errors.image.message}</Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddModal;
