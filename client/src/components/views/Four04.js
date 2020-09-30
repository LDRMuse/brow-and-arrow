import React from 'react'

import { Link } from 'react-router-dom'

export const Four04 = () => {
  return (
    <section className='container has-text-centered'>
      <h2 className='mt-6 title is-1'>404</h2>
      <figure className="image container is-128x128 ">
        <img className="is-rounded" alt="confused404" src="https://png.pngtree.com/png-vector/20190319/ourlarge/pngtree-vector-confused-emoji-icon-png-image_845580.jpg" />
      </figure>
      <p className='subtitle is-3 has-text-danger'>Oops, this page does not exist.</p>
      <p className='subtitle is-2'><Link to='/'>Go back to Homepage</Link></p>
    </section>
  )
}
