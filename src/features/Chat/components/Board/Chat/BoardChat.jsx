import React, { useContext, useMemo, useState } from "react";
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  IconButton,
  Accordion,
  Typography,
  AccordionDetails,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import img from "resources/img/board/label.png";
import ChatMenu from "./ChatMenu";
import { useFirestore, useFirestoreRecentList } from "hooks/useFirestore";
import { AuthContext } from "context/AuthProvider";
import { AppContext } from "context/AppProvider";

const cates = [
  {
    label: "Tất cả",
    type: "all",
  },
  {
    label: "Khách hàng",
    type: "client",
  },
  {
    label: "Gia đình",
    type: "family",
  },
  {
    label: "Công việc",
    type: "work",
  },
  {
    label: "Bạn bè",
    type: "friends",
  },
  {
    label: "Trả lời sau",
    type: "later",
  },
];

const AccordionSummary = styled((props) => <MuiAccordionSummary {...props} />)(
  () => ({
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
  })
);

export default function BoardChat() {
  const { user } = useContext(AuthContext);
  const {
    setActiveTab,
    setActiveWindow,
    rooms,
    selectedRoomId,
    setSelectedRoomId,
    setMessages,
  } = useContext(AppContext);
  const [activeCate, setActiveCate] = useState("all");
  const [height, setHeight] = useState("48px");
  const [anchorEl, setAnchorEl] = useState(() =>
    Array(rooms.length).fill(null)
  );
  const [open, setOpen] = useState(() => Array(rooms.length).fill(false));

  const recentCompareValue = useFirestoreRecentList(user.uid);
  const recentCondition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: recentCompareValue,
    };
  }, [recentCompareValue]);
  const recentList = useFirestore("users", recentCondition);

  const handleOpen = (event, i) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[i] = event.currentTarget;
    setAnchorEl(newAnchorEl);
    open[i] = true;
    setOpen(open);
  };
  const handleClose = (i) => {
    const newAnchorEl = [...anchorEl];
    newAnchorEl[i] = null;
    setAnchorEl(newAnchorEl);
    open[i] = false;
    setOpen(open);
  };

  return (
    <div className="board__chat">
      <div className="board__chat__category">
        <Accordion disableGutters>
          <AccordionSummary
            expandIcon={<ArrowRightIcon sx={{ fontSize: "24px" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ padding: "0" }}
            onClick={() => {
              height === "48px" ? setHeight("112px") : setHeight("48px");
            }}
          >
            <Typography sx={{ fontSize: "15px" }}>Phân loại</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {cates.map((cate, i) => (
              <Chip
                key={i}
                label={cate.label}
                color={activeCate === cate.type ? "primary" : "default"}
                size="small"
                onClick={() => {
                  setActiveCate(cate.type);
                }}
                sx={{ margin: "4px 2px" }}
              />
            ))}
            <Chip
              label={<SettingsApplicationsOutlinedIcon />}
              size="small"
              onClick={() => {
                return;
              }}
            />
          </AccordionDetails>
        </Accordion>
      </div>
      <Divider sx={{ marginTop: "4px" }} />
      <div className="board__chat__list">
        <div className="board__chat__list-header">
          <span>
            Tất cả tin nhắn <ExpandMoreIcon />
          </span>
          <span>Đánh dấu đã đọc</span>
        </div>
        {activeCate === "all" ? (
          rooms.length > 0 ? (
            <List
              sx={{
                height: `calc(536px - ${height})`,
                width: "100%",
                bgcolor: "background.paper",
                overflow: "auto",
              }}
              dense
              component="div"
              role="list"
              className="board__contact__list"
            >
              {rooms.map((room, i) => {
                const labelId = `item-${i}-label`;
                return (
                  <React.Fragment key={i}>
                    <ListItem
                      role="listitem"
                      button
                      disableRipple
                      onClick={() => {
                        setMessages((prevState) => {
                          if (selectedRoomId !== room.id) return null;
                          return prevState;
                        });
                        setSelectedRoomId(room.id);
                        setActiveWindow("chat");
                      }}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="settings"
                          disableRipple
                          onClick={(e) => handleOpen(e, i)}
                        >
                          <MoreHorizOutlinedIcon />
                        </IconButton>
                      }
                      sx={{ padding: "10px 0 10px 10px", width: "100%" }}
                    >
                      <ListItemIcon>
                        <Avatar
                          sx={{ width: "48px", height: "48px" }}
                          src={
                            room.photoURL ||
                            recentList.find((item) =>
                              room.members.includes(item.uid)
                            )?.photoURL
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={
                          room.name ||
                          recentList.find((item) =>
                            room.members.includes(item.uid)
                          )?.displayName
                        }
                      />
                    </ListItem>
                    <ChatMenu
                      anchorEl={anchorEl}
                      open={open}
                      handleClose={handleClose}
                      i={i}
                    />
                  </React.Fragment>
                );
              })}
            </List>
          ) : (
            <>
              <div className="board__chat__list--empty">
                <img src={img} alt="empty" />
                <div>Kết bạn để thêm hội thoại</div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {setActiveTab("contact"); setActiveWindow("addFriend");}}
                >
                  Tìm bạn
                </Button>
              </div>
            </>
          )
        ) : (
          <div className="board__chat__list--empty">
            <img src={img} alt="empty" />
            <div>Phân loại hội thoại để ghi nhớ và nhận biết dễ dàng hơn</div>
            <Button variant="contained" color="secondary">
              Thêm hội thoại
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
