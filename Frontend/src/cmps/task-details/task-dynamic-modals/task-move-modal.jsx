import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { updateBoard } from '../../../store/board.actions'

export function TaskMoveModal({ task, data, onSaveTask, onClose }) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const { boardId, groupId, taskId } = useParams()

    const [selectedGroupId, setSelectedGroupId] = useState("")
    const [selectedTaskPos, setSelectedTaskPos] = useState("")

    let groups = board.groups

    useEffect(() => {
        const group = board.groups.find((group) =>
            group.tasks.find((currTask) => currTask.id === task.id)
        )
        if (group) {
            setSelectedGroupId(group.id)
        }
        const taskIndex = group?.tasks.findIndex(
            (currTask) => currTask.id === task.id
        )
        if (taskIndex !== -1) {
            setSelectedTaskPos(taskIndex)
        }
    }, [task, board])

    function handleGroupChange(ev) {
        setSelectedGroupId(ev.target.value)
        setSelectedTaskPos("")
        console.log(ev.target.value)
    }

    function handleTaskChange(ev) {
        setSelectedTaskPos(ev.target.value)
        console.log(ev.target.value)
    }

    function onMoveBtn() {
        if (selectedGroupId && selectedTaskPos !== "") {
            const currGroup = groups.find((group) => group.tasks.find((task) => task.id === taskId))
            const currTask = currGroup.tasks.find((task) => task.id === taskId)

            const currTaskIndex = currGroup.tasks.findIndex((task) => task.id === taskId)
            const newGroup = board.groups.find((group) => group.id === selectedGroupId)

            currGroup.tasks.splice(currTaskIndex, 1)
            newGroup.tasks.splice(selectedTaskPos, 0, currTask)
            onClose()
            updateBoard(board)
        }
    }

    return (
        <section className='cmp-dynamic-options-list task-move-modal-section'>

            <h3 className='small-headline cmp-dynamic-options-title'>
                Select destination
            </h3>

            <div className='task-move-modal-options'>

                <div className="move-modal-select-list-container">
                    <label className="move-modal-label">List</label>
                    <select className="move-modal-select" value={selectedGroupId}
                        onChange={handleGroupChange}>

                        {groups.map((group) => (
                            <option className="move-modal-select-option" key={group.id} value={group.id}>
                                {group.title}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="move-modal-select-pos-container">
                    <label className="move-modal-label">Position</label>
                    <select className="move-modal-select" value={selectedTaskPos}
                        onChange={handleTaskChange}>

                        {selectedGroupId && groups.find((group) => group.id === selectedGroupId)
                            .tasks.map((task, index) => (
                                <option className="move-modal-select-option" key={index} value={index}>
                                    {index + 1}
                                </option>
                            ))}
                    </select>
                </div>

            </div>

            <button className='clean-btn btn-task-details btn-move-modal'
                onClick={(ev) => { onMoveBtn() }}>
                Move
            </button>

        </section >
    )
}