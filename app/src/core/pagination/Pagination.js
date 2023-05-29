import ReactPaginate from 'react-paginate';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Pagination = ({ page, onPageChange, pageCount, totalRows, ...props }) => {
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1);
  };

  return (
    <div {...props}>
      <ReactPaginate
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        previousLabel={<FaArrowLeft className="h-8 p-2 bg-gray-100 rounded-full" />}
        nextLabel={<FaArrowRight className="h-8 p-2 bg-gray-100 rounded-full" />}
        containerClassName="flex text-center align-middle justify-end my-3"
        breakClassName="text-primary-600"
        pageClassName="text-gray-500 rounded-full justify-center flex flex-col h-7 w-7 mx-1.5 text-sm leading-5 font-medium"
        activeClassName="bg-primary-100 rounded-full justify-center flex flex-col text-primary-600 h-7 w-7 text-sm leading-5 font-medium"
        disabledClassName="hidden"
        onPageChange={handlePageClick}
        forcePage={page - 1 > pageCount ? 0 : page - 1}
      />
    </div>
  );
};

export default Pagination;
