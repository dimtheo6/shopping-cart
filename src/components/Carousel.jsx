import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import "./carousel.css";

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

  return (
    <div className="w-full h-full relative">
      <div className="w-full h-full  flex overflow-hidden">
        {imageUrl.map((url) => (
          <img style={{translate: `${-100 * imageIndex}%`}} key={url.id}
            src={url.image}
            className="w-full h-full object-cover flex-shrink-0 flex-grow-0 "
          />
        ))}
      </div>

      <button
        onClick={showPrevImage}
        className={`button ${buttonStyles} left-0 `}
      >
        <ArrowBigLeft className="stroke-white fill-black h-8 w-8" />
      </button>
      <button
        onClick={showNextImage}
        className={`button ${buttonStyles} right-0`}
      >
        <ArrowBigRight className="stroke-white fill-black h-8 w-8" />
      </button>
    </div>
  );
}
