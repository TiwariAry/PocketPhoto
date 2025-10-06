import React, {useEffect, useRef, useState} from 'react'

const File = () => {
    // TODO: Look for more designs

    const fileInputRef = useRef(null);

    const [image, setImage] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [isUpload, setIsUpload] = useState(true);

    const [compressionQuality, setCompressionQuality] = useState(80);
    const [compressedImage, setCompressedImage] = useState(null);

    const [originalSize, setOriginalSize] = useState(0);
    const [compressedSize, setCompressedSize] = useState(0);

    useEffect(() => {
        if (image) {
            compressImage(image, compressionQuality);
        }
    }, [image, compressedImage])

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    const compressImage = (image, compressionQuality) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                canvas.toBlob((blob) => {
                        const compressedUrl = URL.createObjectURL(blob);

                        if (compressedImage) {
                            URL.revokeObjectURL(compressedImage);
                        }

                        setCompressedImage(compressedUrl);
                        setCompressedSize(blob.size)
                    },
                    'image/jpeg',
                    compressionQuality / 100
                )
            }
            img.src = e.target.result;
        }
        reader.readAsDataURL(image);
    }

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
            setOriginalSize(newImage.size);
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
            setOriginalSize(droppedImage.size);
            setPreviewURL(URL.createObjectURL(droppedImage));
            setIsUpload(false);
        }
    }

    const handleDownload = () => {
        if (compressedImage) {
            const link = document.createElement('a');
            link.href = compressedImage;
            link.download = `compressed-PocketPhoto-${compressionQuality}.jpg`;
            link.click();
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 p-5 px-5 m-5 gap-5 justify-items-center">
            {/* File upload */}
            {isUpload ? (
                <div
                    className="flex items-center justify-center bg-gray-200 rounded-3xl h-[300px] lg:h-[400px] max-w-md lg:max-w-full">
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
                                src={'/image-gallery.png'}
                                alt="upload"
                                className="w-[60px]"
                            />
                            <p className="text-center px-4">
                                Drag and drop your image here <span className={"underline"}>or</span> select an image
                                from your device
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={"flex flex-col gap-6 items-center justify-center bg-gray-200 rounded-3xl h-[300px] lg:h-[400px] max-w-md lg:max-w-full p-5"}>
                    <img
                        src={previewURL}
                        alt={"uploaded image"}
                        className={"max-w-full max-h-full object-contain rounded-2xl"}
                    />
                    <p className="text-sm text-gray-600 font-medium">
                        Original: {formatFileSize(originalSize)}
                    </p>
                </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-4 text-xl items-center justify-center">
                <button
                    onClick={() => {
                        if (previewURL) {
                            URL.revokeObjectURL(previewURL);
                        }
                        if (compressedImage) {
                            URL.revokeObjectURL(compressedImage);
                        }
                        setImage(null);
                        setPreviewURL(null);
                        setCompressedImage(null);
                        setIsUpload(true);
                    }}
                    className="w-40 bg-gradient-to-r from-yellow-300 to-pink-400 py-2 px-6 rounded-xl cursor-pointer hover:opacity-90 transition-opacity active:scale-95"
                >
                    Clear
                </button>

                <button
                    onClick={handleDownload}
                    className="w-40 bg-gradient-to-r from-yellow-300 to-pink-400 py-2 px-6 rounded-xl cursor-pointer hover:opacity-90 transition-opacity active:scale-95"
                >
                    Download
                </button>

                {/* Slidebar */}
                <div className="w-full">
                    <label className="block text-center text-sm font-medium text-gray-700 mb-2">
                        Compression Quality: {compressionQuality}%
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="100"
                        value={compressionQuality}
                        onChange={(e) => setCompressionQuality(Number(e.target.value))}
                        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-pink-400"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>More</span>
                        <span>Less</span>
                    </div>
                </div>
            </div>

            {/* Compressed image section */}
            <div
                className="flex flex-col gap-6 items-center justify-center h-[300px] lg:h-[400px] bg-gray-200 rounded-3xl max-w-md lg:max-w-full p-5">
                {compressedImage ? (
                    <>
                        <img
                            src={compressedImage}
                            alt={"compressed image"}
                            className={"max-w-full max-h-full object-contain rounded-2xl"}
                        />
                        <p className="text-sm text-gray-700 font-medium">
                            Compressed: {formatFileSize(compressedSize)}
                            {originalSize > 0 && (
                                <span className="text-green-600 ml-2">
                                    ({Math.round((1 - compressedSize / originalSize) * 100)}% smaller)
                                </span>
                            )}
                        </p>
                    </>
                ) : (
                    <p className={"text-gray-600"}>Compressed image will appear here</p>
                )}
            </div>
        </div>
    )
}

export default File