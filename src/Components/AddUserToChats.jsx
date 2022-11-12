import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { getDatabase, ref, push, set } from "firebase/database";
import { getAuth } from "firebase/auth";

function AddUserToChats() {
  const auth = getAuth();
  const myUid = auth.currentUser.uid;

  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const addUser = () => {
    const uid2 = value;
    if (value) {
      const db = getDatabase();
      set(ref(db, `users/${myUid}/contacts/${uid2}`), {
        threadId: `${myUid}${uid2}`,
      });
      set(ref(db, `users/${uid2}/contacts/${myUid}`), {
        threadId: `${myUid}${uid2}`,
      });
    }
  };
  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={9}>
          <TextField
            id="add-user"
            label="Enter User Id"
            value={value}
            onChange={handleChange}
            fullWidth
            size="small"
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            sx={{ height: "100%", width: "100%" }}
            color="primary"
            aria-label="add user"
            component="span"
            variant="contained"
            onClick={addUser}
            size="small"
          >
            <PersonAddIcon />
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddUserToChats;
