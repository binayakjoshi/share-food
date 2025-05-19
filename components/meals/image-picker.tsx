"use client";
import { useRef, useState, ChangeEvent } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

type ImagePickerProps = {
  label: string;
  name: string;
};
const ImagePicker = (props: ImagePickerProps) => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const handleInput = () => {
    imageInput.current?.click();
  };
  const handleImagePreview = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files ? event.target.files[0] : null;
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => setPickedImage(fileReader.result as string);
    fileReader.readAsDataURL(file);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image picked yet</p>}
          {pickedImage && (
            <Image src={pickedImage} alt="selected image by user" fill />
          )}
        </div>
      </div>
      <input
        type="file"
        id={props.name}
        accept="image/png, image/jpeg"
        name={props.name}
        className={classes.input}
        ref={imageInput}
        onChange={handleImagePreview}
      />
      <button className={classes.button} type="button" onClick={handleInput}>
        Pick an Image
      </button>
    </div>
  );
};
export default ImagePicker;
