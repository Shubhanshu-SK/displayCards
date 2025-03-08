import { useState } from 'react'
import './App.css'
import { useEffect, useRef } from 'react'
import Navbar from './Navbar.jsx'


function App() {

  const [cards, setcards] = useState([])

  const fetchData = async () => {
    let a = await fetch("https://jsonplaceholder.typicode.com/posts")
    let data = await a.json()

    setcards(data)


  }

  useEffect(() => {
    fetchData()
  }, [])

  const Car = (card) => {
    return (<>

      <div key={card.id} className='card'>
        <div>
          <h2>{card.title}</h2>
        </div>
        <p>{card.body}</p>

        <span>By UserId: {card.userId}</span>
      </div>

    </>)

  }

  const listRef = useRef(null);
  const divIndex = useRef(1)
  const lastScrollDivIndex = useRef(0)

  // useEffect(() => {
  //   lastIndex()
  //   lastScrollDivIndex.current = lastScrollDivIndex.current / 4
  // }, [listRef])

  const containerRef = useRef(null)


  function scrollToIndexDiv(index, tags = "div", ref = listRef) {
    const listNode = ref.current;
    // This line assumes a particular DOM structure:
    const blockNode = listNode.querySelectorAll(`${tags}`)[index];

    blockNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });



    console.log(lastScrollDivIndex.current)
    console.log(divIndex)
  }

  // function lastIndex() {
  //   listRef.current.querySelectorAll(`card`).forEach(e => {

  //     lastScrollDivIndex.current = lastScrollDivIndex.current + 0.5
  //   })


  // }


  return (
    <>
      <div className='bgImage'>
      </div>

        <header>
          <nav className="nav">
            <button onClick={() => scrollToIndexDiv(0, '.container', containerRef)}>
              slot1
            </button>
            <button onClick={() => scrollToIndexDiv(1, '.container', containerRef)}>
              slot2
            </button>
            <button onClick={() => scrollToIndexDiv(2, '.container', containerRef)}>
              slot3
            </button>
            <button onClick={() => scrollToIndexDiv(3, '.container', containerRef)}>
              slot4
            </button>
          </nav>
        </header>

        <Navbar />


        <div ref={containerRef} className='contContainers '>


          <div className='container contSideScroll'>

            <button onClick={() => { scrollToIndexDiv(divIndex.current > 0 ? divIndex.current = divIndex.current - 1 : divIndex.current = 0, '.card') }} className='previousBtn'>
              {'<<'}
            </button>

            <button onClick={() => scrollToIndexDiv(divIndex.current < lastScrollDivIndex.current / 4 - 1 ? divIndex.current = divIndex.current + 1 : divIndex.current = 0, '.card')} className='nextBtn'>
              {'>>'}
            </button>

            <div ref={listRef} className="sideScroll">

              {cards.map((card) => {
                if (card.userId == 1) {
                  lastScrollDivIndex.current = lastScrollDivIndex.current + 1
                  return <Car key={card.id} title={card.title} body={card.body} userId={card.userId} />
                  // return <Car key={card.id} card = {card}/>
                } else {
                  return null
                }

              })

              }

            </div>
          </div>


          <div className="container">

            {cards.map((card) => {
              if (card.userId == 2) {
                return <Car key={card.id} title={card.title} body={card.body} userId={card.userId} />
              } else {
                return null
              }
              // return <Car card = {card}/>
            })}
          </div>
          <div className="container">

            {cards.map((card) => {
              if (card.userId == 3) {
                return <Car key={card.id} title={card.title} body={card.body} userId={card.userId} />
              } else {
                return null
              }
              // return <Car card = {card}/>
            })}
          </div>


          <div className="container">

            {cards.map((card) => {

              return <Car key={card.id} title={card.title} body={card.body} userId={card.userId} />

              // return <Car card = {card}/>
            })}
          </div>

        </div>
     
    </>
  )
}

export default App
