import React, { useState, useEffect, useRef } from "react";
import Sortable from "sortablejs";
import { Oval } from "react-loader-spinner";
import "./SortableImageGallery.css";

import cover from "../img/cover.png";
import helmet from "../img/helmet-1.png";
import potion from "../img/potion-1.png";
import scroll from "../img/scroll-1.png";
import shield from "../img/shield-1.png";
import sword from "../img/sword-1.png";
import covering from "../img/covering.png";
import potioning from "../img/potioning.png";
import ringing from "../img/ringing.png";
import scrolling from "../img/scrolling.png";
import shielding from "../img/shielding.png";
import ring from "../img/ring-1.png";

const initialImages = [
  { src: cover, alt: "cover", tag: "card" },
  { src: helmet, alt: "helmet", tag: "shield" },
  { src: potion, alt: "potion", tag: "magic" },
  { src: scroll, alt: "scroll", tag: "ancient" },
  { src: shield, alt: "shield", tag: "armor" },
  { src: sword, alt: "sword", tag: "weapon" },
  { src: covering, alt: "covering", tag: "card" },
  { src: potioning, alt: "potioning", tag: "magic" },
  { src: ringing, alt: "ringing", tag: "jewelry" },
  { src: scrolling, alt: "scrolling", tag: "ancient" },
  { src: shielding, alt: "shielding", tag: "armor" },
  { src: ring, alt: "ring", tag: "jewelry" },
];

const SortableImageGallery = () => {
  const [images, setImages] = useState(initialImages);
  const [searchInput, setSearchInput] = useState("");
  const [loadingImages, setLoadingImages] = useState(false);

  const gridRef = useRef(null);
  const sortable = useRef(null);

  useEffect(() => {
    setLoadingImages(true);
    // Simulate loading delay
    setTimeout(() => {
      setLoadingImages(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (gridRef.current && !sortable.current) {
      sortable.current = new Sortable(gridRef.current, {
        animation: 250,
        onEnd: (evt) => {
          console.log("Drag End Event:");
          console.log("Old Index:", evt.oldIndex);
          console.log("New Index:", evt.newIndex);

          const reorderedImages = [...images];
          const [movedImage] = reorderedImages.splice(evt.oldIndex, 1);
          reorderedImages.splice(evt.newIndex, 0, movedImage);
          setImages(reorderedImages);
        },
      });
    }
  }, [images]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchInput(searchTerm);

    const filteredImages = initialImages.filter((image) =>
      image.tag.toLowerCase().includes(searchTerm)
    );
    setImages(filteredImages);
  };

  useEffect(() => {
    console.log("Current Images State:");
    console.log(images);
  }, [images]);

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">This is an Image Gallery</h1>
      <input
        type="text"
        placeholder="Search by tag..."
        value={searchInput}
        onChange={handleSearch}
      />
      {loadingImages ? (
        <div className="loading-spinner">
          <Oval type="Oval" color="#00BFFF" height={80} width={80} />
          <p>Loading images...</p>
        </div>
      ) : (
        <div ref={gridRef} className="card-grid">
          {images.length === 0 ? (
            <p>No matching images found.</p>
          ) : (
            images.map((image, index) => (
              <div key={index} className="image-card">
                <img src={image.src} alt={image.alt} />
                <p>{image.tag}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SortableImageGallery;

/*
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";

import cover from "../img/cover.png";
import helmet from "../img/helmet-1.png";
import potion from "../img/potion-1.png";
import scroll from "../img/scroll-1.png";
import shield from "../img/shield-1.png";
import sword from "../img/sword-1.png";
import covering from "../img/covering.png";
import potioning from "../img/potioning.png";
import ringing from "../img/ringing.png";
import scrolling from "../img/scrolling.png";
import shielding from "../img/shielding.png";
import ring from "../img/ring-1.png";

export default function SortableImageGallery() {
  const [searchInput, setSearchInput] = useState(""); // Stores the user's search input for filtering images.
  const [filteredImages, setFilteredImages] = useState([]); // Stores the list of images that match the search criteria.
  const [loadingImages, setLoadingImages] = useState(true);

  // Create an Array of Images:
  const allImages = [
    { src: cover, alt: "cover", tag: "card" },
    { src: helmet, alt: "helmet", tag: "shield" },
    { src: potion, alt: "potion", tag: "magic" },
    { src: scroll, alt: "scroll", tag: "ancient" },
    { src: shield, alt: "shield", tag: "armor" },
    { src: sword, alt: "sword", tag: "weapon" },
    { src: covering, alt: "covering", tag: "card" },
    { src: potioning, alt: "potioning", tag: "magic" },
    { src: ringing, alt: "ringing", tag: "jewelry" },
    { src: scrolling, alt: "scrolling", tag: "ancient" },
    { src: shielding, alt: "shielding", tag: "armor" },
    { src: ring, alt: "ring", tag: "jewelry" },
  ];

  setTimeout(() => {
    setLoadingImages(false);
  }, 2000);

  // This function, handleSearch, is called when the user enters text in the search input field.
  //  It performs the following tasks:
  //  Retrieves the user's search input and converts it to lowercase for case-insensitive matching.
  // Filters the allImages array to find images whose tag property includes the search term.
  //  Updates the filteredImages state variable with the filtered results.
  //  Updates the searchInput state variable with the current search term.

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = allImages.filter((image) =>
      image.tag.toLowerCase().includes(searchTerm)
    );
    setFilteredImages(filtered);
    setSearchInput(searchTerm);
  };

  return (
    <div className="gallery-container">
      <h1>Image gallery</h1>
      <input
        type="text"
        placeholder="Search by tag..."
        value={searchInput}
        onChange={handleSearch}
      />
      {loadingImages ? (
        <div className="loading-spinner">
          <Oval type="Oval" color="#00BFFF" height={80} width={80} />
          <p>Loading images...</p>
        </div>
      ) : (
        <div className="card-grid">
          {searchInput === "" ? (
            allImages.map((image, index) => (
              <div key={index} className="image-card">
                <img src={image.src} alt={image.alt} />
                <p>{image.tag}</p>
              </div>
            ))
          ) : filteredImages.length === 0 ? (
            <p>No matching images found.</p>
          ) : (
            filteredImages.map((image, index) => (
              <div key={index} className="image-card">
                <img src={image.src} alt={image.alt} />
                <p>{image.tag}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

/** Image Grid:

Inside a div element with the class name "card-grid," 
you conditionally render images based on the user's search input.
If the search input is empty (searchInput === ""), 
it maps through the allImages array and displays each image
 along with its tag in a div with the class name "image-card."
If there are no matching images after filtering (filteredImages.length === 0),
 it displays a message: "No matching images found."
If there are matching images, it maps through the filteredImages
 array and displays the matching images with their tags. */
