import { create } from 'zustand'
import useStore from './useStore.js'

export default create((set) =>
{
    return {
        envMapIntensity: 0.8,
        setEnvMapIntensity: (value) =>
        {
            set(() =>
            {
                return { envMapIntensity: value }
            })
        }
    }
})