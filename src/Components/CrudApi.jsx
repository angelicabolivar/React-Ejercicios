import React, { useState } from 'react';
import { useEffect } from 'react';
import CrudForm from '../CrudForm';
import { helpHttp } from '../helpers/helpHttp';
import { CrudTable } from './CrudTable';
import { Loader } from './Loader';
import { Message } from './Message';

const CrudApi = () => {
  const[db,setDb] = useState(null);
  const[dataToEdit,setDataToEdit] = useState(null);
  const[error, setError] = useState(null);
  const[loading, setLoading] = useState(false);

  let api = helpHttp();
  let url = "http://localhost:5000/santos";

  useEffect(()=>{
    setLoading(true);
    api.get(url).then((res)=>{
      console.log(res)
      if(!res.err){
        setDb(res);
        setError(null);
      }else{
        setDb(null);
        setError(res);
      }

      setLoading(false);
    });
  },[]);


  const createData =(data) =>{
  
    data.id= Date.now();
    // console.log(data);

    let options = {
      body:data, 
      headers: {"content-type":"aplication/json"}
    }

    api.post(url, options).then((resp)=>{
      console.log(resp);
      if(!resp.err){
        setDb([...db, data]);
      }else{
        setError(resp);
      }
    })
  
  };

  const updateData =(data) =>{
    let endPoint = `${url}/${data.id}`;

    let options = {
      body:data, 
      headers: {"content-type":"aplication/json"}
    }

    api.put(endPoint, options).then((resp)=>{
      console.log(resp);
      if(!resp.err){
        let newData = db.map(el => el.id === data.id ? data : el);
        setDb(newData);
      }else{
        setError(resp);
      }
    })

  };

  const deleteData =(id) =>{
    let isDelete = window.confirm(`¿Estas seguro de eliminar el registro con el id ${id}`);

    if(isDelete){
      let endPoint = `${url}/${id}`;
      let options = { 
        headers: {"content-type":"aplication/json"}
      };
      api.del(endPoint, options).then((resp) =>{
        if(!resp.err){
          let newData = db.filter(el => el.id !== id);
          setDb(newData);
          
        }else{
          setError(resp);
        };
      })
    }else{
      return;
    }
  };

  return (
    <div>
      <h2>CRUD Api</h2>
      <article className="grid-1-2">
        <CrudForm 
        createData={createData} 
        updateData={updateData} 
        dataToEdit={dataToEdit} 
        setDataToEdit={setDataToEdit}
        />
        {loading && <Loader/>}
        {error && <Message msg={`Error ${error.status}: ${error.statusText}`} bgColor='#dc3545'/>}
        {db && <CrudTable 
        data={db} 
        setDataToEdit={setDataToEdit} 
        deleteData={deleteData}
        />}

      </article>
    </div>
  )
}

export default CrudApi