import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import auth from "../auth/auth-helper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { create } from "./api-feedback";
import { Link, Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
    fontSize: "1em",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
  input: {
    display: "none",
  },
}));

export default function CreateFeedback() {
  const classes = useStyles();
  const [values, setValues] = useState({
    content: "",
    redirect: false,
    error: "",
  });
  const jwt = auth.isAuthenticated();

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
  };
  const clickSubmit = () => {
    let feedbackData = new FormData();
    values.content && feedbackData.append("content", values.content);

    create(
      {
        userId: jwt.user._id,
      },
      {
        t: jwt.token,
      },
      feedbackData
    ).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, error: "", redirect: true });
      }
    });
  };

  if (values.redirect) {
    return <Redirect to={"/myfeedbacks/"} />;
  }
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Write a feedback
          </Typography>
          <br />
          <TextField
            id="content"
            multiline
            rows="6"
            label="Content"
            className={classes.textField}
            value={values.content}
            onChange={handleChange("content")}
            margin="normal"
          />
          <br />{" "}
          {values.error && (
            <Typography component="p" color="error">
              <Icon color="error" className={classes.error}>
                error
              </Icon>
              {values.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            onClick={clickSubmit}
            className={classes.submit}
          >
            Submit
          </Button>
          <Link to="/myfeedbacks/" className={classes.submit}>
            <Button variant="contained">Cancel</Button>
          </Link>
        </CardActions>
      </Card>
    </div>
  );
}
