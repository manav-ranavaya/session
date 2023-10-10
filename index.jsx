import React, { useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useRowSelect,
} from "react-table";
import { Table } from "react-bootstrap";
import ShimmerTableRow from "../../ShimmerLoading/ShimmerTableRow";

import GlobalFilter from "./GlobalFilter";
import TablePagination from "./TablePagination";

const DataTable = ({
  fullWidth = false,
  columns,
  data,
  initialState,
  setFilter,
  setSelectedRows = () => {},
  totalRecords,
  // tableHooks,
  currentPageLength,
  filteredColumnIds,
  defaultPageLength,
  manual,
  isLoading,
  align = false,
}) => {
  const pageLength = Math.ceil(totalRecords / currentPageLength);

  const tableInstance = useTable(
    {
      columns,
      data: data || [],
      manualGlobalFilter: manual,
      manualSortBy: manual,
      manualPagination: manual,
      disableMultiSort: manual,
      initialState,
      pageCount: pageLength,
    },
    // ...tableHooks,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    pageCount,
    pageOptions,
    gotoPage,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, sortBy, selectedRowIds },
  } = tableInstance;

  useEffect(() => {
    setFilter((prevState) => {
      const getSort = () => {
        if (sortBy[0]?.id) {
          if (sortBy[0].desc) {
            return "desc";
          }
          return "asc";
        }
        return "";
      };
      return {
        ...prevState,
        _sort: sortBy[0]?.id || "",
        _order: getSort(),
        _limit: pageSize,
        _page: pageIndex + 1,
      };
    });
  }, [sortBy, pageIndex, pageSize]);

  useEffect(() => {
    setSelectedRows(
      selectedFlatRows.map((row) => {
        return row.original.id;
      })
    );
  }, [selectedRowIds]);

  const tableBody = useMemo(() => {
    return (
      <tbody {...getTableBodyProps()}>
        {isLoading
          ? headerGroups.map((headerGroup, index) => {
              return (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((headers) => {
                    return (
                      <td key={headers.id}>
                        <ShimmerTableRow headers={headerGroups[0].headers} />
                      </td>
                    );
                  })}
                </tr>
              );
            })
          : rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={row.id || i} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={cell.column.className || ""}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
      </tbody>
    );
  }, [isLoading, getTableBodyProps, page, headerGroups]);

  return (
    <div className={fullWidth ? "" : "container-fluid"}>
      <div className="row justify-content-center">
        <div className={fullWidth ? "col-md-12" : "col-md-10"}>
          <section className={`main-wrapper p-0 ${fullWidth ? "mb-0" : ""}`}>
            <div className="table-responsive">
              <Table
                responsive="md"
                className={`${align ? "align" : ""}`}
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map((headerGroup) => {
                    return (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => {
                          return (
                            <th
                              {...column.getHeaderProps([
                                column.getSortByToggleProps(),
                                {
                                  className: column.className,
                                },
                                { width: column.width },
                              ])}
                            >
                              {column.render("Header")}
                            </th>
                          );
                        })}
                      </tr>
                    );
                  })}
                </thead>

                {tableBody}
              </Table>
            </div>

            <TablePagination
              isLoading={isLoading}
              totalRecords={totalRecords}
              page={page}
              pageOptions={pageOptions}
              pageSize={pageSize}
              pageIndex={pageIndex}
              previousPage={previousPage}
              canPreviousPage={canPreviousPage}
              nextPage={nextPage}
              canNextPage={canNextPage}
              gotoPage={gotoPage}
              pageCount={pageCount}
              setPageSize={setPageSize}
              defaultPageLength={defaultPageLength}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
