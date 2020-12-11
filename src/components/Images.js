import React, { useEffect, useState } from "react";
import useFetchImage from "../utils/hooks/useFetchImag";
import Image from "./Image";
import Loading from "./Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import useDebounce from "../utils/hooks/useDebounce";

export default function Images() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);
  const [images, setImages, errors, isLoading] = useFetchImage(
    page,
    searchTerm
  );
  const debounce = useDebounce();

  function handleRemove(index) {
    setImages(images.filter((image, i) => i !== index));
  }

  function ShowImages(params) {
    return (
      <InfiniteScroll
        dataLength={images.length}
        next={() => setPage(page + 1)}
        hasMore={true}
        className="flex flex-wrap"
      >
        {images.map((img, index) => (
          <Image
            image={img.urls.regular}
            index={index}
            key={index}
            handleRemove={handleRemove}
          />
        ))}
      </InfiniteScroll>
    );
  }

  function loadMoreImages(params) {
    setPage(page + 1);
  }

  //   if (isLoading) {
  //     return <Loading />;
  //   }

  function handleInput(e) {
    const text = e.target.value;
    debounce(() => setSearchTerm(text));
  }

  return (
    <section>
      <div
        className="my-5 border rounded shadow p-2"
        placeholder="Search Photos Here"
      >
        <input type="text" onChange={handleInput} />
      </div>
      {errors.length !== 0 && (
        <div className="flex h-screen">
          <p className="m-auto">{errors[0]}</p>
        </div>
      )}
      <div className="flex flex-wrap">
        <ShowImages />
      </div>
      {isLoading && <Loading />}
    </section>
  );
}
