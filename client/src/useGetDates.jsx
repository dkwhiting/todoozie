import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const useGetDates = () => {
  const [today, setToday] = useState(null)
  const [tomorrow, setTomorrow] = useState(null)

  useEffect(() => {
    let dateOne = new Date()
    let dateTwo = new Date()
    dateTwo.setDate(dateOne.getDate() + 1)

    setToday(`${dateOne.getMonth >= 9 ? '1' : '0'}${dateOne.toLocaleDateString()}`)
    setTomorrow(`${dateTwo.getMonth >= 9 ? '1' : '0'}${dateTwo.toLocaleDateString()}`)
  }, [])

  return [today, tomorrow]
}

export default useGetDates
