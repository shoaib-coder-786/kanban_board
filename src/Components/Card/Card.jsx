import React from 'react'
import "./Card.css"
const Card = ({data}) => {
  return <>
  <div className="card">
    <div className="card_header">
        <div className="user_name">{data?.id}</div>
        <div className="user_avatar">
            <div className="img_container">
                <div className="userimg defaultImg">{data?.username.substring(0,2)}</div>
            </div>
            <div className="user_status">.</div>
        </div>
    </div>
    <div className="card_body">
        <div className="card_icon">
            {/* <PanoramaFishEye className='card_icon'/> */}
        </div>
        <div className="card_des">
            {data?.title}
        </div>
    </div>
    <div className="card_footer">
        <div className="card_features">
            {data?.tag.map((item,index)=>(
            <div key={index} className="feature">
                <div className="feature_icon"></div>
                <div className="feature_name">{item}</div>
            </div>

            ))}
        </div>
    </div>

  </div>
  </>
}

export default Card