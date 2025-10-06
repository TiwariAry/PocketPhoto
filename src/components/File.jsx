import React, {useRef, useState} from 'react'

const File = () => {
    const fileInputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [isUpload, setIsUpload] = useState(true);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = () => {
        const newImage = fileInputRef.current.files[0];

        if (newImage) {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }

            setImage(newImage);
            setPreviewURL(URL.createObjectURL(newImage));
            setIsUpload(false);
        } else {
            console.log("An error occurred while uploading the file.")
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedImage = e.dataTransfer.files[0];

        if (droppedImage && droppedImage.type.startsWith('image/')) {
            if (previewURL) {
                URL.revokeObjectURL(previewURL);
            }

            setImage(droppedImage);
            setPreviewURL(URL.createObjectURL(droppedImage));
            setIsUpload(false);
        }
    }

    const handleConvert = () => {

    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 p-5 px-5 m-5 gap-5 justify-items-center">
            {/* File upload */}
            {isUpload ? (
                <div className="flex items-center justify-center bg-gray-200 rounded-3xl h-[300px] lg:h-[400px] max-w-md lg:max-w-full">
                    <div className="w-full h-full p-4">
                        <div
                            onClick={handleClick}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-gray-500 hover:bg-gray-100 cursor-pointer w-full h-full rounded-3xl"
                        >
                            <input
                                ref={fileInputRef}
                                type={"file"}
                                accept={"image/*"}
                                onChange={handleFileChange}
                                className={"hidden"}
                            />

                            <img
                                src={'../../public/image-gallery.png'}
                                alt="upload"
                                className="w-[60px]"
                            />
                            <p className="text-center px-4">
                                Drag and drop your image here <span className={"underline"}>or</span> select an image from your device
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={"flex items-center justify-center bg-gray-200 rounded-3xl h-[300px] lg:h-[400px] max-w-md lg:max-w-full p-5"}>
                    <img
                        src={previewURL}
                        alt={"uploaded image"}
                        className={"max-w-full max-h-full object-contain rounded-2xl"}
                    />
                </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-4 text-xl items-center justify-center">
                {/* TODO: Look at some designs and color your buttons properly */}
                <button
                    onClick={() => {
                        if (previewURL) {
                            URL.revokeObjectURL(previewURL);
                        }
                        setImage(null);
                        setPreviewURL(null);
                        setIsUpload(true);
                    }}
                    className="w-40 bg-gradient-to-r from-yellow-300 to-pink-400 py-2 px-6 rounded-xl cursor-pointer hover:opacity-90 transition-opacity active:scale-95"
                >
                    Clear
                </button>
                <button
                    onClick={handleConvert}
                    className="w-40 bg-gradient-to-r from-yellow-300 to-pink-400 py-2 px-6 rounded-xl cursor-pointer hover:opacity-90 transition-opacity active:scale-95"
                >
                    Convert
                </button>
            </div>

            {/* Compressed image section */}
            <div className="flex items-center justify-center h-[300px] lg:h-[400px] bg-gray-300 max-w-md lg:max-w-full">
                {/* TODO: Display the uploaded image */}
            </div>
        </div>
    )
}

export default File