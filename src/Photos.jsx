import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import {
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardGroup,
  Spinner,
  Button,
} from 'reactstrap';
import Photo from './Photo';

export default function Photos() {
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [startingPageNumber, setStartingPageNumber] = useState(1);
  const pageNumbersPerPage = 10;
  const [endingPageNumber, setEndingPageNumber] = useState(10);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/1/photos`)
      .then((res) => {
        setPhotos(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const getPages = (first, last) => {
    const numbersArray = [];
    for (let i = first; i <= last; i += 1) {
      numbersArray.push(i);
    }
    setPages(numbersArray);
  };
  const previousPages = () => {
    setStartingPageNumber(startingPageNumber - pageNumbersPerPage);
    setEndingPageNumber(endingPageNumber - pageNumbersPerPage);
    getPages(
      startingPageNumber - pageNumbersPerPage,
      endingPageNumber - pageNumbersPerPage
    );
  };
  const nextPages = () => {
    setStartingPageNumber(startingPageNumber + pageNumbersPerPage);
    setEndingPageNumber(endingPageNumber + pageNumbersPerPage);
    getPages(
      startingPageNumber + pageNumbersPerPage,
      endingPageNumber + pageNumbersPerPage
    );
  };
  const changePage = (page) => {
    if (page <= 100 && page >= 1) {
      setActivePage(page);
      setLoading(true);
      axios
        .get(`https://jsonplaceholder.typicode.com/albums/${page}/photos`)
        .then((res) => {
          console.log(res.data);
          setPhotos(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
      console.log(page);
    }
  };

  return (
    <div className="p-2 container-fluid">
      <div>
        <div className="d-flex sticky-top bg-dark text-white rounded mb-3 pl-5 pr-5">
          <h1 className="p-2 flex-grow-1 ">Photo Gallery</h1>
          <div className="p-2 flex-shrink-1">
            <Button
              className="rounded-circle m-2 h1 border border-white"
              color="success"
              onClick={() => {
                changePage(activePage - 1);
              }}
            >
              <ArrowLeft />
            </Button>
            <b>Album: {activePage}</b>
            <Button
              className="rounded-circle m-2 border border-white"
              color="success"
              onClick={() => {
                changePage(activePage + 1);
              }}
            >
              <ArrowRight />
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="loading-box text-center">
            <h1>Loading... Album</h1>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="danger" />{' '}
          </div>
        ) : (
          <CardGroup className="border p-2 bg-light">
            <Row>
              {photos.map((value) => (
                <Photo photo={value} />
              ))}
            </Row>
          </CardGroup>
        )}
        <Pagination className="pagination">
          <PaginationItem>
            <PaginationLink
              previous
              onClick={previousPages}
              disabled={startingPageNumber === 1}
            />
          </PaginationItem>
          {pages.map((page) => (
            <PaginationItem active={page === activePage}>
              <PaginationLink
                onClick={() => {
                  changePage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              next
              onClick={nextPages}
              disabled={endingPageNumber === 100}
            />
          </PaginationItem>
        </Pagination>
      </div>
    </div>
  );
}
