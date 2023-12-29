import React,{useEffect,useState} from 'react';
import './App.css';
import axios from 'axios';
import { FaStepForward,FaStepBackward } from "react-icons/fa";

function App() {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const sheetId=31835256;
  const recordsPerPage = 10;

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        if(!sheetId){
          console.error('No sheet id provided');
          return;
        }
        const res = await axios.get(`https://tigersheetbackend-sand.vercel.app/fetchrequest?page=${currentPage}`);
        setData(res.data.data);
        setLoading(false);
        console.log(res.data);
      } catch(err){
        console.error('Error fetching data: ',err.message);
        setLoading(false);
      }
    };
    fetchData();
  },[sheetId,currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <>
    <h1 className='heading'>Employee Data using Tigersheet API</h1>
    <div className='container'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th className='tableHeader'>Name</th>
              <th className='tableHeader'>Job Role</th>
              <th className='tableHeader'>Company Name</th>
              <th className='tableHeader'>Skill</th>
              <th className='tableHeader'>Remaining Casual Leaves</th>
              <th className='tableHeader'>Remaining Sick Leaves</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.record_id}>
                  <td className='tableCell'>{item.Name}</td>
                  <td className='tableCell'>{item.Job_Role}</td>
                  <td className='tableCell'>{item.Company_Name}</td>
                  <td className='tableCell'>{item.Skill}</td>
                  <td className='tableCell'>{item.Remaining_Casual_Leaves}</td>
                  <td className='tableCell'>{item.Remaining_Sick_Leaves}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
    <div className='pagination'>
      <button onClick={handlePrevPage} disabled={currentPage === 1} style={{margin:5}}>
        <FaStepBackward />
      </button>
      <span>Page {currentPage}</span>
      <button onClick={handleNextPage} disabled={data.length < recordsPerPage} style={{margin:5}}> <FaStepForward /></button>
    </div>
  </>
  );
}


export default App;
