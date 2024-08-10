import { useState } from "react";
import "./App.css";
import MyRouter from "./Router";
import { BrowserRouter as Router } from "react-router-dom";
// import { Button, Modal } from 'antd';
import LogoutIcon from "@mui/icons-material/Logout";
import { Box, Button, ButtonGroup, Modal } from "@mui/material";
import { setUserDetail } from "./Redux-Toolkit/ParkingSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [logOutCheck, setLogOutCheck] = useState(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "0",
    outline: "none",
    boxShadow: 24,
    p: 3,
    paddingBottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
    borderRadius: "4px",
  };
  const logOut = () => {
    const token = false;
    localStorage.setItem("token", token);
    // setAuthCheck(false)
    // setPath('/auth')
    dispatch(setUserDetail(token));
  };

  return (
    <div className="App">
      {/* <div
        className="AllFeaturesHeadingChildDiv LogOut"
        onClick={() => setLogOutCheck(true)}
      >
        <LogoutIcon className="AllFeaturesIcon" />
        <h3 className="AllFeaturesHeading">Log out</h3>
      </div>
      <Modal
        open={logOutCheck}
        aria-labelledby="modal-modal-title"
        onClose={() => setLogOutCheck(false)}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2
            style={{
              margin: "4px 0 23px",
              color: "rgb(20, 20, 20)",
              letterSpacing: "0.15px",
            }}
          >
            Logout
          </h2>
          <p
            style={{
              color: "rgb(150, 150, 150)",
              marginBottom: "19px",
              letterSpacing: "0.15px",
            }}
          >
            Are you sure you want to logout?
          </p>
          <ButtonGroup
            style={{ display: "flex", width: "100%", height: "50px" }}
            variant="text"
            aria-label="text button group"
          >
            <Button
              onClick={logOut}
              variant="outline"
              style={{
                fontSize: "14px",
                color: "rgb(211, 47, 47)",
                borderTop: "1px solid rgb(200, 200, 200)",
                display: "flex",
                width: "50%",
                borderColor: "rgb(200, 200, 200)",
                textTransform: "none",
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => setLogOutCheck(false)}
              variant="outline"
              style={{
                fontSize: "14px",
                color: "rgb(235, 180, 30)",
                borderTop: "1px solid",
                display: "flex",
                width: "50%",
                borderColor: "rgb(200, 200, 200)",
                textTransform: "none",
              }}
            >
              No
            </Button>
          </ButtonGroup>
        </Box>
      </Modal> */}

      <Router>
                <MyRouter />
            </Router>
    </div>
  );
}

export default App;
