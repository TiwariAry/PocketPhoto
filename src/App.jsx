import File from './components/File.jsx'

const App = () => {
    return (
        <main className={"exo-2"}>
            <h1 className={"text-3xl lg:text-5xl w-full text-center font-semibold p-4"}>
                Pocket Photo
                <span className={"bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text inline-block"}>
                    &nbsp;Lite
                </span>
            </h1>

            <p className={"text-sm lg:text-md text-center p-3"}>Compress your photos for free!</p>

            <File/>
        </main>
    )
}
export default App
