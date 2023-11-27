import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Card from './Components/Card/Card'
import Layout from './Components/Layout/Layout'
import "./app.css"
import { useDispatch, useSelector } from "react-redux"
import { getData } from './Utilities/Api/fetch'
const App = () => {
  const { loading, error, data } = useSelector(state => state.assignmentData);
  const Dis = useDispatch()
  useEffect(() => {
    if (data.dataType == '' || data.dataType == null || data[data.dataType].length == 0) getData(Dis, data.dataType);
  }, [Dis]);
  return <>
    <Navbar />
    {
      loading ? <div class="linear-activity">
        <div class="indeterminate"></div>
      </div> : (error != "" && error != null) ? <div className="error">{error}</div> :
        <div className={`container ${data.dataType === "byUser" && " userExist"}`}>
          {
            data[data.dataType].map((item, index) => (
              item?.data.length > 0 && <div key={index} className="list_item">
                {
                  <>
                    <Layout data={item} />
                    {
                      item?.data.map((ticket, index) => (
                        <Card key={index} data={ticket} />
                      ))
                    }
                  </>
                }
              </div>
            ))
          }
        </div>
    }

  </>
}

export default App