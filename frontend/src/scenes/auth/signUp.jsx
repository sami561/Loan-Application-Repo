import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@mui/material";
import httpClient from "utils/apiMethods";
import { toast } from "react-toastify";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const signUpSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await httpClient.post("api/v1/auth/registerAdmin", {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        password: data.password,
      });
      toast.success("User registered successfully");
      console.log(response);
    } catch (error) {
      console.log(error.response?.data?.businessErrorDescription);
      toast.error(error.response?.data?.businessErrorDescription);
    }
  };

  return (
    <div className="card-back">
      <div className="center-wrap">
        <div className="section text-center">
          <h4 className="mb-4 pb-3" style={{ textAlign: "center" }}>
            Sign Up
          </h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group" style={{ padding: "10px" }}>
              <TextField
                type="text"
                {...register("firstName")}
                className="form-style"
                placeholder="Your first Name"
                autoComplete="off"
              />
              {errors.firstName && <span>{errors.firstName.message}</span>}
              <i className="input-icon uil uil-user"></i>
            </div>
            <div className="form-group" style={{ padding: "10px" }}>
              <TextField
                type="text"
                {...register("lastName")}
                className="form-style"
                placeholder="Your last Name"
                autoComplete="off"
              />
              {errors.lastName && <span>{errors.lastName.message}</span>}
              <i className="input-icon uil uil-user"></i>
            </div>
            <div className="form-group" style={{ padding: "10px" }}>
              <TextField
                type="email"
                {...register("email")}
                className="form-style"
                placeholder="Your Email"
                autoComplete="off"
              />
              {errors.email && <span>{errors.email.message}</span>}
              <i className="input-icon uil uil-at"></i>
            </div>
            <div className="form-group" style={{ padding: "10px" }}>
              <TextField
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="form-style"
                placeholder="Your Password"
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.password && <span>{errors.password.message}</span>}
              <i className="input-icon uil uil-lock-alt"></i>
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <button type="submit" variant="contained" className="btn mt-4">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
