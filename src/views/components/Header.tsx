import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function ButtonAppBar() {
  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Typography variant="h6">
          <Link to={`/`}>Sabun Kanri</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
