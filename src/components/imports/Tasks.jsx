import React from 'react';
import './Tasks.scss';
import { CircularProgress } from '@material-ui/core';
import { get, map, isEmpty } from 'lodash';
import Task from './Task'

const Tasks = ({ tasks, isLoading, error, onRevoke, onDownload }) => {
  const [open, setOpen] = React.useState(null);

  return (
    <div className='col-md-12 tasks-container'>
      {
        isLoading &&
        <div style={{textAlign: 'center'}}>
          <CircularProgress />
        </div>
      }
      {
        error &&
        <div className='failure' style={{padding: '10px'}}>
          { get(error, 'detail') || get(error, 'exception') || error }
        </div>
      }
      {
        isEmpty(tasks) && !error && !isLoading ?
        'No Import Tasks Found.' :
        map(
          tasks,
          task => <Task
                    key={task.task}
                    task={task}
                    open={task.task == open}
                    onOpen={taskId => setOpen(taskId)}
                    onClose={() => setOpen(null)}
                    onRevoke={onRevoke}
                    onDownload={onDownload}
          />
        )
      }
    </div>
  )
}

export default Tasks
