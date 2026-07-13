import { CarFilters } from '@/ui/CarFilters'
import React from 'react'

const Search = () => {
  return (
    <div className='w-10/12 mx-auto'>
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-4 md:pt-20 md:pb-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-4">
          Search Your Ride
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Find the perfect vehicle for your next journey. Filter by brand, type, budget, and more to catch your ideal match.
        </p>
      </section>
      <CarFilters/>
    </div>
  )
}

export default Search