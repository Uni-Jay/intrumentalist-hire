import React from 'react'
import { Link } from 'react-router-dom'


const Pro = ({ icon, display, path, color}) => {
  return (
    <div className="flex items-center gap-4 group">
      {icon}
      <Link to={path} className={`text-sm ${color}`}>{display}</Link>
    </div>
  )
}

export default Pro