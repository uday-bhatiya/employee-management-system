import React from 'react'
import AcceptTask from './AcceptTask'
import NewTask from './NewTask'
import CompleteTask from './CompleteTask'
import FailedTask from './FailedTask'

const TaskList = ({ data }) => {
    return (
        <div id='tasklist' className='h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-wrap w-full py-1 mt-16'>
            {data.map((task, index) => {
                if (task.active) {
                    return <AcceptTask key={index} data={task} />
                }
                if (task.newTask) {
                    return <NewTask key={index} data={task} />
                }
                if (task.completed) {
                    return <CompleteTask key={index} data={task} />
                }
                if (task.failed) {
                    return <FailedTask key={index} data={task} />
                }

            })}
        </div>
    )
}

export default TaskList