import { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexWrap: "wrap",
};

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [conge, setConge] = useState();
  const [title, setTitle] = useState("");

  const conges = [
    {
      value: "1 mois fixe par an",
      label: "Paye",
    },
    {
      value: "2 mois fixe par an",
      label: "maternite",
    },
    {
      value: "3 jours fixes",
      label: "paternite",
    },
  ];

  const handleClose = () => setOpen(false);
  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  function handleOpen() {
    setOpen(true);
  }
  const handleChange = (event) => {
    setConge(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDateClick = (selected) => {
    // const title = prompt("Please enter a new title for your event");
    // const type = prompt("Please enter a new type for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        conge,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // setTitle("");
    // setConge();
    // axios.put(`/api/conges/${id}`, form);
    // .then((res) => {})
    // .catch((err) => setErrors(err.response.data));
  };

  useEffect(() => {
    // axios.get(`/api/conges/${id}`).then((res) => {
    //   setForm(res.data);
    // });
  }, []);

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <>
                      <Typography>
                        {formatDate(event.start, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Typography>
                      {/* <Typography>{event.conge}</Typography> */}
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            dateClick={handleOpen}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={[
              {
                id: "12315",
                title: "All-day event",
                date: "2022-09-14",
                conge: "Paternite",
              },
              {
                id: "5123",
                title: "Timed event",
                date: "2022-09-28",
                conge: "Paternite",
              },
            ]}
            // customButtons={{
            //   addEvent: {
            //     text: "+",
            //     click: addEvent,
            //   },
            // }}
          />
          {/* lehne */}

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} component="form">
              {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography> */}
              <form action="" onSubmit={onSubmitHandler}>
                <TextField
                  sx={{ m: 1, width: "25ch" }}
                  value={title}
                  onChange={handleTitleChange}
                  label="Title"
                />
                <TextField
                  sx={{ m: 1, width: "25ch" }}
                  id="outlined-select-currency"
                  select
                  // label="Select=="
                  value={conge}
                  onChange={handleChange}
                  helperText="Choisir votre conge"
                  required
                >
                  {conges.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography> */}
                <Button
                  sx={{ m: 1, width: "25ch" }}
                  variant="contained"
                  color="primary"
                  // onClick={handleDateClick}
                >
                  Ajouter Conge
                </Button>
              </form>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
