import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadBoards } from '../store/board.actions'
import { boardService } from '../services/board.service'

import { AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineStar } from 'react-icons/hi2'
import { BoardCreate } from '../cmps/board-create'
import { BoardPreview } from '../cmps/board-preview'

export function Workspace() {
	const boards = useSelector((storeState) => storeState.boardModule.boards)
	const [isBoardComposerOpen, setIsBoardComposerOpen] = useState(false)
	const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
	const starredBoards = getStarredBoards()

	useEffect(() => {
		loadBoards()
	}, [])

	function openBoardComposer() {
		setIsBoardComposerOpen(true)
	}

	function closeBoardComposer() {
		setIsBoardComposerOpen(false)
		setBoardToEdit(boardService.getEmptyBoard())
	}

	function getStarredBoards() {
		return boards.filter((board) => board.isStarred)
	}

	function getBoardStyle(board) {
		if (!board) return
		if (board?.style.bgImg)
			return {
				background: `url ("${board.style.bgImg}")`,
			}
		// else if (board?.style.backgroundColor)
		// 	return { backgroundColor: `${board.style.bgColor}` }
		return { backgroundColor: `blue` }
	}

	if (!boards) return <h1>Loading....</h1>

	return (
		<section className="workspace-section">
			<div className="starred-boards">
				<div className="boards-section-header">
					<div className="boards-section-header-icon">
						<HiOutlineStar />
					</div>
					<div className="boards-section-header-name">
						<h3>Starred boards</h3>
					</div>
				</div>

				<ul className="board-list clean-list">
					{starredBoards.map((strdBoard) => {
						return (
							<li key={`starred-${strdBoard._id}`}>
								<BoardPreview board={strdBoard} />
							</li>
							// <a href={`/board/${strdBoard._id}`}>
							// 	<li
							// 		className={`board-preview`}
							// 		key={`starred-${strdBoard._id}`}
							// 		style={boardStyle}
							// 	>
							// 		{strdBoard.title}
							// 	</li>
							// </a>

							// <Link to={`/board/${strdBoard._id}`}>
							// 	<li
							// 		className={`board-preview`}
							// 		key={`starred-${strdBoard._id}`}
							// 		style={boardStyle}
							// 	>
							// 		{strdBoard.title}
							// 	</li>
							// </Link>
						)
					})}
				</ul>

				{/* <ul className="board-list clean-list">
					{starredBoards.map((strdBoard) => {
						let boardStyle = getBoardStyle(strdBoard)
						console.log(boardStyle)
						return (
							<Link to={`/board/${strdBoard._id}`}>
								<li
									className={`board-preview`}
									key={`starred-${strdBoard._id}`}
									style={boardStyle}
								>
									{strdBoard.title}
								</li>
							</Link>
						)
					})}
				</ul> */}
			</div>

			<div className="recently-viewed-boards">
				<div className="boards-section-header">
					<div className="boards-section-header-icon">
						<AiOutlineClockCircle />
					</div>
					<div className="boards-section-header-name">
						<h3>Recently viewed</h3>
					</div>
				</div>

				<ul className="board-list clean-list">
					<li
						className="board-preview create-new-board"
						onClick={openBoardComposer}
						key="001"
					>
						<span>Create new board</span>
					</li>
					{boards.map((board) => (
						<li key={`starred-${board._id}`}>
							<BoardPreview board={board} />
						</li>
						// <Link to={`/board/${board._id}`}>
						// 	<li
						// 		className={`board-preview board-b101`}
						// 		key={`viewed-${board._id}`}
						// 	>
						// 		{board.title}
						// 	</li>
						// </Link>
					))}
				</ul>

				{isBoardComposerOpen && (
					<BoardCreate closeBoardComposer={closeBoardComposer} />
				)}
			</div>
		</section>
	)
}
