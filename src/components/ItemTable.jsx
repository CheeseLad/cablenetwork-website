import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <input
      value={globalFilter || ''}
      onChange={(e) => setGlobalFilter(e.target.value || undefined)}
      placeholder="Search items..."
      className="mb-4 p-2 border border-gray-300 dark:border-[#27272a] rounded bg-white dark:bg-[#1a1a20] text-gray-900 dark:text-[#fafafa] focus:outline-none"
    />
  );
};

const ItemTable = () => {
  useDocumentTitle('Item Shop Prices');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sortBy, setSortBy] = useState('Id');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cablenetwork-api.jakefarrell.ie/api/items?sortBy=${sortBy}&sortOrder=${sortOrder}&search=${globalFilter}`);
        const result = await response.json();
        setData(Array.isArray(result) ? result : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sortBy, sortOrder, globalFilter]);

  const columns = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'Id',
      },
      {
        Header: 'Item Name',
        accessor: 'ItemName',
      },
      {
        Header: 'Selling Price',
        accessor: 'Selling',
      },
      {
        Header: 'Buying Price',
        accessor: 'Buying',
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy
  );

  if (loading) {
    return <div className="text-center py-10 text-gray-800 dark:text-[#fafafa]">Loading...</div>;
  }

  return (
    <div className="bg-white dark:bg-[#09090b] py-10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-[#fafafa] mb-8 text-center">Item Shop Prices</h1>
        <div className="overflow-x-auto">
          <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          <div className="border border-gray-300 dark:border-[#27272a] rounded-lg shadow-lg">
            <table {...getTableProps()} className="min-w-full bg-white dark:bg-[#131316] border border-gray-200 dark:border-[#27272a]">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-gray-200 dark:border-[#27272a] dark:bg-[#1a1a20]">
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className="p-2 text-left cursor-pointer text-gray-800 dark:text-[#fafafa]"
                      >
                        {column.render('Header')}
                        <span>
                          {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                        </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} className="border-b border-gray-200 dark:border-[#27272a] dark:hover:bg-[#1a1a20]/60">
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} className="p-2 text-gray-800 dark:text-[#fafafa]">
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemTable;
