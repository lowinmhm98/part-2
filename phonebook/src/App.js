import { useState, useEffect } from 'react'
import Notification from './Notification'

import personService from  "./service/person"

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [Message, setMessage] = useState('')
  const [type, setType] = useState('')

  useEffect(()=>{
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })


  },[])
  const [toFilter,setToFilter]= useState("")
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addNewPerson = (e)=>{
    e.preventDefault()
   
   if (!persons.filter((elem)=>{return(elem.name===newName || elem.number ===newNumber)}).length){
    
    const person = {name:newName, number:newNumber}
      
      personService
      .create(person)
      .then(returnedPerson => {

        setPersons([...persons,returnedPerson])
        setMessage(
          ` ${person.name} was added to the server`
        )
        setType("success")
        setTimeout(() => {
          setMessage("")
        }, 5000)
      })
      .catch(error => {
        setMessage(
          ` ${error.response.data.error} `
        )
        setType("error")
        setTimeout(() => {
          setMessage("")
        }, 5000)
        // this is the way to access the error message
        console.log(error.response.data.error)
      })
      
    
   } else {
    let double = persons.filter((elem)=>{return(elem.name===newName)})
    if (double.length && window.confirm(double[0].name+" is already in the phonebook. Do you want to change the number")){
      const changedPerson = { ...double[0], number: newNumber }
      console.log(changedPerson)
      personService
      .update(changedPerson.id, changedPerson).then((newPerson) => {
        console.log(newPerson)
        setPersons(persons.map(person => person.id !== newPerson.id? person:newPerson ))
      })
      .catch(error => {
        console.log(error)
        console.log(typeof(error))
        console.log(error === "TypeError: Cannot read properties of null (reading 'id')")
        console.log(error.response)
        if (error.hasOwnProperty("response")) {
        setMessage(
          `${error.response.data.error}`
        ) } else {
         setMessage(
          `${changedPerson.name} was already deleted`
         )
        }
        setType("error")
        setTimeout(() => {
          setMessage("")
        }, 5000)
        personService
       .deletePerson(changedPerson.id, changedPerson)
       .then(() => {
        setPersons(persons.filter(person => person.id !== changedPerson.id))
        })
        
      })

    }
   }
   
  }

  const deleteOnePerson= (id)=>{
    if (window.confirm("Do you wanna delete this person")) {
      const person = persons.find(p => p.id === id)
      const changedPerson = { ...person }
      personService
      .deletePerson(id, changedPerson).then(() => {
        setPersons(persons.filter(person => person.id !== id ))
      })
    }
  }
  return (
    <div>
      {console.log(persons)}
      <h2>Phonebook</h2>
      <Notification  type={type} message={Message} />
      <form>
      <div>filter shown with : <input onChange={(e)=>{setToFilter(e.target.value)}} /></div>
      </form>
      <form>
        <h3>Add new number</h3>
        <div>
          <div>name: <input onChange={(e)=>{setNewName(e.target.value)}} /></div>
          <div>number: <input onChange={(e)=>{setNewNumber(e.target.value)}} /></div>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {toFilter===""? persons.map((person)=>{return(<li key={person.name}>{person.name} {person.number} <button onClick={()=>deleteOnePerson(person.id)}> delete </button></li>)}): persons.filter((elem)=>{console.log(elem.name.toLowerCase()); return(elem.name.toLowerCase().includes(toFilter))}).map((person)=>{return(<li key={person.name}>{person.name} {person.number} <button onClick={()=>deleteOnePerson(person.id)}>delete</button></li>)})}
      </ul>
    </div>
  )
}

export default App