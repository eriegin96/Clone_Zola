import React, { createContext, useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
	const [user, setUser] = useState({});
	const [isAuthLoading, setIsAuthLoading] = useState(true);

	useEffect(() => {
		const unsubscribed = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setIsAuthLoading(false);

				console.log(user);
			} else {
				setUser({});
				setIsAuthLoading(false);
				console.log('log out');
			}
		});

		// clean function
		return () => {
			unsubscribed();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user }}>
			{isAuthLoading ? <LinearProgress /> : children}
		</AuthContext.Provider>
	);
}
