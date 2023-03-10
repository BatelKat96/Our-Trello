import React from 'react'

import { Link } from 'react-router-dom'
import { HomePageFooter } from '../cmps/home-page/home-page-footer'

export function HomePage() {

    return (
        <>
            <section className="home-page">

                <div className="bg-gradient-hero">

                    <section className="hero-secrion">

                        <div className="text">
                            <h1>Merllo brings all your tasks, teammates, and tools together</h1>

                            <p>Keep everything in the same place—even if your team isn't.</p>

                            <Link to="/workspace">
                                <button className="start-demo-btn">Start now</button>
                            </Link>
                        </div>

                        <div className="img">
                            <img className="hero-img" src="https://images.ctfassets.net/rz1oowkt5gyp/75rDABL8fyMtNLlUAtBxrg/c5e145977a86c41c47e17c69410c64f7/TrelloUICollage_4x.png?w=2280&fm=webp" alt="trello-hero" />
                        </div>

                    </section>


                    <svg className="shape-divider" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill" fill="white"></path>
                    </svg>
                </div>

                <div className="bg-gradient-101">

                    <section className="merllo-101">

                        <div className="prod-div">

                            <h5>Merllo 101</h5>

                            <h2>A productivity powerhouse</h2>

                            <p>Simple, flexible, and powerful. All it takes are boards, lists, and cards to get a clear view of who's doing what and what needs to get done. Learn more in our guide for getting started.</p>
                        </div>

                        <div className="prod-cards-div">

                            <button className="cards-btn card-boards" >
                                <h5>Boards</h5>
                                <p>Merllo boards keep tasks organized and work moving forward. ln a glance, see everything from "things to do" to "aww yeah, we did it!"</p>
                                <div></div>
                            </button>


                            <button className="cards-btn card-lists">
                                <h5>Lists</h5>
                                <p>The different stages of a task. Start as simple as To Do, Doing or Done-or build a workflow custom fit to your team's needs. There's no wrong way to Merllo. </p>
                                <div></div>
                            </button>


                            <button className="cards-btn card-cards">
                                <h5>Cards</h5>
                                <p>Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.</p>
                                <div></div>
                            </button>

                        </div>
                    </section>
                </div>

        <HomePageFooter />
    </section >
        </>
    )

}