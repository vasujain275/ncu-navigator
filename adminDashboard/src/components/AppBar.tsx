import { Button } from "@mui/material";

export default function AppBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
        paddingLeft: 10,
      }}
    >
      <img
        src="/logo-ncu.png"
        width={"70px"}
        onClick={() => {
          location.assign("/");
        }}
      ></img>
      <div>
        <Button
          variant="contained"
          style={{ marginRight: 10, backgroundColor: "#F4813A" }}
          onClick={() => {
            location.assign("/signup");
          }}
        >
          SIGN UP
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#F4813A" }}
          onClick={() => {
            location.assign("/login");
          }}
        >
          SIGN IN
        </Button>
      </div>
    </div>
  );
}
