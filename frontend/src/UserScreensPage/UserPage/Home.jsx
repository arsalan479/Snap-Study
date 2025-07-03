import React from 'react'
import Navbar from '../../Components/WebComponents/Navbar'
import SideBar from '../../Components/WebComponents/SideBar'

const Home = () => {
  return (
  <div className="flex">
      <SideBar />
      <div className="flex-1 ml-60">
        <Navbar />
        <main className="bg-black text-white min-h-screen p-4 pt-16">
          <h1 className="text-4xl font-bold text-center mt-20">Sora</h1>
          <p className="text-center mt-10">Foundational Contributors</p>
          {/* Add more main content here */}
        </main>
      </div>
    </div>
)
}

export default Home