import { icons } from '@/constants/icons'
import React from 'react'
import { Image, TextInput, View } from 'react-native'

 
const SearchBar = ({placeholder, onPress,value,onChangeText}: {placeholder: string, onPress?: () => void, value: string, onChangeText: (text: string) => void}) => {
  return (  
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-5'>
      <Image source={icons.search} className='w-5 h-5 mr-2' resizeMode='contain' tintColor='#ab8bff'/>
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className='flex-1 ml-2 text-white'
        />
    </View>
  )
}
 
export default SearchBar
