import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#7289da',
		},
	},
});

const MatcherButton = () => {
	return (
		<div id="leftSidebar">
			<ThemeProvider theme={theme}>
				<Button
					size="small"
					component={Link}
					to={`/matcher`}
					variant="contained"
					className="matcherBtn">
					Make a Match!
				</Button>
			</ThemeProvider>
		</div>
	);
};

export default MatcherButton;
