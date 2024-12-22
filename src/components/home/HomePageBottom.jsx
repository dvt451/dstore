import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePageBottom() {
  return (
    <div className='home-page-bottom'>
        <div className='home-page-bottom__container'>
            <div style={{backgroundImage: 'url(/img/other/item-1.jpeg)'}} className="home-page-bottom__column">
                <div className='home-page-bottom__block'>
                    <h3 className="home-page-bottom__title">Didn't find anything interesting?</h3>
                    <p className="home-page-bottom__text">Perhaps you will find something among our promotions!</p>
                    <div className='no-extend'><Link to={'/shop'} className="home-page-bottom__link">All Promotions</Link></div>
                </div>
            </div>
            <form style={{backgroundImage: 'url(/img/other/item-2.jpeg)'}} className="home-page-bottom__column">
                <div className='home-page-bottom__block'>
                    <h3 className="home-page-bottom__title">Didn't find anything interesting?</h3>
                    <input type="email" name="email" id="email" className='text-inputs' placeholder='Your E-mail' />
                    <div className='no-extend'><button onClick={(e)=>{
                        e.preventDefault()
                    }} className="button">Send</button></div>
                </div>
            </form>
        </div>
    </div>
  )
}
