import React, { useEffect, useState } from "react";
import classes from "./downloads.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  TextField,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { API_ROUTES } from "@/utils/apiConfig";
import ReactPaginate from "react-paginate";
const Downloads = ({ data }) => {
  const [filterTerm, setFilterTerm] = useState(data);
  const [currentPage, setCurrentPage] = useState(0);
  //Filter but selecting options
  const [selectedOption, setSelectedOption] = useState(10);

  const handleSelectChange = (event) => {
    setCurrentPage((prev) => {
      return 0;
    });
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    setFilterTerm((prevData) => {
      console.log(currentPage);
      return data.filter((item, index) => {
        return (
          index >= currentPage * selectedOption &&
          index < (currentPage + 1) * selectedOption
        );
      });
    });
  }, [currentPage, selectedOption]);

  // Function to search for a specific title in the array
  function searchByTitle(searchTerm) {
    // Convert the search term to lowercase for case-insensitive search
    const searchTermLower = searchTerm.toLowerCase().trim();

    // Filter the array to get objects that match the search term in their title
    const searchResults = data.filter((item) =>
      item.title.toLowerCase().includes(searchTermLower)
    );
    setFilterTerm(searchResults);
  }

  //sorting section
  //Function to sort the array by dateCreated in ascending order
  const sortByDateAscending = () => {
    setFilterTerm((prevData) => {
      return [...prevData].sort(
        (a, b) => new Date(a.dateCreated) - new Date(b.dateCreated)
      );
    });
  };

  const sortByDateDescending = () => {
    setFilterTerm((prevData) => {
      return [...prevData].sort(
        (a, b) => new Date(b.dateCreated) - new Date(a.dateCreated)
      );
    });
  };
  const router = useRouter();
  //function to do the download for each document

  function downloadPdfFile(url, fileName) {
    console.log(url, fileName);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // Trigger a click event on the link to start the download
    link.click();
  }

  return (
    <div className={classes.downloadPage}>
      <div className={classes.choosen}>
        <p>
          <span
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </span>
          <Image src="/assets/svg/Chevron.svg" width={16} height={16} />
        </p>
        <h1>Downloads</h1>
      </div>
      <div className={classes.downloadContent}>
        <p>
          Documents listed in the archive part are complementary to the content
          of the eATm Portal and may be downloaded by clicking the appropriate
          "Download" text. They were previously in the main{" "}
          <span>download</span> are and have been replaced by newer versions.
          Here they are kept for convenient user reference.
        </p>
      </div>
      <div className={classes.downloadTables}>
        <div className={classes.filteringDocument}>
          <div className={classes.filterByNumber}>
            <FormLabel>Show</FormLabel>
            <Select
              size="small"
              value={selectedOption}
              onChange={handleSelectChange}
              defaultValue={"10"}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
            <FormLabel>Entries</FormLabel>
          </div>
          <Grid spacing={1} alignItems="center">
            <Grid
              item
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <FormLabel htmlFor="search">Search:</FormLabel>
              <TextField
                size="small"
                variant="outlined"
                placeholder="Title"
                onChange={(e) => searchByTitle(e.target.value)}
                id="search"
              />
            </Grid>
          </Grid>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TITLE</TableCell>
                <TableCell
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <Image
                      src="/assets/svg/arrowUp.svg"
                      width={15}
                      height={15}
                      alt="arrow-up"
                      onClick={sortByDateDescending}
                    />{" "}
                    <Image
                      src="/assets/svg/arrowUp.svg"
                      width={15}
                      height={15}
                      alt="arrow-up"
                      onClick={sortByDateAscending}
                      style={{ transform: "rotate(180deg)" }}
                    />{" "}
                  </div>
                  DATE
                </TableCell>
                <TableCell>UPDATE</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filterTerm.map((document) => {
                const dateCreated = new Date(document.dateCreated);

                const options = {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                };
                const formattedDate = dateCreated.toLocaleDateString(
                  undefined,
                  options
                );
                console.log(document);
                const pdfUrl = `${API_ROUTES.domainName}/${document.imageUrl}`;
                return (
                  <TableRow key={document.id}>
                    <TableCell>{document.title}</TableCell>
                    <TableCell>{formattedDate}</TableCell>
                    <TableCell>.............</TableCell>
                    <TableCell>
                      <button
                        className={classes.submitBtn}
                        onClick={() => {
                          downloadPdfFile(pdfUrl, document.title);
                        }}
                      >
                        <p>Submit</p>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={classes.paginationContainer}>
          {/* Render pagination links with updated styles */}
          <ReactPaginate
            containerClassName={classes.pagination}
            pageClassName={classes.pageItem}
            activeClassName={classes.active}
            onPageChange={(event) => setCurrentPage(event.selected)}
            pageCount={Math.ceil(data.length / selectedOption)}
            onPageActive={currentPage}
            breakLabel="..."
            previousLabel={
              <div className={classes.paginationTerm}>Previous</div>
            }
            nextLabel={<div className={classes.paginationTerm}>Next</div>}
          />
        </div>
      </div>
    </div>
  );
};

export default Downloads;
