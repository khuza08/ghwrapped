import { toPng, toJpeg, toBlob } from 'html-to-image';

interface ImageOptions {
  pixelRatio?: number;
  backgroundColor?: string;
}

/**
 * Converts an HTML element to a PNG image
 * @param element The HTML element to convert
 * @param options Optional configuration for the image
 * @returns Promise resolving to the PNG data URL
 */
export const convertToPng = async (
  element: HTMLElement,
  options: ImageOptions = {}
): Promise<string> => {
  try {
    const dataUrl = await toPng(element, {
      pixelRatio: options.pixelRatio || 3,
      backgroundColor: options.backgroundColor || '#111827', // Tailwind's gray-900
      cacheBust: true,
    });
    return dataUrl;
  } catch (error) {
    console.error('Error converting element to PNG:', error);
    throw error;
  }
};

/**
 * Converts an HTML element to a JPEG image
 * @param element The HTML element to convert
 * @param options Optional configuration for the image
 * @returns Promise resolving to the JPEG data URL
 */
export const convertToJpeg = async (
  element: HTMLElement,
  options: ImageOptions = {}
): Promise<string> => {
  try {
    const dataUrl = await toJpeg(element, {
      pixelRatio: options.pixelRatio || 3,
      backgroundColor: options.backgroundColor || '#111827', // Tailwind's gray-900
      quality: 0.95,
    });
    return dataUrl;
  } catch (error) {
    console.error('Error converting element to JPEG:', error);
    throw error;
  }
};

/**
 * Downloads an image from a data URL
 * @param dataUrl The data URL of the image to download
 * @param filename The name to save the file as
 */
export const downloadImage = (dataUrl: string, filename: string): void => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Converts an HTML element to a PNG and automatically downloads it
 * @param element The HTML element to convert
 * @param filename The name to save the file as (without extension)
 * @param options Optional configuration for the image
 */
export const downloadPng = async (
  element: HTMLElement,
  filename: string = 'github-wrapped',
  options: ImageOptions = {}
): Promise<void> => {
  try {
    const dataUrl = await convertToPng(element, options);
    downloadImage(dataUrl, `${filename}.png`);
  } catch (error) {
    console.error('Error downloading PNG:', error);
    throw error;
  }
};

/**
 * Converts an HTML element to a JPEG and automatically downloads it
 * @param element The HTML element to convert
 * @param filename The name to save the file as (without extension)
 * @param options Optional configuration for the image
 */
export const downloadJpeg = async (
  element: HTMLElement,
  filename: string = 'github-wrapped',
  options: ImageOptions = {}
): Promise<void> => {
  try {
    const dataUrl = await convertToJpeg(element, options);
    downloadImage(dataUrl, `${filename}.jpg`);
  } catch (error) {
    console.error('Error downloading JPEG:', error);
    throw error;
  }
};

/**
 * Converts an HTML element to a Blob
 * @param element The HTML element to convert
 * @param options Optional configuration for the image
 * @returns Promise resolving to the Blob
 */
export const convertToBlob = async (
  element: HTMLElement,
  options: ImageOptions = {}
): Promise<Blob> => {
  try {
    const blob = await toBlob(element, {
      pixelRatio: options.pixelRatio || 3,
      backgroundColor: options.backgroundColor || '#111827', // Tailwind's gray-900
    });
    return blob;
  } catch (error) {
    console.error('Error converting element to Blob:', error);
    throw error;
  }
};