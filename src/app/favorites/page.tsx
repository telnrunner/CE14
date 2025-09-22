import React from 'react'
import { fetchFavorites } from '../../../action/action'
import LandmarkList from '@/components/home/LandmarkList';

const FavoritesPage = async () => {
  const favorites = await fetchFavorites()
  console.log(favorites);
  
  return (
    <div>
      <LandmarkList landmarks={favorites}/>
    </div>
  )
}

export default FavoritesPage
