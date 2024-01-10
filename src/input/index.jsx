import { useEffect, useState } from "react"
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs"

const Input = ({ su, si, err, setErr, type, name, inputVal, setInputVal, inputClass, checkVal, reqCheck, setReqCheck, authOpt }) => {
    const [passBorder, setPassBorder] = useState(false)
    const [ change, setChange ] = useState(false)
    // const [isTyping, setIsTyping] = useState(false)
    const [check, setCheck] = useState(false)
    const [passType, setPassType] = useState('password')
    const [check2, setCheck2] = useState(false)
    const hideLabel = (val) => {
        setCheck2(val)
        inputVal?.length != 0 ? setCheck(true) : setCheck(val)
        type ? setPassBorder(val) : setPassBorder(false)
    }
    let dotCom = false;
    const checkValid = (e) => {
        temp.invEmail = !e.target.value?.includes('@') || e.target.value[0] == '@' || e.target.value?.split('@')[1][0] == '.' ||
            e.target.value?.split('@')[1][0]?.toUpperCase() == e.target.value?.split('@')[1][0] || e.target.value.includes('..') ||
            e.target.value?.split('@')[0][0]?.toUpperCase() == e.target.value?.split('@')[0][0] || e.target.value.includes('.@') ||
            (!e.target.value.includes('.') || dotCom && dotCom[0].length < 2) || dotCom.length > 4
    }
    let temp = { ...reqCheck }
    const checkEmail = (e) => {
        if (checkVal) {
            if (e.target.value.length > 0 && e.target.value) {
                dotCom = e.target.value?.split(".")?.reverse()
            }
        }
    }
    useEffect(() => {
        setInterval(() => {
            if(!!inputVal && inputVal || change !== inputVal){
            setChange(inputVal)}
        },10000)
    },[])
    useEffect(() => {
        setCheck(false)
        setCheck2(false)
    }, [authOpt])
    const changeInput = (e) => {
            if (reqCheck)
            temp = { ...reqCheck }
            checkEmail(e)
            try {
                // setIsTyping(false)
                let val = e?.target?.value;
                // alert(val)
            if(val?.length <= 35){
                setInputVal(val)
            }
                   //  e.target.value.length <= 25 &&
            }
            catch (err) {
                console.log(err, 'err')
            }
            if (su) {
                if (name == 'Email') {
                    temp.email = e.target.value.length == 0
                    checkValid(e)
                    setErr(false)
                }
                if (name == 'Password') {
                    temp.password = e.target.value.length == 0
                    temp.passlength = e.target.value.length < 8
                }
                if (name == 'Name') {
                    temp.name = e.target.value.length == 0
                }
                setReqCheck(temp)
            }
            si && setErr(false)
            err && name == 'Email' && setErr(false)
        }
    // useEffect(() => {
    //     if (!!inputVal)
    //         setIsTyping(true)
    //     setTimeout(() => {
    //         setIsTyping(false)
    //     }, 2000)
    //     // })
    // }, [inputVal])
    //     const inputElement = document.getElementById(name+ su? 'su': 'si');
    //     let typingTimeout;

    //     const handleTyping = () => {
    //       setIsTyping(true);
    //       clearTimeout(typingTimeout);
    //       typingTimeout = setTimeout(() => {
    //         setIsTyping(false);
    //       }, 2000);
    //     };    
    //     if (inputElement) {
    //         inputElement.addEventListener('input', handleTyping);
    //     }
    //     return () => {
    //         if (inputElement) {
    //             inputElement.removeEventListener('input', handleTyping);
    //         }
    //         clearTimeout(typingTimeout);
    //     };
    // },[])

    return (
        <div className='signUpRowDiv'>
            <div className={!type ? '' : passBorder ? 'signUpPassDiv signUpBorder' : 'signUpPassDiv'}>
                <input id={name + (su ? 'su' : 'si')} type={type ? passType : 'text'} onBlur={() => hideLabel(false)}
                    onFocus={() => hideLabel(true)} name={name?.toLowerCase()}
                    value={inputVal} onChange={changeInput} className={inputClass} />
                {type ? <button type='button' className='signUpPassIcon' onClick={() => passType == 'password' ? setPassType('text') : setPassType('password')}>
                    {passType == 'password' ?
                        <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                </button> : false}
                <label className={`label ${check ? `labelHide ${((inputVal && inputVal?.length != 0)
                ) && !check2 ? "labelHide blackLabel" : ''}` : ''}`}>{name}</label>
            </div>
            {<p className='signUpError'>{inputVal?.trim() != '' ?
                (
                    (!!change && change == inputVal && su && name == 'Password') ?
                        err ? <p>Email Already In Use!</p> : (temp?.passlength) ? <p>Minimum 8 character required!</p> :
                            false : su && name == 'Email' ? inputVal != '' && (temp?.invEmail) ? <p>Invalid Email</p> :
                                false : false) : false}</p>}
        </div>
    )
}
export default Input