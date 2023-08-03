import { create } from 'zustand'

export default create((set) =>
{
    return {
        ready: false,
        setReady: (value) =>
        {
            set(() =>
            {
                return { ready: value }
            })
        },

        envMapIntensity: 0.8,
        setEnvMapIntensity: (value) =>
        {
            set(() =>
            {
                return { envMapIntensity: value }
            })
        },

        exploded: false,
        toggleExploded: () =>
        {
            set((state) =>
            {
                return { exploded: !state.exploded }
            })
        },

        wireframe: false,
        setWireframe: (value) =>
        {
            set(() =>
            {
                return { wireframe: value }
            })
        },
    }
})