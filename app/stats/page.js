'use client'
import styles from "./stats.module.css"
import useLocalStorage from "../src/useLocalStorage"
import { useTable } from "react-table"
import React from "react"
export default function Page() {
    let [timeList, setTimeList] = useLocalStorage("timeList", {
        "Session 1": []
    }, {
        "Session 1": []
    })
    const data = timeList["Session 1"]
    console.log("AHH DATA", data)

    const columns = React.useMemo(
        () => [
            {
                Header: 'Time',
                accessor: 'formattedTime', // accessor is the "key" in the data
            },
            {
                Header: 'Scramble',
                accessor: 'scramble',
            },
        ],
        []
    )

    const tableInstance = useTable({ columns, data })
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (<div className={styles.statsPage}>
        <table {...getTableProps()}>
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
        {JSON.stringify(timeList)}
    </div>)
}