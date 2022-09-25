import Part from "./Part"
const Content= ({parts}) => {
   
   console.log(parts)
    return (
        <>
      {parts.map((elem,index)=>(<Part part={elem} key={index}/>))}
      </>
      
    )
      
    }

    export default  Content