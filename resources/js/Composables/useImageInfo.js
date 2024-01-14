

export function imageInfo(imageWithPath) {

    const newImg = new Image();
        newImg.src = imageWithPath;
        console.log("Image: " + imageWithPath);
        newImg.onload = function () {
        console.log((this.newImg.naturalWidth + ' by ' + this.newImg.naturalHeight));
    }
        // returning an object
    return {
        nHeight: newImg.naturalHeight,
        nWidth: newImg.naturalWidth,
        nAspect: newImg.naturalWidth / newImg.naturalHeight,
        nPortrait: (newImg.naturalWidth > newImg.naturalHeight) ? false : true,
    };


}
