import React from 'react'
import { getUser } from './api/bridgeApi'

export const Time = () => {

  const onClickButton = async () => {
    console.log(`click button`)
    const data = await getUser()

    console.log(data)
  }
  return (
    <div>
      <button className="button" onClick={onClickButton}>fetchData</button>
    </div>
  )
}