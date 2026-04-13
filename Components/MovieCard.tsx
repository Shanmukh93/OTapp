import { Link } from 'expo-router'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { addMovie, removeMovie } from '@/store/slices/savedMoviesSlice';
import { RootState } from '@/store/store';
 
import { useDispatch, useSelector } from 'react-redux';
import { icons } from '@/constants/icons';

 

const MovieCard = ({id,poster_path,title,vote_average, release_date}) => {

  const dispatch = useDispatch();
 
  const savedMovies = useSelector((state: RootState) => state.savedMovies.movies);
 
  const isSaved = savedMovies.some(m => m.id === id);
 
  const handleSave = () => {
    if (isSaved) {
      dispatch(removeMovie(id));
    } else {
      dispatch(addMovie({ id, title, poster_path }));
    }
  };
  return (
    <Link href={`/movies/${id}`} asChild>
        <TouchableOpacity className='w-[30%]'>
            <Image source={{uri:`https://image.tmdb.org/t/p/w500${poster_path}`}} className='w-full h-48 rounded-lg mb-2' resizeMode='cover'/>
            <Text className='text-white text-sm font-semibold'>{title}</Text>
            <TouchableOpacity
          onPress={handleSave}
          className="absolute top-2 right-2 bg-black/70 rounded-full p-2"
        >
          <Image
            source={isSaved?icons.filled:icons.save}
            className="w-5 h-5"
            resizeMode="contain"
            style={{
              tintColor: '#ffffff', // 🔥 toggle color
            }}
          />
        </TouchableOpacity>
            <View className='flex-row items-center justify-between mt-1'>
              <Text className='text-white text-xs'>{vote_average.toFixed(1)}</Text>
              <Text className='text-white text-xs'>{release_date}</Text>
            </View>
        </TouchableOpacity>
    </Link>
  )
}

export default MovieCard