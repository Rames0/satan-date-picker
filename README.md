# satan-date-picker

A Nepali date picker component for React based on Bikram Sambat (Nepali calendar).

![satan-date-picker](https://github.com/Rames0/satan-date-picker/blob/main/image.png)
![satan-date-picker](https://github.com/Rames0/satan-date-picker/blob/main/image-1.png)

## 🚀 Features
- 🎉 **Support for Nepali (Bikram Sambat) and English (Gregorian) calendars**
- 📅 **Flexible date format customization**
- ⚡ **Lightweight & easy to use**
- 🌍 **Language support: Nepali and English**

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

## 📦 Installation

To install `satan-date-picker`, use npm:

```sh
npm install satan-date-picker
