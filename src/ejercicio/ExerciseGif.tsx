import React, { FC } from 'react'
import {PropsGif} from './domain/props'




export const ExerciseGif: FC<PropsGif> = ({gif}) =>{ 



  return (
    <img src={gif} alt="exercise-gif" className="exercise-gif" />
  )
}


