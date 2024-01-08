import { useSelector } from 'react-redux';
import './MainPage.css'
import PrevParking from './PrevParking';
import AddArea from './AddArea';
import BookedParking from './BookedParking';
import { useState } from 'react';
import Dashboard from './Dashboard';
import AllUser from './AllUser';
import Profile from './Profile';
const MainPage = ({select, closeCheck, setSelect}) => {
    const {userDetail} = useSelector(e => e)
    // const [placeNum, setPlaceNum] = useState(false)
    // const [slotsNum, setSlotsNum] = useState(false)
    // let temp = false
    return(
        <div className={closeCheck == true ? "MainPageMainDiv MainPageDiv2" :"MainPageMainDiv"}>
            { userDetail?.status == 'Admin'? (
            select == 0 ? <Dashboard /> :
            select == 1 ? <PrevParking /> : 
            select == 2 ? <AllUser /> : <Profile />) :
            // <AddArea select={select} setSelect={setSelect} closeCheck={closeCheck}/> :
            // select == 3 ? 
            select == 0 ? <Dashboard /> : select == 1? <PrevParking /> : select == 2? <BookedParking /> : <Profile />
            }
        </div>
    )
}
export default MainPage;