/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect, useMemo, useCallback } from "react";
import moment from "moment";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import AddAccount from "./AddAccount";
import useDebounce from "../../hooks/useDebounce";
import PageTitle from "../../Components/Title/PageTitle";
import CustomModal from "../../Components/CustomModal/CustomModal";
import DataTable from "../../Components/DataTable";
import Toast from "../../Components/Toaster/Toaster";
import { getAllAccounts, sendActivationMail } from "../../API/Accounts";
import { checkNullObject, getUserNameInitials } from "../../Utils/common";
import { DATE_TIME_FORMAT, PAGE_LENGTH } from "../../Utils/constants";
import sentIcon from "../../assets/images/sent-icon.svg";
import envelopeIcon from "../../assets/images/envelope.svg";
import editIcon from "../../assets/images/edit-icon.svg";
import "../../assets/css/dropdown.css";
import { SuccessIcon } from "../../assets/icons/success-icon";

const Accounts = () => {
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
        .filter((col) => col.isVisible === false)
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

  const userColumn = useMemo(() => {
    return [
      {
        id: "id",
        disableSortBy: true,
        className: "w-1",
        accessor: "id",
      },
      {
        Header: "Company Code",
        accessor: "company_code",
        width: "auto",
        isVisible: true,
        isNonHidable: true,
      },
      {
        Header: "Company Name",
        accessor: "company_name",
        width: "auto",
        className: "position-relative",
        isVisible: true,
        isNonHidable: true,
        Cell: ({ row }) => {
          return (
            <div>
              {row.original.companyLogo !== null &&
              row.original.companyLogo != "" ? (
                <img
                  src={`${import.meta.env.VITE_UPLOAD_BASE_URL}${
                    row.original.companyLogo
                  }`}
                  className="company-img"
                  alt="My Awesome "
                />
              ) : (
                <span className="company-img">
                  {getUserNameInitials("", "", row.original.company_name)}
                </span>
              )}
              &nbsp;{row.values.company_name}
            </div>
          );
        },
      },
      {
        Header: "Contact Person",
        accessor: "contact_person",
        width: "auto",
        isVisible: true,
      },
      {
        Header: "Email",
        accessor: "email",
        width: "auto",
        isVisible: true,
      },
      {
        Header: "Total Users",
        accessor: "total_users",
        width: "auto",
        isVisible: true,
      },
      {
        Header: "Created At",
        accessor: "created_at",
        width: "auto",
        isVisible: true,
        Cell: ({ row }) => {
          return moment(row.values.created_at).format(
            DATE_TIME_FORMAT.created_at
          );
        },
      },

      {
        Header: "Status",
        accessor: "status",
        className: "text-center",
        width: "90",
        isVisible: true,
        isNonHidable: true,
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
          Header: "Actions",
          accessor: "Actions",
          className: "text-center text-nowrap",
          width: "73",
          isNonHidable: true,
          disableSortBy: true,
          Cell: ({ row }) => {
            return (
              <div className="d-flex align-items-center justify-content-center">
                <div className="me-4" role="button">
                  <img
                    src={sentIcon}
                    alt="Edit"
                    onClick={() => {
                      const accountUrl = `${window.location.protocol}//${
                        row.values.company_code
                      }.${import.meta.env.VITE_MAIN_DOMAIN}/login`;
                      window.open(accountUrl, "_blank");
                    }}
                    data-tooltip-id="go-to-account"
                    data-tooltip-content="Go to account"
                  />
                  <Tooltip id="go-to-account" />
                </div>
                <div className="me-4" role="button">
                  <img
                    src={envelopeIcon}
                    alt="Send Activation Mail"
                    onClick={() => {
                      sendActivationMailHandler(row.values.id);
                    }}
                    data-tooltip-id="send-mail-tooltip"
                    data-tooltip-content="Send activation mail"
                  />
                  <Tooltip id="send-mail-tooltip" />
                </div>
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
        .filter((col) => col.isVisible == false)
        .map((col) => col.accessor);
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
        title="Accounts"
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

export default Accounts;
