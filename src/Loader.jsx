import { Html, useProgress } from "@react-three/drei";

export default function Loader()
{
    const { active, progress, errors, item, loaded, total } = useProgress()

    return <div className="loader">
        test
        {/* <mesh>
            <boxGeometry />
            <meshBasicMaterial wireframe />
        </mesh>
        <Html center>
            { progress } % loaded
        </Html> */}
    </div>
}