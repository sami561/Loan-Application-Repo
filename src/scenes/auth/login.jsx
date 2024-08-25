import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "state/authApi"; // Make sure this path is correct
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Define the validation schema using zod
const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .nonempty({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .nonempty({ message: "Password is required" }),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      await login(data).unwrap();
      toast.success("Logged in successfully");
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch (err) {
      toast.error(`Login failed: ${err.data?.message || "Unknown error"}`);
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="card-front">
      <form onSubmit={handleSubmit(onSubmit)} className="center-wrap">
        <div className="section text-center">
          <h4 className="mb-4 pb-3">Log In</h4>
          <div
            className="form-group"
            style={{ padding: "10px", paddingBottom: "10px" }}
          >
            <TextField
              type="email"
              {...register("email")}
              className="form-style"
              placeholder="Your Email"
              autoComplete="off"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>
          <div
            className="form-group"
            style={{ padding: "10px", paddingTop: "20px" }}
          >
            <TextField
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="form-style"
              placeholder="Your Password"
              autoComplete="off"
              fullWidth
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div
            className="form-group"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <button type="submit" className="btn mt-4" disabled={isLoading}>
              Submit
            </button>
          </div>
          <p className="mb-0 mt-4 text-center">
            <a href="#0" className="link">
              Forgot your password?
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
