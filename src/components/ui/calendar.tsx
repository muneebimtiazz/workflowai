"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "./utils";
import { buttonVariants } from "./button";

// Calendar component with proper date grid
interface CalendarProps {
  mode?: 'single' | 'range' | 'multiple'
  selected?: Date | { from?: Date; to?: Date }
  onSelect?: (date: Date | { from?: Date; to?: Date } | undefined) => void
  showOutsideDays?: boolean
  className?: string
  classNames?: Record<string, string>
  numberOfMonths?: number
  defaultMonth?: Date
  initialFocus?: boolean
}

function Calendar({
  className,
  selected,
  onSelect,
  mode = 'single',
  defaultMonth,
  numberOfMonths = 1,
  ...props
}: CalendarProps) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    defaultMonth || (selected instanceof Date ? selected : selected?.from) || today
  )

  // Get first day of month and number of days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }

  const isToday = (date: Date) => {
    return isSameDay(date, today)
  }

  const isSelected = (date: Date) => {
    if (mode === 'single' && selected instanceof Date) {
      return isSameDay(date, selected)
    }
    if (mode === 'range' && selected && typeof selected === 'object' && 'from' in selected) {
      if (selected.from && isSameDay(date, selected.from)) return true
      if (selected.to && isSameDay(date, selected.to)) return true
      if (selected.from && selected.to) {
        return date >= selected.from && date <= selected.to
      }
    }
    return false
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const handleDateClick = (day: number, month: Date) => {
    const clickedDate = new Date(
      month.getFullYear(),
      month.getMonth(),
      day
    )

    if (mode === 'single') {
      onSelect?.(clickedDate)
    } else if (mode === 'range') {
      const range = selected && typeof selected === 'object' && 'from' in selected 
        ? selected 
        : { from: undefined, to: undefined }
      
      if (!range.from || (range.from && range.to)) {
        // Start new range
        onSelect?.({ from: clickedDate, to: undefined })
      } else if (range.from && !range.to) {
        // Complete range
        if (clickedDate < range.from) {
          onSelect?.({ from: clickedDate, to: range.from })
        } else {
          onSelect?.({ from: range.from, to: clickedDate })
        }
      }
    }
  }

  const renderCalendar = (monthOffset: number = 0) => {
    const displayMonth = new Date(currentMonth)
    displayMonth.setMonth(currentMonth.getMonth() + monthOffset)
    
    const daysInDisplayMonth = getDaysInMonth(displayMonth)
    const firstDayOfDisplayMonth = getFirstDayOfMonth(displayMonth)

    const days: (number | null)[] = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfDisplayMonth; i++) {
      days.push(null)
    }
    // Add all days of the month
    for (let day = 1; day <= daysInDisplayMonth; day++) {
      days.push(day)
    }

    return (
      <div key={monthOffset} className="p-3">
        <div className="flex items-center justify-between mb-4">
          {monthOffset === 0 && (
            <button
              onClick={() => navigateMonth('prev')}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 p-0"
              )}
              type="button"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {monthOffset !== 0 && <div className="w-7" />}
          <div className="text-sm font-medium">
            {displayMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          {monthOffset === numberOfMonths - 1 && (
            <button
              onClick={() => navigateMonth('next')}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-7 w-7 p-0"
              )}
              type="button"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
          {monthOffset !== numberOfMonths - 1 && <div className="w-7" />}
        </div>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-muted-foreground p-2"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="p-2" />
            }
            const date = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day)
            const dayIsToday = isToday(date)
            const dayIsSelected = isSelected(date)
            const isInRange = mode === 'range' && 
              selected && 
              typeof selected === 'object' && 
              'from' in selected &&
              selected.from && 
              selected.to &&
              date > selected.from && 
              date < selected.to

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day, displayMonth)}
                className={cn(
                  "h-9 w-9 p-0 text-sm rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  dayIsToday && "bg-accent font-semibold",
                  dayIsSelected && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  isInRange && "bg-primary/20",
                  !dayIsSelected && !dayIsToday && "text-foreground"
                )}
                type="button"
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex gap-4", className)}>
      {Array.from({ length: numberOfMonths }, (_, i) => renderCalendar(i))}
    </div>
  );
}

export { Calendar };