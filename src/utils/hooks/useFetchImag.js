import React, { useEffect, useState } from "react";
import Axios from "axios";

const api = process.env.REACT_APP_UNSPLASH_API;
const secret = process.env.REACT_APP_UNSPLASH_KEY;

export default function useFetchImag(page, searchTerm) {
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function fetch() {
    const url =
      searchTerm === null ? "photos?" : `search/photos?query=${searchTerm}&`;
    Axios.get(`${api}${url}client_id=${secret}&page=${page}`)
      .then((res) => {
        if (searchTerm === null) {
          fetchRandom(res);
        } else {
          fetchSearch(res);
        }

        setIsLoading(false);
      })
      .catch((e) => {
        setErrors(["Unable to fetch Images"]);
        setIsLoading(false);
      });
  }

  function fetchSearch(res) {
    if (page > 1) {
      setImages([...images, ...res.data.results]);
    } else {
      setImages([...res.data.results]);
    }
  }
  function fetchRandom(res) {
    setImages([...images, ...res.data.results]);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch();
  }, [page]);

  useEffect(() => {
    if (searchTerm === null) {
      return;
    }
    fetch();
  }, [searchTerm]);
  return [images, setImages, errors, isLoading];
}
