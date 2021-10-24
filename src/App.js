import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/roboto';
import '@fontsource/poppins';

import { AuthContext } from './context/AuthProvider';
import LoginPage from './features/Auth/pages/LoginPage';
import ChatPage from './features/Chat/pages/ChatPage';

const theme = createTheme({
	palette: {
		primary: {
			main: '#0190f3',
			dark: '#0184e0',
		},
		secondary: {
			main: '#f50057',
		},
	},
});

function App() {
	const {
		user: { uid },
	} = useContext(AuthContext);

	return (
		<React.Fragment>
			<ThemeProvider theme={theme}>
				{uid ? (
					<Switch>
						<Route exact path="/" component={ChatPage} />
					</Switch>
				) : (
					<Switch>
						<Route exact path="/" component={LoginPage} />
						<Redirect from="*" to="/" />
					</Switch>
				)}
			</ThemeProvider>
		</React.Fragment>
	);
}

export default App;
