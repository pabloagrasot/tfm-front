import { FC, useEffect} from 'react'
import * as FaIcons from "react-icons/fa";
import { optionsHeaders } from '../utils/utils'
import axios, {AxiosResponse} from 'axios'
import {PropsExerciseDelete} from './domain/props'
import { IExercise } from './domain/interfaces';
import {exercisesApi, alumnoApi} from './infrastructure/api'


export const ExerciseDelete: FC<PropsExerciseDelete> = ({exerciseID, getAlumno, reloadExercises}) => {

const apiDelete = alumnoApi + getAlumno + exercisesApi + '/' + exerciseID
const deleteClick = (id:string) => {
    axios.delete<IExercise[]>(apiDelete, optionsHeaders)
  .then((response:AxiosResponse) => {
    reloadExercises()
      })
    }
useEffect(() => {


}, [exerciseID])

  return (
    

    <FaIcons.FaTrash className='icon-delete-exercise' onClick={() => deleteClick(exerciseID)} />
      
   
  )
}