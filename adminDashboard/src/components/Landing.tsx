import { Button, Typography } from "@mui/material";
import AppBar from "./AppBar";

export default function Landing() {
  return (
    <>
      <AppBar></AppBar>
      <div style={{ display: "flex", justifyContent: "center", padding: 200 }}>
        <div>
          <Typography variant="h2" style={{color: "#F4813A"}}>Campus</Typography>
          <Typography variant="h2">Navigation</Typography>
          <Typography variant="h2" style={{color: "#892227"}}>Made</Typography>
          <Typography variant="h2">Easy</Typography>
          <br />
          <Button
            size="large"
            variant="contained"
            style={{ backgroundColor: "#892227" }}
          >
            Open Map
          </Button>
        </div>
      </div>
    </>
  );
}
