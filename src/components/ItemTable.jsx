import React, { useState, useEffect } from 'react';
import { useTable, useSortBy, useGlobalFilter } from 'react-table';

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <input
      value={globalFilter || ''}
      onChange={(e) => setGlobalFilter(e.target.value || undefined)}
      placeholder="Search items..."
      className="mb-4 p-2 border border-gray-300 rounded"
    />
  );
};

const ItemTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sortBy, setSortBy] = useState('Id');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://cnapi.cheeselad.xyz/api/items?sortBy=${sortBy}&sortOrder=${sortOrder}&search=${globalFilter}`);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching item data:', error);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Item Shop</h1>
        <div className="overflow-x-auto">
          <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          <div className="border border-gray-300 rounded-lg shadow-lg">
            <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        className="p-2 text-left cursor-pointer"
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
                    <tr {...row.getRowProps()} className="border-b">
                      {row.cells.map(cell => (
                        <td {...cell.getCellProps()} className="p-2">
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
