import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'board'

export const boardService = {
	query,
	getById,
	save,
	remove,
	getEmptyBoard,
	queryGroups,
	getGroupById,
	saveGroup,
	removeGroup,
	getEmptyGroup,
	queryTasks,
	getTaskById,
	removeTask,
	saveTask,
	getEmptyTask,
	getEmptyLabel,
	getEmptyTodo,
	getEmptyChecklist,
	getEmptyAttachment,
}

window.cs = boardService

// * board service
async function query(filterBy = { title: '' }) {
	return httpService.get(STORAGE_KEY, filterBy)
	// var boards = await storageService.query(STORAGE_KEY)
	// return boards
}

async function getById(boardId) {
	return httpService.get(`board/${boardId}`)
	// return await storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
	return httpService.delete(`board/${boardId}`)
	// await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
	console.log('board vv:', board)

	var savedBoard
	if (board._id) {
		savedBoard = await httpService.put(`board/${board._id}`, board)
		// savedBoard = await storageService.put(STORAGE_KEY, board)
	} else {
		// Later, owner is set by the backend
		board.createdBy = userService.getLoggedinUser()
		savedBoard = await httpService.post('board', board)
		// savedBoard = await storageService.post(STORAGE_KEY, board)
	}
	return savedBoard
}

function getEmptyBoard() {
	return {
		title: '',
		isStarred: false,
		archivedAt: null,
		createdBy: {},
		style: {
			background: '',
			thumbnail: '',
			backgroundColor: '',
		},
		labels: [
			{
				"id": "l101",
				"title": "UI",
				"color": "#7bc86c"
			},
			{
				"id": "l102",
				"title": "Low priority",
				"color": "#f5dd29"
			},
			{
				"id": "l103",
				"title": "Medium priority",
				"color": "#ffaf3f"
			},
			{
				"id": "l104",
				"title": "High priority",
				"color": "#ef7564"
			},
			{
				"id": "l105",
				"title": "Bug",
				"color": "#cd8de5"
			}
		],
		members: [],
		groups: [],
		activities: [],
	}
}

// * group service
async function queryGroups(boardId) {
	try {
		let board = await getById(boardId)
		let groups = board.groups
		return groups
	} catch (err) {
		console.log('Failed to get groups', err)
		throw err
	}
}

async function getGroupById(groupId, boardId) {
	try {
		const groups = await queryGroups(boardId)
		const group = groups.find((grp) => {
			return grp.id === groupId
		})
		return group
	} catch (err) {
		console.log('Failed to get group', err)
		throw err
	}
}

async function removeGroup(groupId, boardId) {
	try {
		let board = await getById(boardId)
		const updatedGroups = board.groups.filter((group) => group.id !== groupId)
		board.groups = updatedGroups
		return save(board)
	} catch (err) {
		console.log('Failed to remove group', err)
		throw err
	}
}

async function saveGroup(group, boardId) {
	try {
		let board = await getById(boardId)
		if (group.id) {
			const idx = board.groups.findIndex(
				(currGroup) => currGroup.id === group.id
			)
			if (idx < 0)
				throw new Error(`Update failed, cannot find group with id: ${group.id}`)
			board.groups.splice(idx, 1, group)
		} else {
			group.id = utilService.makeId()
			board.groups.push(group)
		}
		return save(board)
	} catch (err) {
		console.log('Failed to save group', err)
		throw err
	}
}

function getEmptyGroup() {
	return {
		title: '',
		tasks: [],
	}
}

// * tasks service
async function queryTasks(groupId, boardId) {
	try {
		let group = await getGroupById(groupId, boardId)
		let tasks = group.tasks
		return tasks
	} catch (err) {
		console.log('Failed to get tasks', err)
		throw err
	}
}

async function getTaskById(taskId, groupId, boardId) {
	try {
		const tasks = await queryTasks(groupId, boardId)
		const task = tasks.find((task) => task.id === taskId)
		return task
	} catch (err) {
		console.log('Failed to get task', err)
		throw err
	}
}

async function removeTask(taskId, groupId, boardId) {
	try {
		let group = await getGroupById(groupId, boardId)
		let updatedTasks = group.tasks.filter((task) => task.id !== taskId)
		group.tasks = updatedTasks
		return await saveGroup(group, boardId)
	} catch (err) {
		console.log('Failed to remove task', err)
		throw err
	}
}

async function saveTask(task, groupId, boardId) {
	try {
		let group = await getGroupById(groupId, boardId)
		if (task.id) {
			const idx = group.tasks.findIndex((currTask) => currTask.id === task.id)
			if (idx < 0)
				throw new Error(`Update failed, cannot find task with id: ${task.id}`)
			group.tasks.splice(idx, 1, task)
		} else {
			task.id = utilService.makeId()
			group.tasks.push(task)
		}
		return await saveGroup(group, boardId)
	} catch (err) {
		console.log('Failed to save group', err)
		throw err
	}
}

function getEmptyTask() {
	return {
		title: '',
		archivedAt: null,
		labelIds: [],
		dueDate: '',
		byMember: {
			_id: '',
			username: '',
			fullname: '',
			imgUrl: '',
		},
		memberIds: [],
		comments: [],
		style: {},
		attachments: [],
		checklists: [],
		isDone: false,
	}
}

function getEmptyLabel() {
	return {
		id: '',
		title: '',
		color: '',
	}
}
function getEmptyTodo() {
	return {
		id: utilService.makeId(),
		isDone: false,
		title: '',
	}
}
function getEmptyChecklist() {
	return {
		id: utilService.makeId(),
		title: '',
		todos: [],
	}
}

function getEmptyAttachment() {
	return {
		id: utilService.makeId(),
		createdAt: Date.now(),
		url: '',
		title: 'Attachment Image',
	}
}