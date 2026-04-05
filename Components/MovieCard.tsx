import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id,poster_path,title,vote_average, release_date}) => {
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image source={{uri:`https://image.tmdb.org/t/p/w500${poster_path}`}} className='w-full h-48 rounded-lg mb-2' resizeMode='cover'/>
            <Text className='text-white text-sm font-semibold'>{title}</Text>
            <View className='flex-row items-center justify-between mt-1'>
              <Text className='text-white text-xs'>{vote_average.toFixed(1)}</Text>
              <Text className='text-white text-xs'>{release_date}</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard
