import React, { FC, useState} from 'react'
import { useFormik } from 'formik';
import * as FaIcons from "react-icons/fa";
import axios from 'axios';
import {IValues} from './domain/values'
import {Props} from './domain/props'
import { validationSchema } from './domain/validationSchema';
import {optionsHeaders} from '../utils/utils'
import {AddAlumnoApi} from './infrastructure/api'

export const AddAlumnos: FC<Props> = ({className, changeClass, reloadStudents}) => {
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const onSubmit = async (values:IValues) => {
    

    const { ...data} = values


          const response = await axios.post(AddAlumnoApi, data, optionsHeaders)
          
          .catch((err) => {
            if (err && err.response)
            setError(err.response.data.message)
            setSuccess(null)
          })

          if(response && response.data){
            setError(null)
            setSuccess(response.data.message)
            formik.resetForm()
          }

  }

  function close(){
    changeClass()
    reloadStudents()
    setSuccess(null)
  }

  const formik = useFormik({initialValues: { alumnoName: ''}, 
    validateOnBlur:true,
    onSubmit,
    validationSchema: validationSchema
  })

  return (
    <section className={className}>

         <form className='modal__form' onSubmit={formik.handleSubmit} >

           <div className='close' onClick={close}>
              <FaIcons.FaTimes />
           </div>

            <div>
              <h2>Nuevo alumno</h2>
            </div>

            <div>
              {error==null && <p className='form-success'> {success ? success: ''} </p>}
              {success==null && <p className='form-error'> {error ? error: ''} </p>}
            </div>

            <div className='form-input'>
              <input id="alumnoName" placeholder='Nombre del Alumno' className='input' type='text' name='alumnoName' value={formik.values.alumnoName} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
              <div className='input__error'>{formik.touched.alumnoName && formik.errors.alumnoName ? formik.errors.alumnoName: ''}</div>
            </div>

           <button className='primary-button' type='submit'>Guardar</button>
           
         </form>
      
    </section> 
  )
}

