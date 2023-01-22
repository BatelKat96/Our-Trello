import { useSelector } from 'react-redux'

import { IoClose } from "react-icons/io5"

export function TaskCmpDynamoic(props) {
    const board = useSelector((storeState) => storeState.boardModule.board)
    const members = 'Labels'
    let info
    DynamicCmp(props)

    function DynamicCmp(currProps) {

        switch (currProps.cmpType) {
            case 'members':
                info = board.members
                return info

            case 'labels':
                info = board.labels
                return info
        }
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function onClose() {
        props.onOpenModal()
    }

    let data = {
        title: capitalizeFirstLetter(props.cmpType),
        txt: '',
        placeholder: `Search ${props.cmpType}`,
        optionsTitle: `Board ${props.cmpType}`,
        options: info
    }
    // console.log('data:', data)


    if (!board) return <h1 className='loading'>Loadings....</h1>

    return <div className='task-cmp-dynamoic'>
        <div className='task-cmp-dynamoic-container'>

            <a onClick={onClose}>
                <IoClose className='close-icon' />
            </a>

            <p className='cmp-dynamoic-title'>{data.title}</p>

            <div className='dynamic-container'>

                <input type="text"
                    className='cmp-dynamoic-input'
                    name="txt"
                    id="txt"
                    placeholder={data.placeholder}
                    // onChange={handleChange}
                    defaultValue={data.txt} />

                <h3 className='small-headline cmp-dynamoic-options-title'>{data.optionsTitle}</h3>

                {props.cmpType === 'members' && <ul className='cmp-dynamoic-options-list clean-list'>
                    {info.map(opt =>
                        <li key={opt._id} className="cmp-dynamoic-option">
                            <img className='cmp-dynamoic-member-img' src={require(`../../assets/img/members-task-details/${opt.imgUrl}`)} alt={opt.imgUrl} />
                            <span>{opt.fullname}</span>
                        </li>
                    )}
                </ul>}

                {props.cmpType === 'labels' && <ul className='cmp-dynamoic-options-list clean-list'>
                    {info.map(opt =>
                        <li key={opt._id} className="cmp-dynamoic-option cmp-dynamoic-option-labels" style={{ backgroundColor: `${opt.color}38` }}>
                            {/* <img className='cmp-dynamoic-member-img' src={require(`../../assets/img/members-task-details/${opt.imgUrl}`)} alt={opt.imgUrl} /> */}
                            <span className='color-circle' style={{ backgroundColor: `${opt.color}` }}></span>
                            <p>{opt.title}</p>
                        </li>
                    )}
                </ul>}

                {/* <ul className='cmp-dynamoic-options-list clean-list'>
                    {data.options.map(opt =>
                        <li key={opt} className="cmp-dynamoic-option">
                            {opt}
                        </li>
                    )}
                </ul> */}

            </div>
        </div>
    </div>


}