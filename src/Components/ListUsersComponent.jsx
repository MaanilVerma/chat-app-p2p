import React, { useState, useEffect } from "react";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {
  getDatabase,
  ref,
  onValue,
  update,
  child,
  get,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import { useStoreActions } from "easy-peasy";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";

export default function ListUsersComponent() {
  const auth = getAuth();
  const db = getDatabase();
  const myUid = auth.currentUser.uid;

  const [peopleList, setPeopleList] = useState();

  useEffect(() => {
    if (myUid) {
      const people = ref(db, "users/" + myUid + "/contacts");
      onValue(people, (snapshot) => {
        const data = snapshot.val();
        setPeopleList(data);
      });
    }
  }, []);
  return (
    <>
      {peopleList &&
        Object.keys(peopleList).map((person) => (
          <UserListCard key={person} contactId={person} myUid={myUid} />
        ))}
    </>
  );
}

function UserListCard({ contactId, myUid }) {
  const db = getDatabase();
  const [online, setOnline] = useState(false);
  const [unread, setUnread] = useState(0);
  const [threadId, setThreadId] = useState();
  const [profileDetails, setProfileDetails] = useState();
  const updateOnlinePresence = () => {
    const onlineRef = ref(db, "user-presence/" + contactId + "/connections");
    onValue(onlineRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setOnline(true);
      } else {
        setOnline(false);
      }
    });
  };

  const getProfileDetails = () => {
    return onValue(
      ref(db, `users/${contactId}/details`),
      (snapshot) => {
        setProfileDetails(snapshot.val());
      },
      {
        onlyOnce: true,
      }
    );
  };

  const getUnreadMessages = () => {
    const unreadMessagesRef = ref(
      db,
      `users/${myUid}/contacts/${contactId}/unread`
    );
    onValue(unreadMessagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setUnread(Object.keys(data).length);
        Object.keys(data).map((key) => {
          //message is in sent state, we need to change it into delivered state
          if (!data[key]) {
            const updates = {};
            updates[`threads/${threadId}/${key}/status`] = "delivered";
            updates[
              `users/${myUid}/contacts/${contactId}/unread/${key}`
            ] = true;
            update(ref(db), updates);
          }
        });
      } else {
        setUnread(0);
      }
    });
  };

  const getThreadId = () => {
    get(child(ref(db), `users/${myUid}/contacts/${contactId}/threadId`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setThreadId(snapshot.val());
        } else {
          console.error("No data available");
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  useEffect(() => {
    if (contactId) {
      if (!threadId) {
        getThreadId();
      }
      updateOnlinePresence();
      if (threadId) {
        getProfileDetails();
        getUnreadMessages();
      }
    }
  }, [contactId, threadId]);

  const updateChatsUser = useStoreActions(
    (actions) => actions.chats.updateChatsUser
  );
  const chatWithUser = () => {
    updateChatsUser({ contactId, profileDetails });
  };
  return (
    <>
      {profileDetails && (
        <Paper
          onClick={chatWithUser}
          elevation={2}
          sx={{
            padding: 1,
            my: 2,
            "&:hover": {
              backgroundColor: "#e3e3e3",
              cursor: "pointer",
            },
          }}
        >
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack flexDirection={"row"} alignItems={"center"}>
              <ChatProfile online={online} img={profileDetails?.photoURL} />
              <Typography variant="body" component="div" sx={{ mx: 1 }}>
                {profileDetails?.name.length > 15
                  ? profileDetails?.name.substring(0, 15) + "..."
                  : profileDetails?.name}
              </Typography>
            </Stack>

            <Badge color="secondary" badgeContent={unread}>
              <MailIcon />
            </Badge>
          </Stack>
        </Paper>
      )}
    </>
  );
}

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatProfile = ({ online, img }) => {
  return (
    <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      invisible={!online}
    >
      <Avatar alt={"Chat Profile Image" + img} src={img} />
    </StyledBadge>
  );
};
