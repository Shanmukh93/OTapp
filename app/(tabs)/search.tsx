import MovieCard from "@/Components/MovieCard";
import SearchBar from "@/Components/SearchBar";
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
 
const search = () => {
  const[searchQuery, setSearchQuery] = useState('');
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,refetch: loadMovies,
    reset} = useFetch(()=>fetchMovies({
    query:searchQuery

  }),false);
   useEffect(()=>{
    const timeoutId=setTimeout(async () => {
    if(searchQuery.trim()){
      await loadMovies();
    }else{
      reset();
    }
  }
  ,500);
  return () => clearTimeout(timeoutId);
  },[searchQuery])
 
  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode='cover'/>
      <FlatList  
      data={movies}
      renderItem={({ item }) => <MovieCard {...item}/>}
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{
        justifyContent: 'center',
        gap: 16,
        marginVertical: 8,
      }}
      contentContainerStyle={{ paddingBottom: 100 }}
      ListHeaderComponent={
        <>
        <View className='w-full flex-row justify-center mt-20 items-center mb-5'>
          <Image source={icons.logo} className='w-12 h-10' />
        </View>
        <View className='my-5'>
            <SearchBar
              placeholder='search movies...'
              value={searchQuery}
              onChangeText={(text:string) => setSearchQuery(text)}
            />
        </View>
        {moviesLoading && (
          <ActivityIndicator size="large" color="#0000ff" className='mt-10 self-center' />
        )}
        {moviesError && (
          <Text className='text-red-500 text-center mt-10'>Error: {moviesError.message}</Text>
        )}
        {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
          <Text className='text-white text-lg font-semibold mb-3'>Search Results for {''}
            <Text className='text-accent'>{searchQuery}</Text>
          </Text>
        )}
        </>
      }
      ListEmptyComponent={
        !moviesLoading && !moviesError?(
          <View className='mt-10 px-5'>
            <Text className='text-white text-center mt-10'>{searchQuery.trim()?`No results found for '${searchQuery}'`:'Search for a movie...'}</Text>
          </View>
        ):(null)
      }
    />
    </View>
  )
}
 
export default search
