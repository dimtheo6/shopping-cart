import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from "lucide-react";
import "./carousel.css";
import PropTypes from "prop-types";

Carousel.propTypes = {
  imageUrl: PropTypes.array,
};

export default function Carousel({ imageUrl }) {
  const [imageIndex, setImageIndex] = useState(0);

  const buttonStyles =
    "block absolute bottom-0 top-0 pointer p-5 stroke-white fill-black";

  const showNextImage = () => {
    if (imageIndex === imageUrl.length - 1) {
      return setImageIndex(0);
    }
    setImageIndex((prevImage) => prevImage + 1);
  };

  const showPrevImage = () => {
    if (imageIndex === 0) {
      return setImageIndex(imageUrl.length - 1);
    }
    setImageIndex((nextImage) => nextImage - 1);
  };

  const handleClick = (index) => {
    setImageIndex(index);
  };

  return (
    <section className="w-full h-full relative" aria-label="Image Slider">
      <div className="w-full h-full  flex overflow-hidden">
        {imageUrl.map((url) => (
          <img
            style={{ translate: `${-100 * imageIndex}%` }}
            key={url.id}
            src={url.image}
            className="w-full h-full object-cover flex-shrink-0 flex-grow-0 "
          />
        ))}
      </div>

      <button
        onClick={showPrevImage}
        className={`button ${buttonStyles} left-0 `}
        aria-label="View Previous Image"
      >
        <ArrowBigLeft className="stroke-white fill-black h-8 w-8" aria-hidden />
      </button>
      <button
        onClick={showNextImage}
        className={`button ${buttonStyles} right-0`}
        aria-label="View Next Image"
      >
        <ArrowBigRight
          className="stroke-white fill-black h-8 w-8"
          aria-hidden
        />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {imageUrl.map((_, index) => (
          <button
            className="slider_dot [&>*]:stroke-white [&>*]:fill-black [&>*]:w-full [&>*]:h-full"
            key={index}
            alt={`game image ${index}`}
            aria-hidden={imageIndex !== index}
            onClick={() => handleClick(index)}
            aria-label={`View Image ${index}`}
          >
            {index === imageIndex ? (
              <CircleDot aria-hidden />
            ) : (
              <Circle aria-hidden />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
