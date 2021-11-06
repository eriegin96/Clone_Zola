import React, { useContext, useRef, useState } from "react";
import {
  Button,
  InputAdornment,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase/config";
import { AppContext } from "context/AppProvider";
import { addUser } from "firebase/services";

export default function RegisterDialog({ open, setOpen }) {
  const { isVN } = useContext(AppContext);
  const [isValidated, setIsValidated] = useState(true);
  const [emailInUse, setEmailInUse] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [registerSuccessful, setRegisterSuccessful] = useState(false);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  const validationSchema = yup.object().shape({
    passwordConfirmation: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        isVN ? "Mật khẩu chưa trùng khớp" : "Passwords must match"
      ),
    password: yup
      .string()
      .required(isVN ? "Vui lòng nhập mật khẩu" : "Password is required")
      .min(
        6,
        isVN
          ? "Mật khẩu tối thiểu 6 ký tự"
          : "Password must be at least 6 characters"
      ),
    email: yup
      .string()
      .email(isVN ? "Email không đúng" : "Email is not valid")
      .required(isVN ? "Vui lòng nhập email" : "Email is required"),
  });

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowPasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleRegister = () => {
    validationSchema
      .isValid({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        passwordConfirmation: passwordConfirmRef.current.value,
      })
      .then((valid) => {
        if (valid) {
          setIsValidated(true);
          createUserWithEmailAndPassword(
            auth,
            emailRef.current.value,
            passwordRef.current.value
          )
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              addUser(user.uid, {
                displayName:
                  user.email.charAt(0).toUpperCase() + user.email.slice(1, 3),
                email: user.email,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.providerId,
                gender: user?.gender || null,
                date: user?.date || null,
              });
              setRegisterSuccessful(true);
            })
            .catch((error) => {
              switch (error.code) {
                case "auth/email-already-in-use":
                  setEmailInUse(true);
                  break;
                case "auth/invalid-email":
                  setInvalidEmail(true);
                  break;
                default:
                  break;
              }
              console.log(error.code);
            });
          return;
        }

        setIsValidated(false);
        validationSchema
          .validate({
            email: emailRef.current.value,
            password: passwordRef.current.value,
            passwordConfirmation: passwordConfirmRef.current.value,
          })
          .catch((err) => {
            setError(err);
            console.log({ err });
          });
      });
  };

  return (
    <>
      <Dialog
        onClose={handleCloseDialog}
        open={open}
        className="register__dialog"
        PaperProps={{
          sx: {
            width: "376px",
            maxHeight: "calc(100% - 20px)",
          },
        }}
      >
        <DialogTitle
          className="register__dialog-title"
          onClose={handleCloseDialog}
          sx={{
            height: "50px",
            padding: "6px 8px 6px 16px",
            fontSize: "17px",
            fontWeight: 600,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {(emailInUse || invalidEmail) &&
            (isVN ? "Đăng ký lỗi" : "Register failed")}
          {!emailInUse && !invalidEmail && (isVN ? "Đăng ký" : "Register")}
          <IconButton aria-label="close" onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          {emailInUse && (
            <>
              {isVN
                ? "Email đã được đăng ký. Vui lòng dùng email khác"
                : "Email is already used. Please register another email"}
            </>
          )}
          {invalidEmail && (
            <>
              {isVN
                ? "Email không có thực. Vui lòng dùng email khác"
                : "Email is invalid. Please register another email"}
            </>
          )}
          {!emailInUse && !invalidEmail && (
            <div className="register__form__group">
              <TextField
                inputRef={emailRef}
                variant="standard"
                label="Email *"
                error={!isValidated || invalidEmail}
                helperText={error.path === "email" && error.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
                className="register__input"
              ></TextField>
              <TextField
                inputRef={passwordRef}
                variant="standard"
                type={showPassword ? "text" : "password"}
                label={isVN ? "Mật khẩu *" : "Password *"}
                error={!isValidated}
                helperText={error.path === "password" && error.message}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="register__input"
              ></TextField>
              <TextField
                inputRef={passwordConfirmRef}
                variant="standard"
                type={showPasswordConfirm ? "text" : "password"}
                label={isVN ? "Xác nhận mật khẩu *" : "Confirm password *"}
                error={!isValidated}
                helperText={
                  error.path === "passwordConfirmation" && error.message
                }
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPasswordConfirm}
                        edge="end"
                      >
                        {showPasswordConfirm ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                className="register__input"
              ></TextField>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {(emailInUse || invalidEmail) && (
            <>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={() => {
                  setEmailInUse(false);
                  setInvalidEmail(false);
                }}
                sx={{ fontWeight: 600 }}
              >
                OK
              </Button>
            </>
          )}
          {!emailInUse && !invalidEmail && (
            <>
              <Button
                color="default"
                variant="contained"
                disableElevation
                onClick={handleCloseDialog}
                sx={{ fontWeight: 600 }}
              >
                Hủy
              </Button>
              <Button
                color="primary"
                variant="contained"
                disableElevation
                onClick={handleRegister}
                sx={{ fontWeight: 600 }}
              >
                Đăng ký
              </Button>
            </>
          )}
        </DialogActions>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={registerSuccessful}
          autoHideDuration={3000}
          onClose={() => setRegisterSuccessful(false)}
        >
          <Alert
            onClose={() => setRegisterSuccessful(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            {isVN ? "Đăng ký tài khoản thành công" : "Register successfully"}
          </Alert>
        </Snackbar>
      </Dialog>
    </>
  );
}
