const Option = ({cl, opt, setOpt, option, divClass}) => {
    return(
        <div className={divClass}>
            <span className={`Option ${cl == 'left' ? 'white' : ''}`} onClick={() => opt ? setOpt(false) : false}>{option[0]}</span>
            <span className={`Option ${cl == 'right' ? 'white' : ''}`} onClick={() => !opt ? setOpt(true) : false}>{option[1]}</span>
            <span className={`OptionAbs ${cl}option`}></span>
        </div>
    )
}
export default Option