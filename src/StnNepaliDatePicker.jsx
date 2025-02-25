import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { FaArrowLeft, FaArrowRight, FaCalendarDay } from "react-icons/fa6";

const NepaliDatePicker = forwardRef(({ dateFormat = '%D, %M %d, %y', onDateSelect, defaultDate = '' }, ref) => {
  const calendarData = {
    bsMonths: ['बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फागुन', 'चैत'],
    bsDays: ['आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि'],
    nepaliNumbers: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
    bsMonthUpperDays: [[30, 31], [31, 32], [31, 32], [31, 32], [31, 32], [30, 31], [29, 30], [29, 30], [29, 30], [29, 30], [29, 30], [30, 31]],
    extractedBsMonthData: [
      [0, 1, 1, 22, 1, 3, 1, 1, 1, 3, 1, 22, 1, 3, 1, 3, 1, 22, 1, 3, 1, 19, 1, 3, 1, 1, 3, 1, 2, 2, 1, 3, 1],
      [1, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2],
      [0, 1, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 3, 1, 1, 2],
      [1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 2, 2, 1, 3, 1, 2, 2, 2, 1, 2],
      [59, 1, 26, 1, 28, 1, 2, 1, 12],
      [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 5, 1, 1, 2, 2, 1, 3, 1, 2, 1, 2],
      [0, 12, 1, 3, 1, 3, 1, 5, 1, 11, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 27, 1, 2],
      [1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 15, 2, 4],
      [0, 1, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 3, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 2, 2, 2, 15, 2, 4],
      [1, 1, 3, 1, 3, 1, 14, 1, 3, 1, 1, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 18, 1, 3, 1, 3, 1, 3, 1, 14, 1, 3, 15, 1, 2, 1, 1],
      [0, 1, 1, 3, 1, 3, 1, 10, 1, 3, 1, 3, 1, 1, 1, 3, 1, 3, 1, 10, 1, 3, 1, 3, 1, 3, 1, 3, 1, 14, 1, 3, 1, 3, 1, 3, 1, 3, 1, 10, 1, 20, 1, 1, 1],
      [1, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 3, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 2, 2, 2, 2, 2, 2, 2, 1, 3, 1, 3, 1, 20, 3]
    ],
    minBsYear: 1970,
    maxBsYear: 2100,
    minAdDateEqBsDate: {
      ad: { year: 1913, month: 3, date: 13 },
      bs: { year: 1970, month: 1, date: 1 }
    },
  };

  const calendarFunctions = {
    getNepaliNumber: (number) => {
      if (typeof number !== 'number' || number < 0) throw new Error('Number should be positive integer');
      const prefixNum = Math.floor(number / 10);
      const suffixNum = number % 10;
      return prefixNum !== 0
          ? calendarFunctions.getNepaliNumber(prefixNum) + calendarData.nepaliNumbers[suffixNum]
          : calendarData.nepaliNumbers[suffixNum];
    },

    nepaliPad: (num) => {
      const str = calendarFunctions.getNepaliNumber(num);
      return str.length < 2 ? calendarData.nepaliNumbers[0] + str : str;
    },

    getBsDateInYYYYMMDD: (bsYear, bsMonth, bsDate) => {
      return `${calendarFunctions.getNepaliNumber(bsYear)}-${calendarFunctions.nepaliPad(bsMonth)}-${calendarFunctions.nepaliPad(bsDate)}`;
    },

    getNumberByNepaliNumber: (nepaliNumber) => {
      let number = 0;
      for (let i = 0; i < nepaliNumber.length; i++) {
        const numIndex = calendarData.nepaliNumbers.indexOf(nepaliNumber.charAt(i));
        if (numIndex === -1) throw new Error('Invalid nepali number');
        number = number * 10 + numIndex;
      }
      return number;
    },

    getBsMonthInfoByBsDate: (bsYear, bsMonth, bsDate, dateFormatPattern) => {
      const daysNumFromMinBsYear = calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
      const adDate = new Date(
          calendarData.minAdDateEqBsDate.ad.year,
          calendarData.minAdDateEqBsDate.ad.month,
          calendarData.minAdDateEqBsDate.ad.date - 1
      );
      adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);

      const bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);
      const bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth);
      bsDate = bsDate > bsMonthDays ? bsMonthDays : bsDate;
      const eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate);
      const weekDay = eqAdDate.getDay() + 1;
      const formattedDate = calendarFunctions.bsDateFormat(dateFormatPattern, bsYear, bsMonth, bsDate);
      return {
        bsYear, bsMonth, bsDate, weekDay, formattedDate, adDate: eqAdDate, bsMonthFirstAdDate, bsMonthDays
      };
    },

    getAdDateByBsDate: (bsYear, bsMonth, bsDate) => {
      const daysNumFromMinBsYear = calendarFunctions.getTotalDaysNumFromMinBsYear(bsYear, bsMonth, bsDate);
      const adDate = new Date(
          calendarData.minAdDateEqBsDate.ad.year,
          calendarData.minAdDateEqBsDate.ad.month,
          calendarData.minAdDateEqBsDate.ad.date - 1
      );
      adDate.setDate(adDate.getDate() + daysNumFromMinBsYear);
      return adDate;
    },

    getAdDateInYYYYMMDD: (adDate) => {
      const pad = (num) => String(num).padStart(2, '0');
      return `${adDate.getFullYear()}-${pad(adDate.getMonth() + 1)}-${pad(adDate.getDate())}`;
    },

    getTotalDaysNumFromMinBsYear: (bsYear, bsMonth, bsDate) => {
      if (bsYear < calendarData.minBsYear || bsYear > calendarData.maxBsYear) return null;

      let daysNumFromMinBsYear = 0;
      const diffYears = bsYear - calendarData.minBsYear;
      for (let month = 1; month <= 12; month++) {
        if (month < bsMonth) {
          daysNumFromMinBsYear += calendarFunctions.getMonthDaysNumFormMinBsYear(month, diffYears + 1);
        } else {
          daysNumFromMinBsYear += calendarFunctions.getMonthDaysNumFormMinBsYear(month, diffYears);
        }
      }

      if (bsYear > 2085 && bsYear < 2088) daysNumFromMinBsYear += bsDate - 2;
      else if (bsYear === 2085 && bsMonth > 5) daysNumFromMinBsYear += bsDate - 2;
      else if (bsYear === 2081 && bsMonth === 3) daysNumFromMinBsYear += bsDate + 1;
      else if (bsYear === 2081 && bsMonth === 12) daysNumFromMinBsYear += bsDate - 1;
      else if (bsYear > 2088) daysNumFromMinBsYear += bsDate - 4;
      else if (bsYear === 2088 && bsMonth > 5) daysNumFromMinBsYear += bsDate - 4;
      else daysNumFromMinBsYear += bsDate;

      return daysNumFromMinBsYear;
    },

    getMonthDaysNumFormMinBsYear: (bsMonth, yearDiff) => {
      let yearCount = 0;
      let monthDaysFromMinBsYear = 0;
      if (yearDiff === 0) return 0;

      const bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1];
      for (let i = 0; i < bsMonthData.length; i++) {
        if (bsMonthData[i] === 0) continue;
        const bsMonthUpperDaysIndex = i % 2;
        if (yearDiff > yearCount + bsMonthData[i]) {
          yearCount += bsMonthData[i];
          monthDaysFromMinBsYear += calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * bsMonthData[i];
        } else {
          monthDaysFromMinBsYear += calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] * (yearDiff - yearCount);
          break;
        }
      }
      return monthDaysFromMinBsYear;
    },

    getBsMonthDays: (bsYear, bsMonth) => {
      let yearCount = 0;
      const totalYears = bsYear + 1 - calendarData.minBsYear;
      const bsMonthData = calendarData.extractedBsMonthData[bsMonth - 1];
      for (let i = 0; i < bsMonthData.length; i++) {
        if (bsMonthData[i] === 0) continue;
        const bsMonthUpperDaysIndex = i % 2;
        yearCount += bsMonthData[i];
        if (totalYears <= yearCount) {
          if ((bsYear === 2085 && bsMonth === 5) || (bsYear === 2088 && bsMonth === 5))
            return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 2;
          else if (bsYear === 2081 && bsMonth === 2)
            return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex + 1];
          else if (bsYear === 2081 && bsMonth === 3)
            return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex - 1];
          else if (bsYear === 2081 && bsMonth === 11)
            return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] - 1;
          else if (bsYear === 2081 && bsMonth === 12)
            return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex] + 1;
          else
            return calendarData.bsMonthUpperDays[bsMonth - 1][bsMonthUpperDaysIndex];
        }
      }
      return null;
    },

    getBsDateByAdDate: (adYear, adMonth, adDate) => {
      let bsYear = adYear + 57;
      let bsMonth = (adMonth + 9) % 12;
      bsMonth = bsMonth === 0 ? 12 : bsMonth;
      let bsDate = 1;

      if (adMonth < 4) {
        bsYear -= 1;
      } else if (adMonth === 4) {
        const bsYearFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, 1, 1);
        if (adDate < bsYearFirstAdDate.getDate()) bsYear -= 1;
      }

      const bsMonthFirstAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, 1);
      if (adDate >= 1 && adDate < bsMonthFirstAdDate.getDate()) {
        bsMonth = bsMonth !== 1 ? bsMonth - 1 : 12;
        const bsMonthDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth);
        bsDate = bsMonthDays - (bsMonthFirstAdDate.getDate() - adDate) + 1;
      } else {
        bsDate = adDate - bsMonthFirstAdDate.getDate() + 1;
      }

      return { bsYear, bsMonth, bsDate };
    },

    bsDateFormat: (dateFormatPattern, bsYear, bsMonth, bsDate) => {
      const eqAdDate = calendarFunctions.getAdDateByBsDate(bsYear, bsMonth, bsDate);
      const weekDay = eqAdDate.getDay() + 1;
      let formattedDate = dateFormatPattern;
      formattedDate = formattedDate.replace(/%d/g, calendarFunctions.getNepaliNumber(bsDate));
      formattedDate = formattedDate.replace(/%y/g, calendarFunctions.getNepaliNumber(bsYear));
      formattedDate = formattedDate.replace(/%m/g, calendarFunctions.getNepaliNumber(bsMonth));
      formattedDate = formattedDate.replace(/%M/g, calendarData.bsMonths[bsMonth - 1]);
      formattedDate = formattedDate.replace(/%D/g, calendarData.bsDays[weekDay - 1]);
      return formattedDate;
    },

    parseFormattedBsDate: (dateFormat, dateFormattedText) => {
      let diffTextNum = 0;
      const extractedFormattedBsDate = { bsYear: null, bsMonth: null, bsDate: null, bsDay: null };

      let processedText = dateFormattedText;
      if (/[0-9]/.test(dateFormattedText)) {
        processedText = processedText.replace(/[0-9]/g, (match) => calendarData.nepaliNumbers[parseInt(match)]);
      }

      for (let i = 0; i < dateFormat.length; i++) {
        if (dateFormat.charAt(i) === '%') {
          const valueOf = dateFormat.substring(i, i + 2);
          const endChar = dateFormat.charAt(i + 2) || '';
          const tempText = processedText.substring(i + diffTextNum);
          const endIndex = endChar !== '' ? tempText.indexOf(endChar) : tempText.length;
          const value = tempText.substring(0, endIndex > -1 ? endIndex : tempText.length);

          try {
            if (valueOf === '%y') {
              extractedFormattedBsDate.bsYear = calendarFunctions.getNumberByNepaliNumber(value);
              diffTextNum += value.length - 2;
            } else if (valueOf === '%d') {
              extractedFormattedBsDate.bsDate = calendarFunctions.getNumberByNepaliNumber(value);
              diffTextNum += value.length - 2;
            } else if (valueOf === '%D') {
              extractedFormattedBsDate.bsDay = calendarData.bsDays.indexOf(value) + 1;
              diffTextNum += value.length - 2;
            } else if (valueOf === '%m') {
              extractedFormattedBsDate.bsMonth = calendarFunctions.getNumberByNepaliNumber(value);
              diffTextNum += value.length - 2;
            } else if (valueOf === '%M') {
              extractedFormattedBsDate.bsMonth = calendarData.bsMonths.indexOf(value) + 1;
              diffTextNum += value.length - 2;
            }
          } catch (error) {
            console.error('Error parsing date segment:', value, error);
            return null;
          }
        }
      }

      if (!extractedFormattedBsDate.bsDay && extractedFormattedBsDate.bsYear && extractedFormattedBsDate.bsMonth && extractedFormattedBsDate.bsDate) {
        const eqAdDate = calendarFunctions.getAdDateByBsDate(
            extractedFormattedBsDate.bsYear,
            extractedFormattedBsDate.bsMonth,
            extractedFormattedBsDate.bsDate
        );
        extractedFormattedBsDate.bsDay = eqAdDate.getDay() + 1;
      }

      return extractedFormattedBsDate;
    },
  };

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarDataState, setCalendarDataState] = useState(null);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const pickerRef = useRef(null);

  useEffect(() => {
    if (defaultDate) {
      let parsedDate = calendarFunctions.parseFormattedBsDate(dateFormat, defaultDate);
      if (!parsedDate || !parsedDate.bsYear || !parsedDate.bsMonth || !parsedDate.bsDate) {
        // Try parsing as YYYY-MM-DD with Nepali digits
        const [year, month, date] = defaultDate.split('-').map(num => calendarFunctions.getNumberByNepaliNumber(num));
        if (year && month && date) {
          parsedDate = { bsYear: year, bsMonth: month, bsDate: date };
        }
      }
      if (parsedDate && parsedDate.bsYear && parsedDate.bsMonth && parsedDate.bsDate) {
        setCalendarDataState(
            calendarFunctions.getBsMonthInfoByBsDate(parsedDate.bsYear, parsedDate.bsMonth, parsedDate.bsDate, dateFormat)
        );
      } else {
        console.warn('Invalid defaultDate, falling back to current date:', defaultDate);
        const currentDate = new Date();
        const bsDate = calendarFunctions.getBsDateByAdDate(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            currentDate.getDate()
        );
        setCalendarDataState(
            calendarFunctions.getBsMonthInfoByBsDate(bsDate.bsYear, bsDate.bsMonth, bsDate.bsDate, dateFormat)
        );
      }
    } else {
      const currentDate = new Date();
      const bsDate = calendarFunctions.getBsDateByAdDate(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          currentDate.getDate()
      );
      setCalendarDataState(
          calendarFunctions.getBsMonthInfoByBsDate(bsDate.bsYear, bsDate.bsMonth, bsDate.bsDate, dateFormat)
      );
    }
  }, [defaultDate, dateFormat]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateSelect = (bsYear, bsMonth, bsDate) => {
    bsYear = Math.max(calendarData.minBsYear, Math.min(calendarData.maxBsYear, bsYear));
    bsMonth = Math.max(1, Math.min(12, bsMonth));
    const maxDays = calendarFunctions.getBsMonthDays(bsYear, bsMonth);
    bsDate = Math.max(1, Math.min(maxDays, bsDate));

    const dateInfo = calendarFunctions.getBsMonthInfoByBsDate(bsYear, bsMonth, bsDate, dateFormat);
    const bsDateFormatted = calendarFunctions.getBsDateInYYYYMMDD(bsYear, bsMonth, bsDate);
    const adDateFormatted = calendarFunctions.getAdDateInYYYYMMDD(dateInfo.adDate);
    setSelectedDate(dateInfo.formattedDate);
    setCalendarDataState(dateInfo);
    onDateSelect?.({
      ...dateInfo,
      bsDate: bsDateFormatted,
      adDate: adDateFormatted,
    });
    setIsOpen(false);
  };

  const handlePrevMonth = () => {
    const prevMonth = calendarDataState.bsMonth - 1 > 0 ? calendarDataState.bsMonth - 1 : 12;
    const prevYear = prevMonth === 12 ? calendarDataState.bsYear - 1 : calendarDataState.bsYear;
    setCalendarDataState(
        calendarFunctions.getBsMonthInfoByBsDate(prevYear, prevMonth, calendarDataState.bsDate, dateFormat)
    );
  };

  const handleNextMonth = () => {
    const nextMonth = calendarDataState.bsMonth + 1 <= 12 ? calendarDataState.bsMonth + 1 : 1;
    const nextYear = nextMonth === 1 ? calendarDataState.bsYear + 1 : calendarDataState.bsYear;
    setCalendarDataState(
        calendarFunctions.getBsMonthInfoByBsDate(nextYear, nextMonth, calendarDataState.bsDate, dateFormat)
    );
  };

  const handleToday = () => {
    const currentDate = new Date();
    const bsDate = calendarFunctions.getBsDateByAdDate(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
    );
    setCalendarDataState(
        calendarFunctions.getBsMonthInfoByBsDate(bsDate.bsYear, bsDate.bsMonth, bsDate.bsDate, dateFormat)
    );
  };

  const renderDays = () => {
    if (!calendarDataState) return null;
    const weekCoverInMonth = Math.ceil((calendarDataState.bsMonthFirstAdDate.getDay() + calendarDataState.bsMonthDays) / 7);
    const preMonth = calendarDataState.bsMonth - 1 || 12;
    const preYear = preMonth === 12 ? calendarDataState.bsYear - 1 : calendarDataState.bsYear;
    const preMonthDays = calendarFunctions.getBsMonthDays(preYear, preMonth);

    const days = [];
    for (let i = 0; i < weekCoverInMonth; i++) {
      const week = [];
      for (let k = 1; k <= 7; k++) {
        const calendarDate = i * 7 + k - calendarDataState.bsMonthFirstAdDate.getDay();
        if (calendarDate <= 0) {
          week.push(
              <td key={`${i}-${k}`} className="other-month-date">
                {calendarFunctions.getNepaliNumber(preMonthDays + calendarDate)}
              </td>
          );
        } else if (calendarDate > calendarDataState.bsMonthDays) {
          week.push(
              <td key={`${i}-${k}`} className="other-month-date">
                {calendarFunctions.getNepaliNumber(calendarDate - calendarDataState.bsMonthDays)}
              </td>
          );
        } else {
          week.push(
              <td
                  key={`${i}-${k}`}
                  className={`current-month-date ${calendarDate === calendarDataState.bsDate ? 'active' : ''}`}
                  onClick={() => handleDateSelect(calendarDataState.bsYear, calendarDataState.bsMonth, calendarDate)}
              >
                {calendarFunctions.getNepaliNumber(calendarDate)}
              </td>
          );
        }
      }
      days.push(<tr key={i}>{week}</tr>);
    }
    return days;
  };

  if (!calendarDataState) return null;

  return (
      <>
        <div className="nepali-date-picker-container">
          <input
              type="text"
              value={
                selectedDate
                    ? `${selectedDate} (${calendarFunctions.getAdDateInYYYYMMDD(calendarDataState.adDate)})`
                    : `${calendarDataState.formattedDate} (${calendarFunctions.getAdDateInYYYYMMDD(calendarDataState.adDate)})`
              }
              onClick={() => setIsOpen(!isOpen)}
              readOnly
              ref={ref}
          />
          {isOpen && (
              <div className="nepali-date-picker" ref={pickerRef}>
                <div className="calendar-wrapper">
                  <div className="calendar-controller">
                    <button type="button" className="prev-btn" onClick={handlePrevMonth}><FaArrowLeft /></button>
                    <button type="button" className="today-btn" onClick={handleToday}><FaCalendarDay /></button>
                    <div className="current-month-txt" onClick={() => setShowMonthDropdown(!showMonthDropdown)}>
                      {calendarData.bsMonths[calendarDataState.bsMonth - 1]}
                      {showMonthDropdown && (
                          <div className="drop-down-content" style={{ fontSize: "12px" }}> {/* Changed from "10x" to "12px" */}
                            {calendarData.bsMonths.map((month, index) => (
                                <div
                                    key={month}
                                    onClick={() => {
                                      setCalendarDataState(
                                          calendarFunctions.getBsMonthInfoByBsDate(
                                              calendarDataState.bsYear,
                                              index + 1,
                                              calendarDataState.bsDate,
                                              dateFormat
                                          )
                                      );
                                      setShowMonthDropdown(false);
                                    }}
                                >
                                  {month}
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                    <div className="current-year-txt" onClick={() => setShowYearDropdown(!showYearDropdown)}>
                      {calendarFunctions.getNepaliNumber(calendarDataState.bsYear)}
                      {showYearDropdown && (
                          <div className="drop-down-content"> {/* No inline style here; we'll handle it in CSS */}
                            {Array.from({ length: 2100 - 1970 + 1 }, (_, i) => 1970 + i).map((year) => (
                                <div
                                    key={year}
                                    onClick={() => {
                                      setCalendarDataState(
                                          calendarFunctions.getBsMonthInfoByBsDate(
                                              year,
                                              calendarDataState.bsMonth,
                                              calendarDataState.bsDate,
                                              dateFormat
                                          )
                                      );
                                      setShowYearDropdown(false);
                                    }}
                                >
                                  {calendarFunctions.getNepaliNumber(year)}
                                </div>
                            ))}
                          </div>
                      )}
                    </div>
                    <button type="button" className="next-btn" onClick={handleNextMonth}><FaArrowRight /></button>
                  </div>
                  <table>
                    <thead>
                    <tr>
                      {calendarData.bsDays.map((day) => (
                          <td key={day}>{day}</td>
                      ))}
                    </tr>
                    </thead>
                    <tbody>{renderDays()}</tbody>
                  </table>
                </div>
              </div>
          )}
        </div>

        <style>{`
  .nepali-date-picker-container {
    position: relative;
    display: inline-block;
    font-family: Arial, sans-serif;
  }

  .nepali-date-picker-container input {
    width: 280px; /* Increased from 250px */
    padding: 8px 12px;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }

  .nepali-date-picker {
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    position: absolute;
    z-index: 9999;
    top: calc(100% + 5px);
    left: 0;
  }

  .calendar-wrapper table {
    border-collapse: collapse;
    width : auto
  }

  .calendar-wrapper thead {
    background: #f5f5f5;
    height : 5px
    fontsize: px
    color: #333;
  }

  .calendar-wrapper td {
    border: 1px solid #e0e0e0;
    padding: 5px;
    text-align: center;
    width: 5px; /* Reduced from 40px */
    height: 5px; /* Reduced from 40px */
  }

  .calendar-wrapper tbody td {
    cursor: pointer;
  }

  .current-month-date:hover {
    background-color: #718fcd;
    color: white;
    font-weight: bold;
  }

  .other-month-date {
    color: #999;
    cursor: default;
  }

  .current-month-date.active {
    background-color: #4caf50;
    color: white;
    font-weight: bold;
  }

  .calendar-controller {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .calendar-controller button {
    width: 30px;
    height: 30px;
    border: none;
    background: #f0f0f0;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    font-size: 12px;
  }

  .calendar-controller button:hover {
    background: #e0e0e0;
  }

  .prev-btn { color: #4caf50; }
  .next-btn { color: #4caf50; }
  .today-btn { color: #1976d2; }

  .current-month-txt, .current-year-txt {
    color: #333;
    cursor: pointer;
    font-weight: bold;
    padding: 0 8px;
    position: relative;
    line-height: 30px;
    font-size: 12px;
  }

  .current-month-txt:hover, .current-year-txt:hover {
    color: #1976d2;
    text-decoration: underline;
  }

.drop-down-content {
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: absolute;
    max-height: 200px;
    overflow-y: auto;
    width: 100px;
    z-index: 1000;
    border-radius: 4px;
    font-size: 12px; /* Added to make font smaller */
  }

.drop-down-content div {
    padding: 5px 10px;
    text-align: left;
    cursor: pointer;
  }

  .drop-down-content div:hover {
    background: #718fcd;
    color: white;
  }
`}</style>
      </>
  );
});

NepaliDatePicker.displayName = 'NepaliDatePicker';

export default NepaliDatePicker;