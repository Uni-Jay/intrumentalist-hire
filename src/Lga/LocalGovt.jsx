import React from 'react'


function Local() {
  return (
    <div className='flex flex-col my-2 justify-start items-start gap-4'>
    {data3.map((item, i) => (
      <div className='' key={i}>
        <label className='text-blue-950 font-bold text-md md:text-lg'>{item.label}</label>
        <input className='w-full border-2 border-solid border-gray-400 rounded-lg pl-4' type={item.type} placeholder={item.placeholder} 
        name={item.inputname} onChange={item.handleChange}/>
        {item.error && <p className='my-2 md:my-4 text-sm text-red-400'>{item.error}</p>}
      </div>
    ))}
  </div>
  )
}

export default Local