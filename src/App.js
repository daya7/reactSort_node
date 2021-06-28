import React, {useState, useEffect} from 'react';
import 'bootswatch/dist/cyborg/bootstrap.min.css';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

const SortableItem = SortableElement (({val})=>{
  return (
    <li className="list-group-item">
    <h1>{val.sorting}.{val.title}</h1>
    <p>{val.author}</p>
  </li>
  )
});
const SortableList = SortableContainer (({items})=>{
  return (
  <ul className="list-group">
  {
   items.map((val,i) => <SortableItem val= {val} key ={i} index= {i}/>)
  }
  </ul>)
});


function SortableComponent (){
  
const [books, setBooks] = useState([
  { title: "t 1", author: "a one" },
    { title: "t 2", author: "a two" },
    { title: "t 3", author: "a three" },
    { title: "t 4", author: "a four" },
    { title: "t 5", author: "a five" },
 ]);

const getData=async () =>{
  const res = await fetch('http://localhost:4000/books');
  const Tres= await res.json(); 
  Tres.sort((a,b)=> (a.sorting>b.sorting)?1: ((b.sorting> a.sorting)?-1 : 0));
  setBooks(Tres);
 }
useEffect(() => {
 
 getData();

},[]);
const onSortEnd = async ({oldIndex, newIndex})=>{

let booksCopy= [...books];
booksCopy = arrayMove(booksCopy,oldIndex,newIndex);
setBooks(booksCopy);
const bIds= booksCopy.map(b=>b._id);
const res= await fetch('http://localhost:4000/books',{
  method: 'PUT',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify(bIds)
})
const data= await res.json();
console.log(data);
getData();

}
return(
  <SortableList items={books} onSortEnd={onSortEnd}/>
)
}
function App() {
  return (
    <div className="container">
      <div className ="row">
        <div className="col-md-4 offset-md-4">
         <SortableComponent/>
        </div>
      </div>
    </div>
  );
}
export default App;