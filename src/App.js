import "./App.css"
import React, { useEffect, useState } from 'react';

function App() {


  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getData());
  const [itemEdit, setItemEdit] = useState("");
  const [toggleIcon, setToggleIcon]= useState(false);

function getData()
{
const list = localStorage.getItem("mytasks");

if(list)
{
return JSON.parse(list);
}
else
{
return [];

}
}

 // console.log(inputData);

  function addItems() {
    if (!inputData) {
      alert("Please enter some data");
    }
    else if(inputData && toggleIcon)
    {
      setItems(
        items.map((curElem)=>{
          if(curElem.id === itemEdit)
          {
            return{...curElem, name:inputData}
          }
          else
          {
            return curElem;
          }
        })
      )
      setInputData("");
      setToggleIcon(false);
    }
    else {
      const newData={
        id : new Date().getTime().toString(),
        name : inputData
      }
      setItems([...items, newData])// amar
      setInputData("");
    }

  }
  function deleteAll() {
    setItems([]);

  }
  function deleteItem(index)
  {

   const updatedList = items.filter((curElem)=>{
      return curElem.id !== index
    })
    setItems(updatedList);
  }

  function editItem(index) 
  {
    const editedItems = items.find((curElem)=>{
      return curElem.id===index

    })
      setInputData(editedItems.name);
      setItemEdit(index);
      setToggleIcon(true);
  }

  useEffect(()=>{

    localStorage.setItem("mytasks",JSON.stringify(items));
},[items])
  return (
    <>
      <div className="container">
        <div className='row'>
          <div className="col-md-4 offset-md-4">

            <h1> To Do List </h1>
            <input type="text" size="50" value={inputData} placeholder="Task" onChange={(e) => setInputData(e.target.value)} />
           {

            toggleIcon ? <i style={{position:"relative",left:"390px", top:"-25px"}} className='fa fa-edit' onClick={addItems}> </i>
            :
            <i id="additem" className='fa fa-plus' onClick={addItems}> </i>
           }
            

            <div className="list-items">
              <ul>

                {
                  items.map((curElem, index) => {

                    return (
                      
                      <li key={index}> {curElem.name} <div className="icon"> <i className="fa fa-edit" onClick={()=>editItem(curElem.id)}>   </i>   <i className="fa fa-trash" onClick={()=>deleteItem(curElem.id)}></i></div></li>
                      
                    )
                  })


                }


              </ul><br />
              <button onClick={deleteAll} className="btn btn-danger btn-sm"> Delete All</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
