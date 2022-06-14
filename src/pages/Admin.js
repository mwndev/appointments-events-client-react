import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Calendar } from './Book'



export default function Admin() {

  return (
      <>
        <h1>create new appointments</h1>
        <Calendar></Calendar>
        
      </>
  )
}
