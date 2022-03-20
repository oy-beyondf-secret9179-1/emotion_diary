import { useState } from "react";
import { useNavigate } from "react-router";
import MyButton from "./MyButton";

const sortOptionList = [
    {value:"latest", name:"최신순"},
    {value:"oldest", name:"과거순"},
];

const filterOptionList =[
    {value:"all", name:"전부다"},
    {value:"good", name:"좋은 감정"},
    {value:"bad", name:"안좋은 감정"},
];

const ControlMenu = ({value, onChange, optionList}) => {
    return (
        <select
            className="ControlMenu"
            value={value}
            onChange={(e)=> onChange(e.target.value)}
        >
            {optionList.map((data, idx)=> (
                <option key={idx} value={data.value}>{data.name}</option>
            ))}
        </select>
    )
}

const DiaryList = ({diaryList}) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState('lastest');
    const [filter, setFilter] = useState('all');

    const getProcessedDiaryList = () => {

        const filterCallBack = (item) => {
            if(filter === 'good') {
                return parseInt(item.emotion) <= 3;
            }else{
                return parseInt(item.emotion) > 3;
            }
        }

        const compare = (a, b)=> {
            if(sortType === 'latest'){
                return parseInt(b.date) - parseInt(a.date);
            }else{
                return parseInt(a.date) - parseInt(b.date);
            }
        };
        const copyList = JSON.parse(JSON.stringify(diaryList));

        const filterList = filter === 'all' ? copyList : copyList.filter((data)=> filterCallBack(data));

        const sortedList = filterList.sort(compare);
        return sortedList;
    }

    return (
        <div className="DiaryList">
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu 
                        value={sortType}
                        onChange={setSortType}
                        optionList={sortOptionList}
                    />
                    <ControlMenu
                        value={filter}
                        onChange={setFilter}
                        optionList={filterOptionList}
                    />
                </div>
                <div className="right_col">
                    <MyButton
                        type={'positive'}
                        text={'새 일기쓰기'}
                        onClick={()=> navigate("/new")}
                    />
                </div>
            </div>
            
            {getProcessedDiaryList().map((data) => (
                <div key={data.id}>
                    {data.content} {data.emotion}
                </div>
            ))}
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList: [],
}

export default DiaryList;