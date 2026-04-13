import { RootState } from '@/store/store';
import { FlatList, Image, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
 
const Saved = () => {
  const savedMovies = useSelector(
    (state: RootState) => state.savedMovies.movies
  );
 
  return (
    <View className="flex-1 bg-primary p-5">
      <Text className="text-white text-xl font-bold mb-5">
        Saved Movies
      </Text>
 
      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
        renderItem={({ item }) => (
          <View className="w-[30%]">
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              className="w-full h-40 rounded-lg"
            />
            <Text className="text-white text-xs mt-1">
              {item.title}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-gray-400 text-center mt-10">
            No saved movies yet
          </Text>
        }
      />
    </View>
  );
};
 
export default Saved;