import { useEffect, useState } from "react";

export function useLocalStorage<T>(key : string,InitialValue: T){
    const [value,setValue] = useState<T>(()  => {
        const local = localStorage.getItem(key)
        if(local !== null){
            return JSON.parse(local)
        }
        else{
            return InitialValue
        }
    })
    useEffect(() => {
        localStorage.setItem(key,JSON.stringify(value))
    },[key,value])
    return [value,setValue] as [typeof value,typeof setValue]
}