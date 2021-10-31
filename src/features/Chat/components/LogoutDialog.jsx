import React from 'react';
import { Button } from '@mui/material';
import { signOut } from 'firebase/auth';
import { auth } from 'firebase/config';

export default function LogoutDialog() {
	const logout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return <Button onClick={logout}>Log out</Button>;
}
