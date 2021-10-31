import React, { useContext, useRef, useState } from 'react';
import {
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	fetchSignInMethodsForEmail,
} from 'firebase/auth';
import { useForm, useController, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, InputAdornment, Link, Stack, TextField } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { addUser, createUsersData } from 'firebase/services';
import { auth } from 'firebase/config';
import { AppContext } from 'context/AppProvider';

const facebookProvider = new FacebookAuthProvider();
const googleProvider = new GoogleAuthProvider();
const providers = { 'google.com': googleProvider, 'facebook.com': facebookProvider };

const checkUserExist = (additionalUserInfo, user) => {
	if (additionalUserInfo?.isNewUser) {
		addUser(user.uid, {
			displayName: user.displayName,
			email: user.email,
			photoURL: user.photoURL,
			uid: user.uid,
			providerId: additionalUserInfo.providerId,
		});
		return;
	}
};

export default function LoginForm() {
	const { isVN } = useContext(AppContext);
	const [isValidated, setIsValidated] = useState(true);
	const [errorMessage, setErrorMessage] = useState('');
	const emailRef = useRef(null);
	const passwordRef = useRef(null);

	const validationSchema = yup.object().shape({
		email: yup
			.string()
			.email(isVN ? 'Email không đúng' : 'Email is not valid')
			.required(isVN ? 'Vui lòng nhập email' : 'Email is required'),
		password: yup
			.string()
			.required(isVN ? 'Vui lòng nhập mật khẩu' : 'Password is required')
			.min(6, isVN ? 'Mật khẩu tối thiểu 6 ký tự' : 'Password must be at least 6 characters'),
	});

	// const {
	// 	register,
	// 	handleSubmit,
	// 	control,
	// 	formState: { errors },
	// } = useForm({
	// 	resolver: yupResolver(validationSchema),
	// });
	// const onSubmit = (data) => console.log(data);

	const handleLoginEmail = () => {
		validationSchema
			.isValid({ email: emailRef.current.value, password: passwordRef.current.value })
			.then((valid) => {
				if (valid) {
					setIsValidated(true);
					signInWithEmailAndPassword(
						auth,
						emailRef.current.value,
						passwordRef.current.value
					)
						.then((userCredential) => {
							// Signed in
							const user = userCredential.user;
							console.log(user);
						})
						.catch((error) => {
							const errorCode = error.code;
							console.log(errorCode);
						});
					return;
				}

				setIsValidated(false);
				validationSchema
					.validate({
						email: emailRef.current.value,
						password: passwordRef.current.value,
					})
					.catch((err) => {
						setErrorMessage(err.message);
						console.log(err.message);
					});
			});
	};

	const handleLogin = async (provider) => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const { _tokenResponse, user } = result;
				checkUserExist(_tokenResponse, user);
			})
			.catch((error) => {
				const pendingCred = error.credential;
				const email = error.email;

				if (error.code === 'auth/account-exists-with-different-credential') {
					fetchSignInMethodsForEmail(auth, email).then((methods) => {
						const confirmation = window.confirm(
							'Your email is already connected with another provider. Do you want to link to that account?'
						);

						if (confirmation === true) {
							signInWithPopup(auth, providers[methods]).then((result) =>
								result.user.linkWithCredential(pendingCred)
							);
							return;
						}
					});
				}
			});
	};

	return (
		<div className="form__wrapper">
			<div className="form__container">
				<div className="form__group">
					<TextField
						inputRef={emailRef}
						variant="standard"
						label="Email"
						error={!isValidated}
						helperText={errorMessage}
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon fontSize="small" />
								</InputAdornment>
							),
						}}
						className="login__input"
					></TextField>
					<TextField
						inputRef={passwordRef}
						variant="standard"
						type="password"
						label={isVN ? 'Mật khẩu' : 'Password'}
						error={!isValidated}
						helperText={errorMessage}
						fullWidth
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon fontSize="small" />
								</InputAdornment>
							),
						}}
						className="login__input"
					></TextField>
					<Button
						fullWidth
						type="submit"
						variant="contained"
						// disabled={isValidated}
						onClick={handleLoginEmail}
						className="form__btn--email"
					>
						<span className="form__text">
							{isVN ? 'Đăng nhập với mật khẩu' : 'Login with password'}
						</span>
					</Button>
					<p style={{ margin: '16px' }}>
						{isVN ? 'hoặc đăng nhập với' : 'or login with'}
					</p>
					<Stack direction="row">
						<div className="form__item">
							<Button
								fullWidth
								onClick={() => handleLogin(googleProvider)}
								className="form__btn form__btn--google"
							>
								<GoogleIcon />
								<span className="form__text">Google</span>
							</Button>
						</div>
						<div className="form__item">
							<Button
								fullWidth
								onClick={() => handleLogin(facebookProvider)}
								className="form__btn form__btn--facebook"
							>
								<FacebookIcon />
								<span className="form__text">Facebook</span>
							</Button>
						</div>
					</Stack>
					{/* Create fake data */}
					<Button
						variant="contained"
						color="warning"
						fullWidth
						onClick={() => createUsersData()}
					>
						Create User Data
					</Button>
					{/*  */}
					<Link underline="hover" className="form__forgot-password">
						{isVN ? 'Quên mật khẩu?' : 'Forgot password?'}
					</Link>
				</div>
			</div>
		</div>
	);
}
