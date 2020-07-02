import React from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Message from './Message'
import Avatar from '@material-ui/core/Avatar'
import SingleMessage from './UI/SingleMessage'
import Button from './UI/Button'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#F0FFF0'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#F0FFF0'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,

  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0,
  },
}));

export default function Chat(props) {
  const classes = useStyles();
  const theme = useTheme();
  
  const [open, setOpen] = React.useState(true)

  const [chats, setChats] = React.useState([])
  const [activeChat, setActiveChat] = React.useState(null)


  const  { logout, connectedUsers, user } =  props

 console.log(connectedUsers)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap color='secondary'>
            Current Name of user 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            <p style={{color: '#191970'}}>Chats</p>
          </IconButton>
        </div>
        <div style={{display:'flex'}}>
          <h3 style={{color: '#0CA761', marginLeft: '20px'}}>{props.user.name}</h3>       
        </div>
        <Divider/>
        <List>
          { connectedUsers.length > 0 ? connectedUsers.map((user, index) => (
            <ListItem button key={index} onClick={()=>alert('show chat details with clicked user')}>
              <ListItemIcon><Avatar/></ListItemIcon>
              <ListItemText primary={user} style={{color: '#A52A2A'}}/>
            </ListItem>
          )) : null
        }
        </List>
       
        <Button title='Logout' click={logout} color='#0CA761' fontSize='small'/>
    </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >  <div className={classes.drawerHeader} />
         {
           props.messages.length > 0 ? 
         
           props.messages.map((m,index)=>
            <SingleMessage key={index} message={m.msg}/>
           ): <p style={{color: 'red'}}> No Chat Selected</p>
         }
{/* 
         {
           chats.map(chat=>{
             console.log(chat)
             if(chat.name)
             {
               const lastMsg = chat.messages[chat.messages.length - 1 ]
               const user = chat.users.find(({name})=>{
                 return name !==this.props.name
               })
               return(
                 <div key={chat.id} onClick={()=>setActiveChat(chat)}>
                   <div>
                     {user.name[0].toUpperCase()}
                   </div>
                   <div>
                     {user.name}
                   </div>
               {lastMsg && <div>{lastMsg.message}</div>}

                  
                 </div>
               )
             }
           })
         } */}
        <Message sendMessage={(text)=>props.send(text)}/>
      </main>
    </div>
  );
}
