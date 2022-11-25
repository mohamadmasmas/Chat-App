import { useEffect, useState } from 'react'

const PERFIX = 'Chat-APP-'
export const useLocalStorage = (key, initialValue) => {
  const prefixKey = PERFIX + key;
  const [ value, setValue ] = useState(() => {

    const jsonValue = localStorage.getItem(prefixKey);

    if(jsonValue !== null && jsonValue !== undefined){
        return JSON.parse(jsonValue)
    }
    if(typeof(initialValue) === 'function' ){
        return initialValue()
    }else{
        return initialValue
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixKey, JSON.stringify(value))
  }, [prefixKey , value]);

  return [value, setValue]
}
