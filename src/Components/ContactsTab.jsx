import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ListUsersComponent from "./ListUsersComponent";
import ListOnlineUsersComponent from "./ListOnlineUsersComponent";

export default function ContactsTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", mt: 0.5 }}>
      <Tabs value={value} onChange={handleChange} centered variant="fullWidth">
        <Tab label="All" />
        <Tab label="Online" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ListUsersComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListOnlineUsersComponent />
      </TabPanel>
    </Box>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}
