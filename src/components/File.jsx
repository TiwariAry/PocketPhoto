import React from 'react'

const File = () => {
    // TODO: Make the drag and drop, as well as uploading and storing image

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 p-5 px-5 m-5 gap-5 justify-items-center">
            <div className="flex items-center justify-center bg-gray-200 rounded-3xl h-[300px] lg:h-[400px] max-w-3/4 lg:max-w-full">
                <div className="w-full h-full p-4">
                    <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-500 hover:bg-gray-100 cursor-pointer w-full h-full rounded-3xl">
                        <img
                            src={'../../public/image-gallery.png'}
                            alt="upload"
                            className="w-[60px]"
                        />
                        <p className="text-center px-4">
                            Upload your image here or drag and drop your image
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4 text-xl items-center justify-center">
                {/* TODO: Look at some designs and color your buttons properly */}
                <button className="w-40 bg-gradient-to-r from-yellow-300 to-pink-400 py-2 px-6 rounded-xl cursor-pointer hover:opacity-90 transition-opacity active:scale-95">
                    Clear
                </button>
                <button className="w-40 bg-gradient-to-r from-yellow-300 to-pink-400 py-2 px-6 rounded-xl cursor-pointer hover:opacity-90 transition-opacity active:scale-95">
                    Convert
                </button>
            </div>

            {/* Right Section */}
            <div className="flex items-center justify-center h-[300px] lg:h-[400px] bg-gray-300 max-w-3/4 lg:max-w-full">
                {/* TODO: Display the uploaded image */}
            </div>
        </div>
    )
}

export default File