import React from 'react'

export const Result = ({data}) => {
  return (
    <div>
        <div className='result-text-container'>
            <span>{data.year !== '' ? data.year : '- -'}</span><p>years</p>
        </div>
        <div className='result-text-container'>
            <span>{data.month !== '' ? data.month : '- -'}</span><p>months</p>
        </div>
        <div className='result-text-container'>
            <span>{data.day !== '' ? data.day : '- -'}</span><p>days</p>
        </div>
    </div>
  )
}
