import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ heading, back, className, setCheck, setCloseCheck, closeCheck}) => {
    return (
            <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: '10px' }}>
                {/* {!closeCheck?  */}
                <MenuIcon className='hide' onClick={() => setCloseCheck(true)}/>
                 {/* : false} */}
                {/* {back ? 
                <KeyboardBackspace style={{ cursor: 'pointer' }} onClick={() => setCheck(false)} />
                : false} */}
                <h1 className={className}>{heading}</h1>
            </div>
    )
}
export default Navbar