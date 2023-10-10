/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-use-before-define */
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { EmployeeHeaders, employeedata } from "../../Utils/constants";

// import companyIcon from "../../assets/images/company-img.png";
// import editIcon from "../../assets/images/edit-icon.svg";
// import arrowIcon from "../../assets/images/prev-arrow.svg";
// import nextarrowIcon from "../../assets/images/next-arrow.svg";
// import importIcon from "../../assets/images/import.svg";
// import exportIcon from "../../assets/images/export.svg";
// import PageTitle from "../../Components/Title/PageTitle";

// const ManageEmployee = () => {
//   const { register, control, handleSubmit, setValue, watch } = useForm([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [tableData, setTableData] = useState(employeedata);

//   const handleSelectAllChange = () => {
//     setSelectAll(!selectAll);
//     const checkboxes = watch("checkboxes");
//     checkboxes.forEach((checkbox, index) => {
//       setValue(`checkboxes[${index}]`, !selectAll);
//     });
//   };

//   const toggleModal = () => {};

//   return (
//     <>
//       <PageTitle title='Manage Employees' hasActions hasFilter hasSearch>
//         <button className='btn add-btn' data-bs-tdashboardarget='#exampleModal' type='button' onClick={toggleModal}>
//           +&nbsp;Add Account
//         </button>
//         <button className='btn add-btn' data-bs-toggle='modal' data-bs-target='#importModal' type='button'>
//           <img src={importIcon} alt='import-icon' />
//           import
//         </button>
//         <button className='btn add-btn' type='button'>
//           <img src={exportIcon} alt='export-icon' />
//           export
//         </button>
//       </PageTitle>
//       <div className='container-fluid'>
//         <div className='row justify-content-center'>
//           <div className='col-md-10'>
//             <section className='main-wrapper p-0'>
//               <div className='table-responsive'>
//                 <table className='table'>
//                   <thead>
//                     <tr>
//                       <th>
//                         <label htmlFor='employee-table' className='checkbox checkbox-outline-primary mb-0 ps-0 mb-0'>
//                           <input type='checkbox' checked={selectAll} onChange={handleSelectAllChange} />
//                           <span />
//                           <span className='checkmark' />
//                         </label>
//                       </th>
//                       {EmployeeHeaders.map((item, index) => {
//                         return (
//                           <th key={index} style={item.hasStyle ? item.style : {}}>
//                             {item.name}
//                           </th>
//                         );
//                       })}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {employeedata && employeedata.length > 0 ? (
//                       employeedata.map((item, index) => {
//                         return (
//                           <tr key={item.emp_code}>
//                             <td>
//                               <label className='checkbox checkbox-outline-primary mb-0 ps-0 mb-0'>
//                                 <input type='checkbox' {...register(`checkboxes.${item.emp_code}`)} />
//                                 <span></span>
//                                 <span className='checkmark'></span>
//                               </label>
//                             </td>
//                             <td>{item.emp_code}</td>
//                             <td className='text-capitalize position-relative'>
//                               <div>
//                                 <img src={companyIcon} className='company-img' alt='My Awesome ' />
//                                 &nbsp;{item.full_name}
//                               </div>
//                             </td>
//                             <td className='text-capitalize'>{item.designation}</td>
//                             <td>{item.email}</td>
//                             <td className='text-capitalize active-status'>{item.completed}</td>
//                             <td>{item.employment_status}</td>
//                             <td>{item.created_at}</td>
//                             <td className='text-capitalize active-status'>{item.status}</td>
//                             <td>
//                               <div>
//                                 <a href='#'>
//                                   <img src={editIcon} alt='My Awesome' />
//                                 </a>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })
//                     ) : (
//                       <tr>
//                         <td colSpan='30' className='text-ced=nter'>
//                           No Records Found.
//                         </td>
//                       </tr>
//                     )}

//                     {/* <tr>
//                     <td>
//                       <label className='checkbox checkbox-outline-primary mb-0 ps-0 mb-0'>
//                         <input type='checkbox' />
//                         <span></span>
//                         <span className='checkmark'></span>
//                       </label>
//                     </td>
//                     <td>CJ010</td>
//                     <td className='text-capitalize position-relative'>
//                       <div>
//                         <img src='images/emp-table/emp-1.jpg' className='company-img' />
//                         Silver Mccarthy
//                       </div>
//                     </td>
//                     <td className='text-capitalize'>Software Engineer</td>
//                     <td>support@creativejuices.com</td>
//                     <td className='text-capitalize active-status'>100%</td>
//                     <td>Internship</td>
//                     <td>10 Feb 23, 03:08 PM</td>
//                     <td className='text-capitalize active-status'>active</td>
//                     <td>
//                       <div className='d-flex align-items-center justify-content-center'>
//                         <a href='javascript:void(0)'>
//                           <img src='images/edit-icon.svg' />
//                         </a>
//                       </div>
//                     </td>
//                   </tr> */}
//                   </tbody>
//                 </table>
//               </div>
//               <div className='table-pagination'>
//                 <div className='gap-3 entries-block'>
//                   <span>Show</span>
//                   <select className='form-select default-form'>
//                     <option value='DEFAULT'>10</option>
//                     <option value='1'>20</option>
//                     <option value='2'>30</option>
//                     <option value='3'>40</option>
//                   </select>
//                   <span>
//                     entries out of <span>500</span>
//                   </span>
//                 </div>
//                 <div className='pagination-right'>
//                   <div className='gap-4 table-pages'>
//                     <span>Page</span>
//                     <input type='number' className='form-control default-form' value='2' />
//                     <span>of 41</span>
//                   </div>
//                   <div className='gap-3 table-next-prev'>
//                     <button type='submit' className='next-prev-btn'>
//                       <img src={arrowIcon} alt='My Awesome ' />
//                     </button>
//                     <button type='submit' className='next-prev-btn'>
//                       <img src={nextarrowIcon} alt='My Awesome ' />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ManageEmployee;

/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import AddAccount from "../Accounts/AddAccount";
import useDebounce from "../../hooks/useDebounce";
import PageTitle from "../../Components/Title/PageTitle";
import CustomModal from "../../Components/CustomModal/CustomModal";
import DataTable from "../../Components/DataTable";
import Toast from "../../Components/Toaster/Toaster";
import { getAllAccounts, sendActivationMail } from "../../API/Accounts";
import { checkNullObject } from "../../Utils/common";
import { PAGE_LENGTH } from "../../Utils/constants";
import editIcon from "../../assets/images/edit-icon.svg";
import "../../assets/css/dropdown.css";
import { SuccessIcon } from "../../assets/icons/success-icon";

const ManageEmployee = () => {
  const loggedInUser = useSelector((state) => {
    return state?.opwings.loginSlice.data;
  });
  const [cookies, setCookie] = useCookies([
    `accountColumns-${loggedInUser.id}`,
  ]);
  const [users, setUsers] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showPageAction, setShowPageAction] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [show, setShow] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const [filter, setFilter] = useState({
    _page: 1,
    _limit: PAGE_LENGTH[0],
    _sort: "id",
    _order: "desc",
    status: "",
  });

  const [initialState, setInitialState] = useState({
    sortBy: [{ id: "id", desc: true }],
    pageSize: filter._limit,
    pageIndex: 0,
    hiddenColumns: ["id"],
  });

  const checkSelectedRow = checkNullObject(selectedRow);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const toggleModal = () => {
    setShow((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers();
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [filter, debouncedSearchTerm]);

  useEffect(() => {
    if (cookies[`accountColumns-${loggedInUser.id}`]) {
      const cookiesHidden = cookies[`accountColumns-${loggedInUser.id}`];
      const updatedCols = columns.map((col) => {
        if (cookiesHidden.includes(col.accessor)) {
          return {
            ...col,
            isVisible: false,
          };
        }
        return col;
      });
      setColumns(updatedCols);
      const hiddenColumns = columns
        .filter((col) => {
          return col.isVisible === false;
        })
        .map((col) => col.accessor);
      setInitialState((prevState) => {
        return {
          ...prevState,
          hiddenColumns: [...prevState.hiddenColumns, ...cookiesHidden],
        };
      });
    }
  }, [cookies]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);

    getAllAccounts({ ...filter, q: debouncedSearchTerm })
      .then((res) => {
        setUsers(res.data.data);
        setTotalRecords(res?.data?.count);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, [filter, debouncedSearchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const onEditRow = (id) => {
    setSelectedRow(id);
    toggleModal();
  };

  const sendActivationMailHandler = async (id) => {
    setLoading(true);
    await sendActivationMail(id).then((res) => {
      if (res?.code === 201) {
        setTimeout(() => {
          Toast({
            message: (
              <div className="toast-main ms-2">
                <h5 style={{ fontWeight: "bold", margin: "0" }}>Success!</h5>
                <p style={{ fontSize: "1.3rem", margin: "0" }}>
                  {res?.message}
                </p>
              </div>
            ),
            type: "success",
            position: "top-right",
            icon: (
              <div className="toast-icon success">
                <SuccessIcon />
              </div>
            ),
            toastId: "submit-toast",
            className: "toster2",
          });
          setLoading(false);
        }, 100);
      }
    });
  };

  const onCloseModal = () => {
    toggleModal();
    setSelectedRow({});
  };

  // const userColumn = useMemo(() => {
  //   return [
  //     {
  //       id: "id",
  //       disableSortBy: true,
  //       className: "w-1",
  //       accessor: "id",
  //     },
  //     {
  //       Header: "Company Code",
  //       accessor: "company_code",
  //       width: "auto",
  //       isVisible: true,
  //       isNonHidable: true,
  //     },
  //     {
  //       Header: "Company Name",
  //       accessor: "company_name",
  //       width: "auto",
  //       className: "position-relative",
  //       isVisible: true,
  //       isNonHidable: true,
  //       Cell: ({ row }) => {
  //         return (
  //           <div>
  //             {row.original.companyLogo !== null && row.original.companyLogo != "" ? (
  //               <img
  //                 src={`${import.meta.env.VITE_UPLOAD_BASE_URL}${row.original.companyLogo}`}
  //                 className='company-img'
  //                 alt='My Awesome '
  //               />
  //             ) : (
  //               <span className='company-img'>{getUserNameInitials("", "", row.original.company_name)}</span>
  //             )}
  //             &nbsp;{row.values.company_name}
  //           </div>
  //         );
  //       },
  //     },
  //     {
  //       Header: "Contact Person",
  //       accessor: "contact_person",
  //       width: "auto",
  //       isVisible: true,
  //     },
  //     {
  //       Header: "Email",
  //       accessor: "email",
  //       width: "auto",
  //       isVisible: true,
  //     },
  //     {
  //       Header: "Total Users",
  //       accessor: "total_users",
  //       width: "auto",
  //       isVisible: true,
  //     },
  //     {
  //       Header: "Created At",
  //       accessor: "created_at",
  //       width: "auto",
  //       isVisible: true,
  //       Cell: ({ row }) => {
  //         return moment(row.values.created_at).format(DATE_TIME_FORMAT.created_at);
  //       },
  //     },

  //     {
  //       Header: "Status",
  //       accessor: "status",
  //       className: "text-center",
  //       width: "90",
  //       isVisible: true,
  //       isNonHidable: true,
  //       Cell: ({ row }) => {
  //         return (
  //           <span
  //             className={`text-center text-capitalize ${
  //               row.values.status === "Active" ? "active-status" : "inactive-status"
  //             }`}
  //           >
  //             {row.values.status}
  //           </span>
  //         );
  //       },
  //     },

  //   ];
  // }, []);
  const userColumn = useMemo(() => {
    return [
      {
        id: "employee_code",
        Header: "Employee Code",
        disableSortBy: true,
        className: "w-1",
        accessor: "employee_code",
      },
      {
        id: "full_name",
        Header: "Full Name",
        accessor: "full_name",
      },
      {
        id: "designation",
        Header: "Designation",
        accessor: "designation",
      },
      {
        id: "email",
        Header: "Email",
        accessor: "email",
      },
      {
        id: "completed_percent",
        Header: "Completed %",
        accessor: "completed_percent",
      },
      {
        id: "employment_status",
        Header: "Employment Status",
        accessor: "employment_status",
      },
      {
        id: "created_at",
        Header: "Created At",
        accessor: "created_at",
      },
      {
        id: "status",
        Header: "Status",
        className: "text-center",
        width: "90",
        accessor: "status",
        Cell: ({ row }) => {
          return (
            <span
              className={`text-center text-capitalize ${
                row.values.status === "Active"
                  ? "active-status"
                  : "inactive-status"
              }`}
            >
              {row.values.status}
            </span>
          );
        },
      },
    ];
  }, []);

  const [columns, setColumns] = useState(userColumn);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((cols) => {
      return [
        ...cols,
        {
          Header: "",
          accessor: "Actions",
          className: "text-center text-nowrap",
          width: "10",
          isNonHidable: true,
          disableSortBy: true,
          Cell: ({ row }) => {
            return (
              <div className="d-flex align-items-center justify-content-center">
                <div role="button" tabIndex="-1">
                  <img
                    src={editIcon}
                    alt="Edit Item`"
                    onClick={() => {
                      onEditRow(row.values);
                    }}
                    data-tooltip-id="edit-tooltip"
                    data-tooltip-content="Edit account details"
                  />
                  <Tooltip id="edit-tooltip" />
                </div>
              </div>
            );
          },
        },
      ];
    });
  };

  const onColumnFilterCallBack = (e, identifier) => {
    setLoading((prev) => {
      return !prev;
    });
    setInitialState((prevState) => {
      const updatedHiddenColumns = e.target.checked
        ? prevState.hiddenColumns.filter((i) => {
            return i !== identifier;
          })
        : [...prevState.hiddenColumns, identifier];

      return {
        ...prevState,
        hiddenColumns: updatedHiddenColumns,
      };
    });

    setColumns((prevState) => {
      return prevState.map((i) => {
        if (i.accessor === identifier) {
          return { ...i, isVisible: e.target.checked };
        }
        return i;
      });
    });
    setTimeout(() => {
      const updatedCols = columns.map((i) => {
        if (i.accessor === identifier) {
          const col = { ...i, isVisible: e.target.checked };
          return col;
        }
        return i;
      });
      const hiddenCols = updatedCols
        .filter((col) => {
          return col.isVisible === false;
        })
        .map((col) => {
          return col.accessor;
        });
      setCookie(`accountColumns-${loggedInUser.id}`, hiddenCols, { path: "/" });
      setLoading((prev) => {
        return !prev;
      });
    }, 1000);
  };

  const filtersCallback = (identifier, value) => {
    setFilter((prev) => {
      return {
        ...prev,
        [identifier]: value,
      };
    });
  };

  const resetUserModal = (isReload = false) => {
    if (isReload) {
      fetchUsers();
    }
  };

  return (
    <>
      <PageTitle
        title="Manage Employee"
        hasSearch
        hasFilter
        hasActions
        hasSearchAndFilter
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        columnFilter={columns}
        onColumnFilterCallBack={onColumnFilterCallBack}
        hasStatusFilter
        filtersCallback={filtersCallback}
        showPageAction={showPageAction}
        setShowPageAction={setShowPageAction}
        loading={loading}
      >
        <button
          className="btn add-btn"
          type="button"
          onClick={() => {
            toggleModal();
            setShowPageAction(false);
          }}
        >
          +&nbsp;Add Account
        </button>
      </PageTitle>

      {show && (
        <CustomModal
          closeButton
          show={show}
          onHide={() => {
            onCloseModal();
            resetUserModal(true);
          }}
          modalTitle={`${checkSelectedRow ? "Add" : "Edit"} Account`}
        >
          <AddAccount
            onClose={onCloseModal}
            selectedRow={selectedRow}
            fetchUsers={fetchUsers}
            checkSelectedRow={checkSelectedRow}
          />
        </CustomModal>
      )}

      <DataTable
        columns={columns}
        data={users}
        initialState={initialState}
        setFilter={setFilter}
        totalRecords={totalRecords}
        tableHooks={tableHooks}
        currentPageLength={filter._limit}
        defaultPageLength={PAGE_LENGTH}
        isLoading={loading}
        manual
      />
    </>
  );
};

export default ManageEmployee;

aarsh;
