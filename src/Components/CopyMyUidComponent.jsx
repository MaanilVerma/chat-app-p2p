import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useStoreState } from "easy-peasy";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
function CopyMyUidComponent() {
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const isLoggedIn = useStoreState((state) => state.auth.isLoggedIn);
  const uid = useStoreState((state) => state.auth.userInfo.uid);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    handleTooltipOpen();
  };

  useEffect(() => {
    if (isLoggedIn) {
      setId(uid);
    } else {
      setId(null);
    }
  }, [isLoggedIn]);
  return (
    <div>
      {id && (
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <div>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="Copied To Clipboard"
            >
              <Button
                color="inherit"
                size="small"
                sx={{ mx: 1 }}
                onClick={handleCopy}
                variant="outlined"
                endIcon={<ContentCopyIcon />}
              >
                Click to Copy Id
              </Button>
            </Tooltip>
          </div>
        </ClickAwayListener>
      )}
    </div>
  );
}

export default CopyMyUidComponent;
