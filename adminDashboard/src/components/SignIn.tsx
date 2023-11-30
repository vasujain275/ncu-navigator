import { Button, TextField, Typography } from "@mui/material";
import Card from "@mui/material/Card/Card";
import { JSX, useState } from "react";
import AppBar from "./AppBar";
import axios from "axios";

export default function SignIn(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <AppBar></AppBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: 150,
          marginBottom: 20,
        }}
      >
        <Typography variant="h4" style={{ color: "#F4813A" }}>
          User Sign In
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant="elevation"
          style={{ width: 400, padding: 20, backgroundColor: "#F6F4EB" }}
        >
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <br />
          <TextField
            id="role"
            label="Your Role (Student/Faculty/Staff)"
            type="test"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <br />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            fullWidth={true}
            size="large"
            style={{ backgroundColor: "#892227" }}
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/admin/login",
                {
                  username: email,
                  password: password,
                },
                {
                  headers: {
                    "Content-type": "application/json",
                  },
                }
              );
              const data = res.data;

              localStorage.setItem("token", data.token);
              location.assign("/");
            }}
          >
            Sign In
          </Button>
        </Card>
      </div>
    </div>
  );
}
