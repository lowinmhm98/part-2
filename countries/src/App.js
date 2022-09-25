import { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from "./Weather.js"

const App = () => {
  const [countries, setCountries] = useState([
    
  ]) 
  const [show, setShow]= useState(Array(10).fill(0))
  console.log("i'm in")

  useEffect(()=>{
    axios
    .get('https://restcountries.com/v3.1/all').then(response => {
      console.log('promise fulfilled')
      
      setCountries(response.data)
      
      console.log(response.data)
    })
      

  },[])
  const showView =(id)=> {
     const copy =[...show];
     console.log(copy)
     copy[id] =1;
     console.log(copy)
     console.log(id)
     setShow(copy)
     
  }

  const [toFilter,setToFilter]= useState("")
  let resultfilter ="";
if (toFilter==="") {
resultfilter =null
} else{
if ((countries.filter((elem)=>{return(elem.name.official.toLowerCase().includes(toFilter))})).length ===1){ 
    resultfilter=countries.filter((elem)=>{ return(elem.name.official.toLowerCase().includes(toFilter))}).map((country,index)=>{ return(<div key={country.name.common}><h3>{country.name.common}</h3><p>Capital {country.capital[0]}</p><p>Area {country.area}</p><h4>Languages</h4><ul>{Object.keys(country.languages).map((el)=>{return(<li key={country.languages[el]}>{country.languages[el]}</li>)})}</ul><img src={country.flags.png}/></div>)})
    console.log(resultfilter);
}  else if ((countries.filter((elem)=>{return(elem.name.official.toLowerCase().includes(toFilter))})).length<=10) {
  resultfilter=countries.filter((elem,index)=>{ return(elem.name.official.toLowerCase().includes(toFilter))})
  resultfilter= resultfilter.map((country,index)=>{ 
    console.log(show[index])
     if (show[index]===0) {
      return(
        <div key={country.name.common}>{country.name.common}<button onClick={()=>{showView(index)}}>Show view</button> </div>
        )
     } else {
       return(<div key={country.name.common}><h3>{country.name.common}</h3><p>Capital {country.capital[0]}</p><p>Area {country.area}</p><h4>Languages</h4><ul>{Object.keys(country.languages).map((el)=>{return(<li key={country.languages[el]}>{country.languages[el]}</li>)})}</ul><img src={country.flags.png}/><Weather capital={country.capital} lon={country.latlng[1]} lat={country.latlng[0]}/></div> )
     }
    }
  )
}
 
}
  
  return (
    <div>
      <h2>Countries</h2>
      <form>
      <div>filter shown with :</div> <input onChange={(e)=>{setShow(Array(10).fill(0));setToFilter(e.target.value)}} />
      </form>
     
       {resultfilter}
     
    </div>
  )
}

export default App