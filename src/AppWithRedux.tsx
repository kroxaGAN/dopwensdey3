import React from 'react';
import './App.css';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton/IconButton";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
} from "./state/todolists-reducer";
import {
    TasksActionsType,
} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType, TodolistWithRedux} from "./TodolistWithRedux";
import {changeLoaderStatusAC} from "./state/loader-reducer";
import {CircularStatic} from "./Circular progress-withL-label";


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {


    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    let isLoading = useSelector<AppRootStateType, boolean>(state => state.loader)
    const dispatch = useDispatch()

    function addTodolist(title: string) {
        dispatchWithLoading(addTodolistAC(title))
    }

    const dispatchWithLoading = (action: TasksActionsType) => {
        dispatch(changeLoaderStatusAC(true))
        dispatch(action)
        setTimeout(() => dispatch(changeLoaderStatusAC(false)), 5000)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {isLoading &&
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <span>LOADING</span>
                        <CircularStatic isWaiting={isLoading} timeInterval={2000}/>
                    </div>
                    }

                    {!isLoading && todolists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper style={{padding: "10px"}}>
                                <TodolistWithRedux
                                    todolist={tl}
                                />
                            </Paper>
                        </Grid>
                    })}

                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;

