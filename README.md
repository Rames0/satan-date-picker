![alt text](image.png)
![alt text](image-1.png)


const datePickerRef = useRef(null);
    const handleDateSelect = (dateInfo) => {

        // dateInfo contains:

        // - bsYear, bsMonth, bsDate (Bikram Sambat date)

        // - formattedDate (formatted based on dateFormat and language)

        // - bsDate (YYYY-MM-DD in selected language numbers)

        // - adDate (YYYY-MM-DD in English numbers)
    };

    %D = WeekDays
    %M = Months
    %d = Date
    %y = Year
    %m = Num Months
    

    {/* For Nepali Calendar */}
    <StnNepaliDatePicker
        ref={datePickerRef}
        dateFormat="%D, %M %d, %y"
        onDateSelect={handleDateSelect}
        language="nepali"
    />
    {/* English (AD) Calendar with current date */}
    <StnNepaliDatePicker
        ref={datePickerRef}
        dateFormat="%D, %M %d, %y"
        onDateSelect={handleDateSelect}
        language="english"
    />

    !!Important Note : For Now Install React-Icons To Use 
        
# satan-date-picker
