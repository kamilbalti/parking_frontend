import dayjs from 'dayjs';
import { DateTimePicker, LocalizationProvider, renderTimeViewClock } from "@mui/x-date-pickers";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const DateTimeInput = ({timeInfo, timeInfo2, setTimeFunc, setTimeFunc2, minCondition, maxCondition}) => {
    // const minCondition = timeInfo2 ? (
    // dayjs(timeInfo)?.isAfter(dayjs()) ?
    //     dayjs(timeInfo).add(5, 'minute') :
    //     dayjs(timeInfo).add(2, 'month')) : dayjs()
    // const maxCondition = timeInfo2 ? dayjs(timeInfo).add(1, 'year') : dayjs().add(1, 'year')
    return (
        <div className="DatePickerDiv" style={{ display: 'flex' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
                    <DateTimePicker
                        minDateTime={minCondition}
                        maxDateTime={maxCondition}
                        value={dayjs(new Date(timeInfo2 ? timeInfo2 : timeInfo))}
                        format={'DD-MM-YYYY hh:mm A'}
                        onChange={ timeInfo2 ? setTimeFunc2 : setTimeFunc}
                        label={timeInfo2? "Ending Time" : 'Starting Time'}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock
                        }} />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    )
}
export default DateTimeInput