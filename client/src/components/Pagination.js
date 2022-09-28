import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { getBarang } from '../redux/action/getItems';
import '../componentStyle/pagination.css'


export function PaginatedItems() {
  const dispatch = useDispatch()
  const itemsPerPage = 10
  const selector = useSelector(state=>state.getItemsReducer)
  const page = selector.payload&&selector.payload.page_count
  const data = selector.payload&&selector.payload.total
  const totalData = data
  // We start with an empty list of items.

  const [currentPage, setCurrentPage] = useState(0)
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);


  useEffect(() => {
    // Fetch items from another resources.
    // const endOffset = itemOffset ;
    dispatch(getBarang(currentPage))
  }, [itemOffset,currentPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalData;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setCurrentPage(event.selected+1)
    setItemOffset(newOffset);
  };

  return (
    <div className='paginate' style={{display:'flex',flexDirection:'row'}}>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={page}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        pageClassName={'page-item'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        activeClassName={'active'}
      />
    </div>
  );
}