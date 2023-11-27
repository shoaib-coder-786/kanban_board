import React from 'react'
import "./Layout.css"
import { Cancel, CheckCircle, ManageHistory, MoreHoriz, PanoramaFishEye, PriorityHigh, SignalCellular2Bar, SignalCellular3Bar, SignalCellularAlt, SignalCellularAlt1Bar, SignalCellularAlt2Bar, Tonality } from '@mui/icons-material'
const Layout = ({data}) => {
  const icons={
    Backlog:<ManageHistory className='backlog'/>,
    Todo:<PanoramaFishEye className='todo'/>,
    "In progress":<Tonality className='inProgress'/>,
    Done:<CheckCircle className='done'/>,
    Canceled:<Cancel className='cancel'/>,
    'No priority':<MoreHoriz className='noPriority'/>,
    'Urgent':<PriorityHigh className='urgent'/>,
    'High':<SignalCellularAlt className='High'/>,
    'Medium':<SignalCellularAlt2Bar className='todo'/>,
    'Low':<SignalCellularAlt1Bar className='todo'/>,
    
  }
  return <>
  <div className="layoutContainer">
    <div className="layout_wrapper">
        <div className="layout_details">
            <div className="icon_container">
            {
              icons[data?.name]?icons[data.name]:<div className="user_Icon">
              <div className="user_name">{data?.name.substring(0,2)}</div>
              <div className="status"></div>
            </div>
            }
            
            </div>
            <div className="layout_title">{data?.name}</div>
            <div className="layout_data_len">{data?.data.length}</div>
        </div>
        <div className="layout_options">
            <MoreHoriz className='layout_icon'/>
        </div>
    </div>
  </div>
  </>
}

export default Layout