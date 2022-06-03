import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import auth from "./../auth/auth-helper";
import { listByAuthor } from "./api-feedback";
import { Redirect, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: theme.mixins.gutters({
    maxWidth: 600,
    margin: "auto",
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
  }),
  title: {
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(3)}px ${theme.spacing(
      1
    )}px`,
    color: theme.palette.protectedTitle,
    fontSize: "1.2em",
  },
  addButton: {
    float: "right",
  },
  leftIcon: {
    marginRight: "8px",
  },

  date: {
    color: "rgba(0, 0, 0, 0.4)",
  },
}));

export default function History() {
  const classes = useStyles();
  const [feedbacks, setFeedbacks] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false);
  const jwt = auth.isAuthenticated();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    listByAuthor(
      {
        userId: jwt.user._id,
      },
      { t: jwt.token },
      signal
    ).then((data) => {
      if (data.error) {
        setRedirectToSignin(true);
      } else {
        setFeedbacks(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  if (redirectToSignin) {
    return <Redirect to="/signin" />;
  }
  return (
    <div>
      <Paper className={classes.root} elevation={4}>
        <Typography type="title" className={classes.title}>
          Your feedbacks
          <span className={classes.addButton}>
            <Link to="/feedbacks/new">
              <Button color="primary" variant="contained">
                <Icon className={classes.leftIcon}>add_box</Icon> Write a
                feedback
              </Button>
            </Link>
          </span>
        </Typography>
        <List dense>
          {feedbacks.map((feedback, i) => {
            console.log("---feedback", feedback);
            return (
              <span key={i}>
                <ListItem button>
                  <ListItemText primary={feedback.content} />
                  <Typography component="p" className={classes.date}>
                    Added on {new Date(feedback.created).toDateString()}
                  </Typography>
                </ListItem>
                <Divider />
              </span>
            );
          })}
        </List>
      </Paper>
    </div>
  );
}
