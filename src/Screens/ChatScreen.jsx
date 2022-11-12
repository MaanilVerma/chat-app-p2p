import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ChatComponent from "./../Components/ChatComponent";
import { getAuth } from "firebase/auth";
import ContactsTab from "./../Components/ContactsTab";
import AddUserToChats from "./../Components/AddUserToChats";
import Paper from "@mui/material/Paper";
import {
  getDatabase,
  ref,
  onValue,
  push,
  onDisconnect,
  set,
  serverTimestamp,
} from "firebase/database";

function ChatScreen() {
  const db = getDatabase();
  const auth = getAuth();
  useEffect(() => {
    let unsubscribe;
    const myUid = auth?.currentUser?.uid;
    if (myUid) {
      const myConnectionsRef = ref(db, `user-presence/${myUid}/connections`);

      const lastOnlineRef = ref(db, `user-presence/${myUid}/lastOnline`);

      const connectedRef = ref(db, ".info/connected");
      unsubscribe = onValue(connectedRef, (snap) => {
        if (snap.val() === true) {
          const con = push(myConnectionsRef);

          onDisconnect(con).remove();

          set(con, true);

          onDisconnect(lastOnlineRef).set(serverTimestamp());
        }
      });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [auth]);
  return (
    <Box
      sx={{
        margin: {
          xs: 1,
          md: 3,
        },
      }}
    >
      {auth?.currentUser?.uid && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Paper
              elevation={3}
              sx={{
                height: "80vh",
                padding: 2,
              }}
            >
              <AddUserToChats />
              <ContactsTab />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            <ChatComponent />
          </Grid>
        </Grid>
      )}
    </Box>
  );
}

export default ChatScreen;
