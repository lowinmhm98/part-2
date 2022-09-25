const Total = ({ parts }) => {
let sum =0;
const total = parts.reduce((s, p) => {
    console.log('what is happening', s, p)
    return s+p.exercises
  },0)


return (<p>Number of exercises {total}</p>)
}

export default Total