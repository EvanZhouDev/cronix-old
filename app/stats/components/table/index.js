import React from "react";
import { useTable } from "react-table"
import styles from "./table.module.css"
export default function Table({ data }) {
    const columns = React.useMemo(
        () => [
            {
                Header: '#',
                accessor: 'index', // accessor is the "key" in the data
            },
            {
                Header: 'Time',
                accessor: 'formattedTime', // accessor is the "key" in the data
            },
            // {
            //     Header: 'Scramble',
            //     accessor: 'scramble',
            // },
            {
                Header: 'mo3',
                accessor: 'mo3',
            },
            {
                Header: 'ao5',
                accessor: 'ao5',
            },
            {
                Header: 'ao12',
                accessor: 'ao12',
            },
        ],
        []
    )

    const tableInstance = useTable({ columns, data: data.map((x, i) => { x.index = i + 1; return x }).reverse() })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table} {...getTableProps()}>
                <thead>
                    {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.getHeaderGroupProps().key}>
                                {// Loop over the headers in each row
                                    headerGroup.headers.map(column => (
                                        // Apply the header cell props
                                        <th {...column.getHeaderProps()} key={column.getHeaderProps().key}>
                                            {// Render the header
                                                column.render('Header')}
                                        </th>
                                    ))}
                            </tr>
                        ))}
                </thead>
                {/* Apply the table body props */}
                <tbody {...getTableBodyProps()}>
                    {// Loop over the table rows
                        rows.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                                // Apply the row props
                                <tr {...row.getRowProps()} key={row.getRowProps().key}>
                                    {// Loop over the rows cells
                                        row.cells.map(cell => {
                                            // Apply the cell props
                                            return (
                                                <td {...cell.getCellProps()} key={cell.getCellProps().key}>
                                                    {// Render the cell contents
                                                        cell.render('Cell')}
                                                </td>
                                            )
                                        })}
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}