import { ImageResourceItemInfo } from 'jimu-for-builder';
/**
 * Compute the dimension of the crop area based on image size and aspect ratio
 * @param {number} imgWidth width of the src image in pixels
 * @param {number} imgHeight height of the src image in pixels
 * @param {number} aspect aspect ratio of the crop
 */
export declare function getCropSize(imgWidth: any, imgHeight: any, aspect: any): {
    width: number;
    height: any;
} | {
    width: any;
    height: number;
};
/**
 * Ensure a new image position stays in the crop area.
 * @param {{x: number, y number}} position new x/y position requested for the image
 * @param {{width: number, height: number}} imageSize width/height of the src image
 * @param {{width: number, height: number}} cropSize width/height of the crop area
 * @param {number} zoom zoom value
 * @returns {{x: number, y number}}
 */
export declare function restrictPosition(position: any, imageSize: any, cropSize: any, zoom: any): {
    x: number;
    y: number;
};
export declare function getDistanceBetweenPoints(pointA: any, pointB: any): number;
/**
 * Compute the output cropped area of the image in percentages and pixels.
 * x/y are the top-left coordinates on the src image
 * @param {{x: number, y number}} crop x/y position of the current center of the image
 * @param {{width: number, height: number, naturalWidth: number, naturelHeight: number}} imageSize width/height of the src image (default is size on the screen, natural is the original size)
 * @param {{width: number, height: number}} cropSize width/height of the crop area
 * @param {number} zoom zoom value
 */
export declare function computeCroppedArea(crop: any, imgSize: any, cropSize: any, zoom: any): {
    croppedAreaPercentages: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    croppedAreaPixels: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
};
/**
 * Return the point that is the center of point a and b
 * @param {{x: number, y: number}} a
 * @param {{x: number, y: number}} b
 */
export declare function getCenter(a: any, b: any): {
    x: number;
    y: number;
};
export declare function getCroppedImgBlobUrl(imageSrc: any, pixelCrop: any, originId?: string): Promise<ImageResourceItemInfo>;
